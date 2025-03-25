using Domain.Models;
using Efforeignkeytask.DATA_TransferObject;
using Efforeignkeytask.Datacontext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly UserDbContext dbcontext;
    private readonly IWebHostEnvironment env;

    public ProductController(UserDbContext dbcontext, IWebHostEnvironment env)
    {
        this.dbcontext = dbcontext;
        this.env = env;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await dbcontext.products.ToListAsync();
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetId(int id)
    {
        var result = await dbcontext.products.FindAsync(id);
        return result != null ? Ok(result) : NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] ProductRequestDto productRequestDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        if (productRequestDto.ImageUrl == null || productRequestDto.ImageUrl.Length == 0)
            return BadRequest("Image file is required.");

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
        var fileExtension = Path.GetExtension(productRequestDto.ImageUrl.FileName).ToLower();

        if (!allowedExtensions.Contains(fileExtension))
            return BadRequest("Only image files (JPG, PNG, GIF) are allowed.");

        var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        if (!Directory.Exists(uploadFolder)) await Task.Run(() => Directory.CreateDirectory(uploadFolder));

        var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
        var filePath = Path.Combine(uploadFolder, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await productRequestDto.ImageUrl.CopyToAsync(stream);
        }

        var newProduct = new Product
        {
            Name = productRequestDto.Name,
            Description = productRequestDto.Description,
            Price = productRequestDto.Price,
            Stock = productRequestDto.Stock,
            Category = productRequestDto.Category,
            ImageUrl = $"{Request.Scheme}://{Request.Host}/uploads/{uniqueFileName}",
            UserId = productRequestDto.UserId
        };

        await dbcontext.products.AddAsync(newProduct);
        await dbcontext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetId), new { id = newProduct.Id }, newProduct);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromForm] ProductRequestDto productRequestDto)
    {
        var product = await dbcontext.products.FindAsync(id);
        if (product == null) return NotFound();

        product.Name = productRequestDto.Name;
        product.Description = productRequestDto.Description;
        product.Price = productRequestDto.Price;
        product.Stock = productRequestDto.Stock;
        product.Category = productRequestDto.Category;
        product.UserId = productRequestDto.UserId;

        if (productRequestDto.ImageUrl != null && productRequestDto.ImageUrl.Length > 0)
        {
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var fileExtension = Path.GetExtension(productRequestDto.ImageUrl.FileName).ToLower();
            if (!allowedExtensions.Contains(fileExtension))
                return BadRequest("Only image files (JPG, PNG, GIF) are allowed.");

            if (!string.IsNullOrEmpty(product.ImageUrl))
            {
                var fileName = Path.GetFileName(new Uri(product.ImageUrl).AbsolutePath);
                var oldImagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", fileName);
                if (System.IO.File.Exists(oldImagePath)) System.IO.File.Delete(oldImagePath);
            }

            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            var uniqueFileName = Guid.NewGuid() + fileExtension;
            var filePath = Path.Combine(uploadFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await productRequestDto.ImageUrl.CopyToAsync(stream);
            }
            product.ImageUrl = $"{Request.Scheme}://{Request.Host}/uploads/{uniqueFileName}";
        }

        await dbcontext.SaveChangesAsync();
        return Ok(product);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await dbcontext.products.FindAsync(id);
        if (product == null) return NotFound();

        if (!string.IsNullOrEmpty(product.ImageUrl))
        {
            var fileName = Path.GetFileName(new Uri(product.ImageUrl).AbsolutePath);
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", fileName);
            if (System.IO.File.Exists(imagePath)) System.IO.File.Delete(imagePath);
        }

        dbcontext.products.Remove(product);
        await dbcontext.SaveChangesAsync();
        return Ok(product);
    }
}

