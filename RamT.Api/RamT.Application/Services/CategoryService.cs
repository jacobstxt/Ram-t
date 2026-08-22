using AutoMapper;
using RamT.Application.Interfaces;
using RamT.Application.Models;

namespace RamT.Application.Services;

public class CategoryService(ICategoryRepository repository, IMapper mapper)
{
    public async Task<List<CategoryDto>> GetAllAsync()
    {
        var categories = await repository.GetAllAsync();
        return mapper.Map<List<CategoryDto>>(categories);
    }
}
