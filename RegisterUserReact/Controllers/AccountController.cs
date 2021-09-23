using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RegisterUserReact.DAL;
using RegisterUserReact.DAL.Identity;
using RegisterUserReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegisterUserReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public EFAppContext _context { get; set; }
        public UserManager<AppUser> _userManager { get; set; }
        public AccountController(EFAppContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        [HttpPost]
        [Route("registeruser")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterViewModel reg) 
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(reg.Email);
                if (user != null)
                {
                    return BadRequest(new
                    {
                        type="email",
                        message = "Користувач з таким е-мейлом уже зарєстрований!"
                    });
                }

                AppUser newUser = new AppUser { 
                    UserName = reg.Email,
                    FirstName = reg.Firstname,
                    LastName = reg.Lastname,
                    PhoneNumber = reg.Phone,
                    Email = reg.Email,
                };

                var result = await _userManager.CreateAsync(newUser, reg.Password);
                if (result.Errors.Any())
                {
                    //PasswordRequiresDigit
                    //PasswordRequiresUpper
                    //PasswordRequiresLower
                    List<string> Errors = new List<string>();
                    foreach (var error in result.Errors) 
                    {
                        switch (error.Code) 
                        {
                            case "PasswordRequiresDigit": 
                                {
                                    Errors.Add("Пароль повинен містити цифри!");
                                    break; 
                                }
                            case "PasswordRequiresUpper": 
                                {
                                    Errors.Add("Пароль повинен містити великі літери!");
                                    break; 
                                }
                            case "PasswordRequiresLower": 
                                {
                                    Errors.Add("Пароль повинен містити малі літери!");
                                    break; 
                                }
                        }
                    }
                    return BadRequest(new {
                        type="password",
                        Errors = Errors
                    });
                }
                return Ok("Авторизовано!");
            }
            catch
            {
                return BadRequest(new { 
                type="server",
                message = "Помилка мережі! Зверніться у сервісний центр"
                });
            }
        }

    }
}
