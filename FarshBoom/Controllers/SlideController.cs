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
    public class SlideController : ControllerBase
    {
        private IGenericRepository<Slide> _repo;
        private IMapper _mapper;
        public SlideController(IGenericRepository<Slide> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("photoUpload")]
        public async Task<IActionResult> PhotoUpload([FromForm]SlideDto slideDto)
        {
            
            Slide slide = new Slide();
            var file = slideDto.File;
            
            if (file.Length > 0)
            {                
                MemoryStream ms = new MemoryStream();
                    file.CopyTo(ms);
                    slide.Image = ms.ToArray();
                var result = await _repo.InsertAsync(slide);
            }
            var items = await _repo.GetAllAsync();
            return Ok(items);
        }
        [HttpGet("getSlides")]
        public async Task<IActionResult> GetSlides() 
        {        
            var allSlides = await _repo.GetAllAsync();
            return Ok(allSlides);
        }
        [HttpPost("deleteSlide")]
        public async Task<IActionResult> DeleteSlide(StringModel name) 
        {        
            var slide = await _repo.GetByIDAsync(name.Id);

            var result = await _repo.RemoveAsync(slide.Id);
            if(result != 1)
                throw new Exception($"couldn't delete this slide");
            return Ok();
        }
    }
}