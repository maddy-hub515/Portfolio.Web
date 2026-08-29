FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY backend/MR.Portfolio-Api/MR.Portfolio-Api.csproj backend/MR.Portfolio-Api/
RUN dotnet restore backend/MR.Portfolio-Api/MR.Portfolio-Api.csproj

COPY backend/ backend/
RUN dotnet publish backend/MR.Portfolio-Api/MR.Portfolio-Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "MR.Portfolio-Api.dll"]
