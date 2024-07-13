var builder = DistributedApplication.CreateBuilder(args);

var weatherApi = builder.AddProject<Projects.AspireJavaScript_MinimalApi>("weatherapi")
    .WithExternalHttpEndpoints();

var react = builder.AddNpmApp("react", "../AspireJavaScript.React")
    .WithReference(weatherApi)
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

var isHttps = builder.Configuration["DOTNET_LAUNCH_PROFILE"] == "https";
var scheme = isHttps ? "https" : "http";

builder.AddYarp("ingress")
    .WithEndpoint(port: 8001, scheme: scheme)
    .Route("weatherApi", path: "api.hello.cone.solutions/", target: weatherApi)
    .Route("react", path: "hello.cone.solutions/", target: react);

builder.Build().Run();
