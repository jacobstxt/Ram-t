using AutoMapper;
using RamT.Application.Models;
using RamT.Application.Models.SeedDTO;
using RamT.Domain.Entities;

namespace RamT.Application.Mappings;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        // Entity → DTO
        CreateMap<ProductCharacteristic, CharacteristicDto>();
        CreateMap<ProductComposition, CompositionDto>();
        CreateMap<ProductReview, ReviewDto>();

        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.CategoryName,
                opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))
            .ForMember(dest => dest.Images,
                opt => opt.MapFrom(src => src.Images
                    .OrderBy(i => i.SortOrder)
                    .Select(i => i.Url)
                    .ToList()));

        // SeedDTO → Entity
        CreateMap<ProductSeedDTO, Product>()
            .ForMember(dest => dest.Images, opt => opt.Ignore())
            .ForMember(dest => dest.Composition, opt => opt.Ignore())
            .ForMember(dest => dest.Characteristics, opt => opt.Ignore())
            .ForMember(dest => dest.Reviews, opt => opt.Ignore())
            .ForMember(dest => dest.Category, opt => opt.Ignore());

        CreateMap<CompositionSeedDTO, ProductComposition>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.ProductId, opt => opt.Ignore())
            .ForMember(dest => dest.Product, opt => opt.Ignore());

        CreateMap<CharacteristicSeedDTO, ProductCharacteristic>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.ProductId, opt => opt.Ignore())
            .ForMember(dest => dest.Product, opt => opt.Ignore());

        CreateMap<ReviewSeedDTO, ProductReview>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.ProductId, opt => opt.Ignore())
            .ForMember(dest => dest.Product, opt => opt.Ignore());
    }
}
