#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

EXPOSE 80
EXPOSE 433

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["limesz_app/limesz_app.csproj", "limesz_app/"]
COPY ["limesz_data/limesz_data.csproj", "limesz_data/"]

RUN dotnet restore "limesz_app/limesz_app.csproj"
COPY . .
WORKDIR "/src/limesz_app"
RUN dotnet build "limesz_app.csproj" -c Release -o /app/build

FROM build AS publish

RUN curl -sL https://deb.nodesource.com/setup_14.x |  bash -
RUN apt-get install -y nodejs

RUN npm install

RUN dotnet publish "limesz_app.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final

RUN apt-get update && apt-get install -y apt-utils libgdiplus libc6-dev
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "limesz_app.dll"]
