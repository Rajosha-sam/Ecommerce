using Domain.Models;
using Efforeignkeytask.DATA_TransferObject;
using Efforeignkeytask.Datacontext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Efforeignkeytask.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RoleContoller : ControllerBase
    {
        private readonly UserDbContext dbcontext;

        public RoleContoller(UserDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpGet]

        public async Task<IActionResult> Get()
        {
            var result = await dbcontext.role.ToListAsync();
            return Ok(result);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await dbcontext.role.FindAsync(id);
            var users = await dbcontext.users.Where(u => u.RoleId == id).ToListAsync();
            result.users = users;
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(RoleRequestDto roleRequestDto)
        {
            var newRole = new Role()
            {
                Name = roleRequestDto.Name
            };
            dbcontext.role.Add(newRole);
            await dbcontext.SaveChangesAsync();
            var roleResponseDto = new RoleResponseDto()
            {

                Id = newRole.Id,
                Name = newRole.Name
            };
            return CreatedAtAction("Get", new { Id = newRole.Id }, roleResponseDto );
        }
        //[Route("{id:int}")]
        //[HttpPut]
        //public async Task<IActionResult> Put(int id, RoleRequestDto roleRequestDto)
        //{
        //    var update = await dbcontext.role.FindAsync(id);
        //    update.Name = roleRequestDto.Name;
        //    await dbcontext.SaveChangesAsync();
        //    return Ok(update);

        //}

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var delete = await dbcontext.role.Include(u => u.users).FirstOrDefaultAsync(i => i.Id == id);
            //if (delete.users.Any())
            //    return BadRequest("child is there");
            dbcontext.role.Remove(delete);
            await dbcontext.SaveChangesAsync();
            return Ok(delete);
        }



    }
}
