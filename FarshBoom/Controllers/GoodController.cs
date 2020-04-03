using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FarshBoom.Dtos;
using FarshBoom.Helpers;
using FarshBoom.Models;
using FarshBoom.Repositories.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FarshBoom.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GoodController : ControllerBase
    {
        private IGenericRepository<Good> _repo;
        private IMapper _mapper;
        private IHostingEnvironment _env;
        public GoodController(IGenericRepository<Good> repo, IMapper mapper, IHostingEnvironment env)
        {
            _repo = repo;
            _mapper = mapper;
            _env = env;
        }
        [HttpGet("default")]
        public IActionResult Default()
        {
            return Ok("we got the message");
        }
        [HttpPost("saveGood")]
        public async Task<IActionResult> SaveGood(GoodInsertDto model)
        {
            Good goodToCreate = _mapper.Map<Good>(model);
            if(goodToCreate.Title == null)
                goodToCreate.Title = "";
            int result = await _repo.InsertAsync(goodToCreate);
            if(result == -1)
                throw new Exception($"couldn't insert this carpet");

            var goodToReturn = _mapper.Map<GoodDto>(goodToCreate);

            return Ok(new {id = goodToCreate.Id});
        }
        [HttpPost("updateGood")]
        public async Task<IActionResult> UpdateGood(GoodInsertDto goodForUpdateDto)
        {
            Good updatedGood = await _repo.GetByIDAsync(goodForUpdateDto.Id);
            _mapper.Map(goodForUpdateDto, updatedGood);
            var good = await _repo.UpdateAsync(updatedGood);
            if(good == -1)
                throw new Exception($"Updating good {goodForUpdateDto.Id} failed on save");
            else
                return Ok(goodForUpdateDto.Id);
            
        }
        [HttpPost("{id}/photoUpdate")]
        [AllowAnonymous]
        public async Task<IActionResult> PhotoUpdate(int id,
            [FromForm]UpdatePhotoGoodDto photoForCreationDto)
        {
            var userFromRepo = await _repo.GetByIDAsync(id);

            var file = photoForCreationDto.File;
            
            if (file.Length > 0)
            {
                string ImageName= id.ToString() + Path.GetExtension(file.FileName);
                string SavePath = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot/img",ImageName);

                using(var stream=new FileStream(SavePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
            }
            return Ok();
        }
        [HttpPost("deleteGood")]
        public async Task<IActionResult> DeleteGood(int id) 
        {        
            var user = await _repo.GetByIDAsync(id);

            await _repo.RemoveAsync(user);
                
            throw new Exception($"couldn't delete this carpet");
        }
        [HttpGet("getGood")]
        public async Task<IActionResult> GetGood(string key, string field) 
        {        
            //var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault();
            Good good;
            if(field.Equals("name"))
                good = await _repo.GetFirstAsync(woak => woak.FarshboomCode.Equals(key));
            else
                good = await _repo.GetFirstAsync(woak => woak.Id == Convert.ToInt32(key));
            GoodDto goodDto = _mapper.Map<GoodDto>(good);
            return Ok(new {goodDto = goodDto});
        }
        [HttpGet("getGoods")]
        public async Task<IActionResult> GetGoods() 
        {        
            var AllGoods = await _repo.GetAllAsync();
            IEnumerable<GoodDto> goods = _mapper.Map<IEnumerable<GoodDto>>(AllGoods);
            return Ok(goods);
        }
        [HttpGet("getAllGoods")]
        public async Task<IActionResult> GetAllGoods([FromQuery]UserParams userParams) 
        {        
            PagedList<Good> goods = await _repo.GetAllAsync(userParams,"Size,Type,Color,Brand,Porz");
            IEnumerable<GoodDto> goodDto;
            goodDto = _mapper.Map<IEnumerable<GoodDto>>(goods);
            Response.AddPagination(goods.CurrentPage, goods.PageSize,
                goods.TotalCount, goods.TotalPages);
            return Ok(goodDto);
        }
        [HttpGet("filteredGoods")]
        public async Task<IActionResult> FilteredGoods(string key) 
        {        
             
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault(); 
            var goods = await _repo.GetAllAsync();
            goods = goods.Where(woak => woak.FarshboomCode.Contains(key));
            IEnumerable<GoodDto> goodDto;
            goodDto = _mapper.Map<IEnumerable<GoodDto>>(goods);
            //users = users.Where(woak => woak.RoleType == (RoleType)Enum.Parse(typeof(RoleType), roles));
            //IEnumerable<City> CityName = cities.Select(a => new City{Id = a.Id, CityName = a.CityName});
            //IEnumerable<string> userName = users.Select(a => a.Username);
            //string output = JsonConvert.SerializeObject(userName);
            
            string output = JsonConvert.SerializeObject(goodDto);
            return Ok(output);
        }
        [HttpGet("getGoodNames")]
        public async Task<IActionResult> GetGoodnames() 
        {        
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault(); 
            var goods = await _repo.GetAllAsync();
            IEnumerable<string> goodName = goods.Select(a => a.FarshboomCode);
            //string output = JsonConvert.SerializeObject(userName);
            
            string output = JsonConvert.SerializeObject(goodName);
            return Ok(goodName);
        }
    }
}