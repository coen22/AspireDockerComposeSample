FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["AspireJavaScript.MinimalApi/AspireJavaScript.MinimalApi.csproj", "AspireJavaScript.MinimalApi/"]
COPY ["AspireJavaScript.ServiceDefaults/AspireJavaScript.ServiceDefaults.csproj", "AspireJavaScript.ServiceDefaults/"]
RUN dotnet restore "AspireJavaScript.MinimalApi/AspireJavaScript.MinimalApi.csproj"
COPY . .
WORKDIR "/src/AspireJavaScript.MinimalApi"
RUN dotnet build "AspireJavaScript.MinimalApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "AspireJavaScript.MinimalApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AspireJavaScript.MinimalApi.dll"]
