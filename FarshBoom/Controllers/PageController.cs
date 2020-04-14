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
    public class PageController : ControllerBase
    {
        private IGenericRepository<Page> _repoHeader;
        private IGenericRepository<PageContent> _repo;
        private IMapper _mapper;
        public PageController(IGenericRepository<PageContent> repo, IGenericRepository<Page> repoHeader, IMapper mapper)
        {
            _repo = repo;
            _repoHeader = repoHeader;
            _mapper = mapper;
        }
        [HttpPost("savePageContent")]
        public async Task<IActionResult> SavePageContent(PageContent model)
        {
            //PageContent goodToCreate = _mapper.Map<PageContent>(model);
            int result = await _repo.InsertAsync(model);
            if(result == -1)
                throw new Exception($"couldn't insert this carpet");

            //var goodToReturn = _mapper.Map<GoodDto>(goodToCreate);

            return Ok(new {id = model.Id});
        }
        [HttpPost("updatePageContent")]
        public async Task<IActionResult> UpdatePageContent(PageContent model)
        {
            PageContent updatedPageContent = await _repo.GetByIDAsync(model.Id);
            //_mapper.Map(goodForUpdateDto, updatedGood);
            var good = await _repo.UpdateAsync(updatedPageContent);
            if(good == -1)
                throw new Exception($"Updating pageContent {model.Id} failed on save");
            else
                return Ok(model.Id);
            
        }
        [HttpPost("{id}/photoUpdate")]
        [AllowAnonymous]
        public async Task<IActionResult> PhotoUpdate(int id, [FromForm]UpdatePhotoGoodDto photoForCreationDto)
        {
            var pageContentFromRepo = await _repo.GetByIDAsync(id);

            var file = photoForCreationDto.File;
            
            if (file.Length > 0)
            {
                string ImageName= id.ToString() + Path.GetExtension(file.FileName);
                string SavePath = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot/img",ImageName);
                //string RelatedPath = Path.Combine("../wwwroot/img", ImageName);
                string RelatedPath = Path.Combine("~/wwwroot/img", ImageName);
                pageContentFromRepo.ImageUrl = ImageName;
                MemoryStream ms = new MemoryStream();
                    file.CopyTo(ms);
                    pageContentFromRepo.Image = ms.ToArray();
                var result = await _repo.UpdateAsync(pageContentFromRepo);
                // using(var stream = new FileStream(SavePath, FileMode.Create))
                // {
                //     file.CopyTo(stream);
                // }
            }
            return Ok(pageContentFromRepo);
        }
        [HttpPost("deletePageContent")]
        public async Task<IActionResult> DeleteGood(StringModel name) 
        {        
            var pageContent = await _repo.GetByIDAsync(name.Id);

            await _repo.RemoveAsync(pageContent.Id);
                
            throw new Exception($"couldn't delete this page");
        }
        [HttpGet("getPageContent")]
        public async Task<IActionResult> GetPageContent(string key, string field) 
        {        
            //var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault();
            PageContent pageContent;
            if(field.Equals("name"))
                pageContent = await _repo.GetFirstAsync(woak => woak.Title.Equals(key));
            else
                pageContent = await _repo.GetFirstAsync(woak => woak.Id == Convert.ToInt32(key));
            //GoodDto goodDto = _mapper.Map<GoodDto>(good);
            return Ok(new {pageContent = pageContent});
        }
        [HttpGet("getPages")]
        public async Task<IActionResult> GetPages() 
        {        
            var allPages = await _repoHeader.GetAllAsync();
            //IEnumerable<GoodDto> goods = _mapper.Map<IEnumerable<GoodDto>>(AllGoods);
            return Ok(allPages);
        }
        [HttpGet("getPageContents")]
        public async Task<IActionResult> GetPageContents() 
        {        
            var allPageContents = await _repo.GetAllAsync();
            //IEnumerable<GoodDto> goods = _mapper.Map<IEnumerable<GoodDto>>(AllGoods);
            return Ok(allPageContents);
        }
    }
}