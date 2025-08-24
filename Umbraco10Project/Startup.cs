using AutoMapper;
using GoogleReCaptcha.V3;
using GoogleReCaptcha.V3.Interface;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using RestSharp;
using Umbraco10Project.Controllers;
using Umbraco10Project.Extensions;
using Umbraco10Project.Helpers;
using Umbraco10Project.Services;

namespace Umbraco10Project
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _config;

        /// <summary>
        /// Initializes a new instance of the <see cref="Startup" /> class.
        /// </summary>
        /// <param name="webHostEnvironment">The web hosting environment.</param>
        /// <param name="config">The configuration.</param>
        /// <remarks>
        /// Only a few services are possible to be injected here https://github.com/dotnet/aspnetcore/issues/9337.
        /// </remarks>
        public Startup(IWebHostEnvironment webHostEnvironment, IConfiguration config)
        {
            _env =
                webHostEnvironment ?? throw new ArgumentNullException(nameof(webHostEnvironment));
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        /// <summary>
        /// Configures the services.
        /// </summary>
        /// <param name="services">The services.</param>
        /// <remarks>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940.
        /// </remarks>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDistributedSqlServerCache(options =>
            {
                options.ConnectionString = _config.GetConnectionString("umbracoDbDSN");
                options.SchemaName = "dbo";
                options.TableName = "SessionCache";
            });
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
            });
            services
                .AddDataProtection()
                .PersistKeysToFileSystem(new DirectoryInfo("./App/DataProtection"))
                .SetApplicationName(_config["baseUrl"]);

            services.AddUmbraco(_env, _config).AddBackOffice().AddWebsite().AddComposers().Build();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddAutoMapper(typeof(Program));
            services.AddTransient<
                IConfigureOptions<StaticFileOptions>,
                ConfigureStaticFileOptions
            >();
            services.AddSingleton<BackgroundTaskManager>();
            services.AddHttpClient<ICaptchaValidator, GoogleReCaptchaValidator>();
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
                options.KnownNetworks.Clear();
                options.KnownProxies.Clear();
            });

            var regaInternalClientId = _config["variabels:RegaInternalClientId"] ?? "";
            var regaInternalClientSecret = _config["variabels:RegaInternalClientSecret"] ?? "";
            var regaInternalApiEndpoint = _config["variabels:RegaInternalApiEndpoint"] ?? "";
            var regClientId = _config["variabels:RegaClientId"] ?? "";
            var regaClientSecret = _config["variabels:RegaClientSecret"] ?? "";
            var regaApiEndpoint = _config["variabels:RegaApiEndpoint"] ?? "";
            var isServer = _config["variabels:isServer"] ?? "";
            var environment = _config["variabels:Environment"] ?? "";

            services.AddSingleton<RestClient>(_ =>
            {
                var client = new RestClient(regaApiEndpoint);
                client.AddDefaultHeader("Connection", "keep-alive");
                return client;
            });

            services.AddKeyedSingleton(
                "RegaInternalClient",
                delegate
                {
                    var client = new RestClient(regaInternalApiEndpoint);
                    client.AddDefaultHeader("Connection", "keep-alive");
                    return client;
                }
            );

            services.AddSingleton<SuggestionsInquiriesService>();

            services.AddSingleton<InspectionService>(provider =>
            {
                if (isServer == "false" || environment == "dev")
                {
                    return new InspectionService(
                        provider.GetKeyedService<RestClient>("RegaInternalClient"),
                        regaInternalClientId,
                        regaInternalClientSecret,
                        _config
                    );
                }

                var client = provider.GetService<RestClient>();
                return new InspectionService(client, regClientId, regaClientSecret, _config);
            });
            services.AddSingleton<NafathService>(provider =>
            {
                if (isServer == "false")
                {
                    return new NafathService(
                        provider.GetKeyedService<RestClient>("RegaInternalClient"),
                        regaInternalClientId,
                        regaInternalClientSecret
                    );
                }

                var client = provider.GetService<RestClient>();
                return new NafathService(client, regClientId, regaClientSecret);
            });

            services.AddSingleton<WafiService>(provider =>
            {
                var client = provider.GetService<RestClient>();
                return new WafiService(client, regClientId, regaClientSecret);
            });

            services.AddSingleton<FalService>(provider =>
            {
                var client = provider.GetService<RestClient>();
                return new FalService(client, regClientId, regaClientSecret);
            });

            services.AddSingleton<RerService>(provider =>
            {
                var client = provider.GetService<RestClient>();
                return new RerService(client, regClientId, regaClientSecret);
            });

            services.AddSingleton<EjarService>(provider =>
            {
                var client = provider.GetService<RestClient>();
                return new EjarService(client, regClientId, regaClientSecret);
            });
        }

        /// <summary>
        /// Configures the application.
        /// </summary>
        /// <param name="app">The application builder.</param>
        /// <param name="env">The web hosting environment.</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseForwardedHeaders();
            app.UseHttpsRedirection();
            app.Use(
                async (context, next) =>
                {
                    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
                    await next();
                }
            );

            app.Use(
                async (context, next) =>
                {
                    context.Response.Headers.Append("X-Frame-Options", "SAMEORIGIN");
                    await next();
                }
            );

            app.Use(
                async (context, next) =>
                {
                    context.Response.Headers.Append("X-Xss-Protection", "1; mode=block");
                    await next();
                }
            );

            app.UseStatusCodePages(async context =>
            {
                if (context.HttpContext.Response.StatusCode == 401)
                {
                    context.HttpContext.Response.Redirect("/en/media-center/nafath-login/");
                }

                if (context.HttpContext.Response.StatusCode == 402)
                {
                    context.HttpContext.Response.Redirect(
                        "/%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%A7%D8%B9%D9%84%D8%A7%D9%85%D9%8A/%D8%A8%D9%88%D8%A7%D8%A8%D8%A9-%D9%86%D9%81%D8%A7%D8%B0/"
                    );
                }
            });

            if (env.IsDevelopment())
            {
                var showError = _config.GetSection("showError")?.Value;
                if (showError != null && bool.Parse(showError) == true)
                {
                    app.UseDeveloperExceptionPage();
                }
                else
                {
                    app.UseExceptionHandler("/Error");
                    app.UseHsts();
                }
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseSession();

            app.UseMiddleware<FallbackMiddlewareHandler>();
            app.UseMiddleware<TokenValidationMiddleware>();

            app.UseUmbraco()
                .WithMiddleware(u =>
                {
                    u.UseBackOffice();
                    u.UseWebsite();
                })
                .WithEndpoints(u =>
                {
                    u.UseInstallerEndpoints();
                    u.UseBackOfficeEndpoints();
                    u.UseWebsiteEndpoints();
                });
        }
    }
}
// hello world
