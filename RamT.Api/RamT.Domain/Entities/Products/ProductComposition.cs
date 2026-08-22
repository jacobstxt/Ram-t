namespace RamT.Domain.Entities;

public class ProductComposition
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public string Item { get; set; } = string.Empty;
    public string Qty { get; set; } = string.Empty;
}
