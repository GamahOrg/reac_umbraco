# Use the official .NET SDK image
FROM harbor.rega.gov.sa/mcr-rega/dotnet/sdk:8.0 AS build

# Set the working directory
WORKDIR /app
  
# Copy the project files and restore dependencies
COPY *.csproj .
RUN dotnet restore
  
# Copy the remaining files and build the application
COPY . .
# turn off analyzers
RUN dotnet publish -c Release -o out /p:EnableNETAnalyzers=false
  
# Create the runtime image
FROM harbor.rega.gov.sa/mcr-rega/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /app/out .
  
# Expose the port the app will run on
ENTRYPOINT ["dotnet", "Umbraco10Project.dll"]
