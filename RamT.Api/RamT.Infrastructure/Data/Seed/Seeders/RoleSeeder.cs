using Microsoft.AspNetCore.Identity;
using RamT.Application.Interfaces;

namespace RamT.Infrastructure.Data.Seed;

public class RoleSeeder(RoleManager<IdentityRole> roleManager) : ISeeder
{
    private static readonly string[] Roles = ["Admin", "Customer"];

    public async Task SeedAsync()
    {
        foreach (var role in Roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}
