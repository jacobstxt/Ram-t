using RamT.Application.Interfaces;
using RamT.Application.Mappings;
using RamT.Application.Models;

namespace RamT.Application.Services;

public class CategoryService(ICategoryRepository repository, CategoryMapper mapper)
{
    public async Task<List<CategoryDto>> GetAllAsync()
    {
        var categories = await repository.GetAllAsync();
        return mapper.ToDtoList(categories);
    }
}
