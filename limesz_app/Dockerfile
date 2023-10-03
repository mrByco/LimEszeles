#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

EXPOSE 80
EXPOSE 433

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["margarita_app/margarita_app.csproj", "margarita_app/"]
COPY ["margarita_data/margarita_data.csproj", "margarita_data/"]

RUN dotnet restore "margarita_app/margarita_app.csproj"
COPY . .
WORKDIR "/src/margarita_app"
RUN dotnet build "margarita_app.csproj" -c Release -o /app/build

FROM build AS publish

RUN curl -sL https://deb.nodesource.com/setup_14.x |  bash -
RUN apt-get install -y nodejs

RUN npm install

RUN dotnet publish "margarita_app.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final

RUN apt-get update && apt-get install -y apt-utils libgdiplus libc6-dev
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "margarita_app.dll"]
