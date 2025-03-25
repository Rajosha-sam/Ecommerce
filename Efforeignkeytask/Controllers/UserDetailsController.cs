using Domain.Models;
using Efforeignkeytask.DATA_TransferObject;
using Efforeignkeytask.Datacontext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Efforeignkeytask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly UserDbContext dbcontext;

        public UserDetailsController(UserDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await dbcontext.userdetails.ToListAsync();
            return Ok(result);
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetId(int id)
        {
            var result = await dbcontext.userdetails.FindAsync(id);
            //var userdetails = await dbcontext.userdetails.Where(i => i.User).toListAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserDetailsRequestDto userDetailsRequestDto)
        {
            
            var newUserdetails = new UserDetails()
            {
                LastName = userDetailsRequestDto.LastName,
                Gender = userDetailsRequestDto.Gender,
                Mobile = userDetailsRequestDto.Mobile,
                Address = userDetailsRequestDto.Address,
                UserId=userDetailsRequestDto.UserId
            };

            await dbcontext.userdetails.AddAsync(newUserdetails);
            await dbcontext.SaveChangesAsync();

            var userDetailsResponseDto = new UserDetailsResponseDto()
            {
                Id  =newUserdetails.Id,
               Address= newUserdetails.Address,
               DateOfBirth=newUserdetails.DateOfBirth,
               Gender= newUserdetails.Gender,
               Mobile=newUserdetails.Mobile,
               LastName= newUserdetails.LastName,
               UserId=newUserdetails.UserId
            };
            return CreatedAtAction("Get", new { id = newUserdetails.Id }, userDetailsResponseDto);

        }



        [Route("{id:int}")]
        [HttpPut]
        public async Task<IActionResult> Put(int id, UserDetailsRequestDto userDetailsRequestDto)
        {
            var update = await dbcontext.userdetails.FindAsync(id);
            update.Address = userDetailsRequestDto.Address;
             update.LastName = userDetailsRequestDto.LastName;
            update.DateOfBirth = userDetailsRequestDto.DateOfBirth;
            update.Gender = userDetailsRequestDto.Gender;
            update.UserId = userDetailsRequestDto.UserId;
            await dbcontext.SaveChangesAsync();

            return Ok(update);

        }
            
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var delete = await dbcontext.userdetails.FindAsync(id);
            dbcontext.userdetails.Remove(delete);
            return Ok(delete);
        }
    }
}

