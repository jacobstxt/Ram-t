// RamT.Domain/Entities/ProductCharacteristic.cs
namespace RamT.Domain.Entities;

public class ProductCharacteristic
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}
