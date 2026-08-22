using Riok.Mapperly.Abstractions;
using RamT.Application.Models;
using RamT.Application.Models.SeedDTO;
using RamT.Domain.Entities;

namespace RamT.Application.Mappings;

[Mapper]
public partial class CategoryMapper
{
    public partial CategoryDto ToDto(Category category);

    public List<CategoryDto> ToDtoList(List<Category> categories) =>
        categories.Select(ToDto).ToList();

    [MapperIgnoreTarget(nameof(Category.ParentCategory))]
    [MapperIgnoreTarget(nameof(Category.SubCategories))]
    [MapperIgnoreTarget(nameof(Category.Products))]
    public partial Category ToEntity(CategorySeedDTO dto);

    public List<Category> ToEntityList(List<CategorySeedDTO> dtos) =>
        dtos.Select(ToEntity).ToList();
}
