using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.Models;
using Efforeignkeytask.DATA_TransferObject;
using Efforeignkeytask.Datacontext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Efforeignkeytask.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserDbContext dbcontext;
        private readonly IConfiguration configuration;

        public UserController(UserDbContext dbcontext, IConfiguration configuration)
        {
            this.dbcontext = dbcontext;
            this.configuration = configuration;
        }
        [AllowAnonymous]

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await dbcontext.users
                .Include(i => i.UserDetails)
                .ToListAsync();

            Console.WriteLine("Users fetched: " + result.Count); // Log count

            foreach (var user in result)
            {
                Console.WriteLine($"User: {user.Name}, Active: {user.IsActive}");
            }

            return Ok(result);
        }



        [Route("{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetId(int id)
        {
            try
            {
                var result = await dbcontext.users
                                             .Include(o => o.UserDetails)
                                             .FirstOrDefaultAsync(u => u.Id == id);

                if (result == null)
                {
                    return NotFound();
                }

                

                return Ok(result);  
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }



        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create(UserDetailsRequestDto userDetailsRequest)
        {
            try
            {
                var createUserDetails = new UserDetails()
                {
                    LastName = userDetailsRequest.LastName,
                    DateOfBirth = userDetailsRequest.DateOfBirth,
                    Gender = userDetailsRequest.Gender,
                    Address = userDetailsRequest.Address,
                    Mobile = userDetailsRequest.Mobile,
                    UserId = userDetailsRequest.UserId,
                };

                var newUser = new User()
                {
                    Name = userDetailsRequest.Name,
                    Email = userDetailsRequest.Email,
                    Password = userDetailsRequest.Password,
                    RoleId = userDetailsRequest.RoleId,
                    UserDetails = createUserDetails
                };

                dbcontext.users.Add(newUser);
                await dbcontext.SaveChangesAsync();

                return Ok(newUser);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, new { message = "An error occurred while creating the user.", error = ex.Message });
            }
        }



        [Route("{id:int}")]
        [HttpPut]
        public async Task<IActionResult> Put(int id, UserDetailsRequestDto userRequestDto)
        {
            var userToUpdate = await dbcontext.users
                                               .Include(u => u.UserDetails)
                                               .FirstOrDefaultAsync(u => u.Id == id);

            if (userToUpdate == null)
            {
                return NotFound("User not found");
            }

           
            userToUpdate.Email = userRequestDto.Email;
            userToUpdate.Password = userRequestDto.Password;
            userToUpdate.Name = userRequestDto.Name;
            userToUpdate.RoleId = userRequestDto.RoleId;

          
            var userDetailsToUpdate = userToUpdate.UserDetails;
            userDetailsToUpdate.LastName = userRequestDto.LastName;
            userDetailsToUpdate.Mobile = userRequestDto.Mobile;
            userDetailsToUpdate.Gender = userRequestDto.Gender;
            userDetailsToUpdate.Address = userRequestDto.Address;
            userDetailsToUpdate.DateOfBirth = userRequestDto.DateOfBirth;

            await dbcontext.SaveChangesAsync();

            return Ok(userToUpdate);
        }

        [AllowAnonymous]
        [HttpPut("{id:int}/deactivate")]
        public async Task<IActionResult> DeactivateUser(int id)
        {
            var user = await dbcontext.users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            user.IsActive = false; 
            await dbcontext.SaveChangesAsync();

            return Ok(new { message = $"User {user.Id} has been deactivated." });
        }

        [AllowAnonymous]
        [HttpPut("{id:int}/activate")]
        public async Task<IActionResult> ActivateUser(int id)
        {
            var user = await dbcontext.users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            user.IsActive = true;
            dbcontext.users.Update(user); // Ensure entity is marked as modified
            await dbcontext.SaveChangesAsync();

            return Ok(new { message = $"User {user.Id} has been activated." });
        }




        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var delete = await dbcontext.users.FindAsync(id);
            dbcontext.users.Remove(delete);
            await dbcontext.SaveChangesAsync();
            return Ok(delete);
        }
        [AllowAnonymous]
        [HttpGet("{email}/{password}")]
        public async Task<IActionResult> GetUser(string email, string password)
        {
            var result = new LoginResponseDto();
            var user = await dbcontext.users.Include(t => t.UserDetails).FirstOrDefaultAsync(p => p.Email == email && p.Password == password);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (!user.IsActive) // Check if the user is inactive
            {
                return Unauthorized(new { message = "Your account is deactivated. Please contact support." });
            }

            // Proceed if the user is active
            result.Name = user.Name;
            result.RoleId = user.RoleId;
            result.UserId = user.UserDetails.UserId;

            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.Name, email)
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds
            );

            result.token = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(result);
        }








    }
}
