namespace Umbraco10Project.Helpers;

public static class ServiceCollectionExtensions
{
    private static readonly Dictionary<string, object> _namedInstances = new();

    public static IServiceCollection WithName<T>(this IServiceCollection services, string name)
        where T : class
    {
        services.AddSingleton(provider =>
        {
            var service = provider.GetRequiredService<T>();
            _namedInstances[name] = service;
            return service;
        });

        return services;
    }

    public static T GetService<T>(this IServiceProvider provider, string name)
        where T : class
    {
        if (_namedInstances.TryGetValue(name, out var instance) && instance is T namedService)
        {
            return namedService;
        }

        throw new InvalidOperationException($"No service registered with the name '{name}' for type {typeof(T).Name}.");
    }
}
