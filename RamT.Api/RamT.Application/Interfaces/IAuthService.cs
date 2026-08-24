using RamT.Application.Models.DTO.Auth;

namespace RamT.Application.Interfaces;

public interface IAuthService
{
    Task<(AccountDto Account, string AccessToken, string RefreshToken)> RegisterAsync(RegisterDto dto);
    Task<(AccountDto Account, string AccessToken, string RefreshToken)> LoginAsync(LoginDto dto);
    Task<(AccountDto Account, string AccessToken, string RefreshToken)> RefreshAsync(string refreshToken);
    Task<(AccountDto Account, string AccessToken, string RefreshToken)> GoogleAuthAsync(GoogleAuthDto dto);
}
