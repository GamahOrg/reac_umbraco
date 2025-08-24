namespace Umbraco10Project
{
    public class Program
    {
        public static void Main(string[] args)
            => CreateHostBuilder(args)
                .Build()
                .Run();

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureUmbracoDefaults()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStaticWebAssets();
                    webBuilder.UseStartup<Startup>();
                    //webBuilder.UseStartup<Startup>().UseKestrel(x => x.AddServerHeader = false);
                });

        
        // 1
        //var app = builder.Build();

        //// Configure the HTTP request pipeline.
        //app.UseSwagger();
        //app.UseSwaggerUI(c =>
        //{
        //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Chat App API V1");

        //});
    }
}
