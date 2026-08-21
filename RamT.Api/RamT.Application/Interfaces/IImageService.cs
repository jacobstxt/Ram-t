using Microsoft.AspNetCore.Http;

namespace RamT.Application.Interfaces;

public interface IImageService
{
    Task<string> SaveImageAsync(IFormFile file);
    Task<string> SaveImageFromPathAsync(string filePath);
    Task<string> SaveImageFromUrlAsync(string imageUrl);
    Task DeleteImageAsync(string name);
}