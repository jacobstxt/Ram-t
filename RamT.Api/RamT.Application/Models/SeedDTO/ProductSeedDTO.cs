namespace RamT.Application.Models.SeedDTO;

public class ProductSeedDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Manufacturer { get; set; } = string.Empty;
    public int? WarrantyYears { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public List<string> Images { get; set; } = [];
    public List<CompositionSeedDTO> Composition { get; set; } = [];
    public List<CharacteristicSeedDTO> Characteristics { get; set; } = [];
    public List<ReviewSeedDTO> Reviews { get; set; } = [];
}

public class CompositionSeedDTO
{
    public string Item { get; set; } = string.Empty;
    public string Qty { get; set; } = string.Empty;
}

public class CharacteristicSeedDTO
{
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}

public class ReviewSeedDTO
{
    public string AuthorName { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public int Rating { get; set; }
    public DateTime CreatedAt { get; set; }
}