using Microsoft.AspNetCore.Mvc;
using RamT.Application.Services;

namespace RamT.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(CategoryService categoryService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await categoryService.GetAllAsync();
        return Ok(categories);
    }
}
