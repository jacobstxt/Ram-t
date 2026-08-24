using Microsoft.AspNetCore.Mvc;
using RamT.Application.Models.DTO.Products;
using RamT.Application.Services;

namespace RamT.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(ProductService productService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetPaged([FromQuery] ProductQueryParams query)
    {
        var result = await productService.GetPagedAsync(query);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await productService.GetByIdAsync(id);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var product = await productService.GetBySlugAsync(slug);
        return product is null ? NotFound() : Ok(product);
    }
}
