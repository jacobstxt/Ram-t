using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using RamT.Application.Interfaces;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;
using Image = SixLabors.ImageSharp.Image;

namespace RamT.Infrastructure.Services;

public class ImageService(IConfiguration configuration) : IImageService
{
    public async Task<string> SaveImageAsync(IFormFile file)
    {
        using MemoryStream ms = new();
        await file.CopyToAsync(ms);
        return await SaveImageAsync(ms.ToArray());
    }

    public async Task<string> SaveImageFromPathAsync(string filePath)
    {
        var bytes = await File.ReadAllBytesAsync(filePath);
        return await SaveImageAsync(bytes);
    }

    public async Task<string> SaveImageFromUrlAsync(string imageUrl)
    {
        using var httpClient = new HttpClient();
        var response = await httpClient.GetAsync(imageUrl);
        response.EnsureSuccessStatusCode();

        var imageBytes = await response.Content.ReadAsByteArrayAsync();
        return await SaveImageAsync(imageBytes);
    }

    public Task DeleteImageAsync(string name)
    {
        var sizes = configuration.GetRequiredSection("ImageSizes").Get<List<int>>()!;
        var dir = Path.Combine(Directory.GetCurrentDirectory(), configuration["ImagesDir"]!);

        foreach (var size in sizes)
        {
            var path = Path.Combine(dir, $"{size}_{name}");
            if (File.Exists(path)) File.Delete(path);
        }

        return Task.CompletedTask;
    }

    private async Task<string> SaveImageAsync(byte[] bytes)
    {
        string imageName = $"{Path.GetRandomFileName()}.webp";
        var sizes = configuration.GetRequiredSection("ImageSizes").Get<List<int>>()!;

        Task[] tasks = sizes
            .AsParallel()
            .Select(s => SaveImageAsync(bytes, imageName, s))
            .ToArray();

        await Task.WhenAll(tasks);

        return imageName;
    }

    private async Task SaveImageAsync(byte[] bytes, string name, int size)
    {
        var dir = Path.Combine(Directory.GetCurrentDirectory(), configuration["ImagesDir"]!);
        Directory.CreateDirectory(dir); 

        var path = Path.Combine(dir, $"{size}_{name}");

        using var image = Image.Load(bytes);
        image.Mutate(ctx => ctx.Resize(new ResizeOptions
        {
            Size = new Size(size, size),
            Mode = ResizeMode.Max
        }));

        await image.SaveAsync(path, new WebpEncoder());
    }
}