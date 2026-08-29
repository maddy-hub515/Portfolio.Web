FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY MR.Portfolio-Api.csproj ./
RUN dotnet restore MR.Portfolio-Api.csproj

COPY . .
RUN dotnet publish MR.Portfolio-Api.csproj -c Release -o /app/publish --no-restore
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "MR.Portfolio-Api.dll"]
