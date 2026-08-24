using RamT.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

await app.MigrateAndSeedAsync();

app.UseApplicationMiddleware();

app.Run();
