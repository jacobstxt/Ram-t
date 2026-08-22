using RamT.Domain.Entities;

namespace RamT.Application.Interfaces;

public interface ICategoryRepository
{
    Task<List<Category>> GetAllAsync();
}
