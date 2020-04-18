using System.Threading.Tasks;
using AutoMapper;
using FarshBoom.Models;
using FarshBoom.Repositories.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Collections.Generic;
using FarshBoom.Dtos;
using System;

namespace FarshBoom.Controllers
{    
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private IMapper _mapper;
        public DashboardController(IMapper mapper)
        {
            _mapper = mapper;
        }
        [HttpGet("getBrnads")]
        public IActionResult GetBrnads() 
        {        
            string connectionString = "Data Source=185.88.152.127,1430;Initial Catalog=94_farsheboom ;User Id=94_vaq;Password=V@qef2512740;MultipleActiveResultSets=True;Max Pool Size=9000;persist security info=True;";
            SqlConnection cnn = new SqlConnection(connectionString);
            if(cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand();
            command.Connection = cnn;
            command.CommandText = @"SELECT TOP (8) count(ibt_srl) as brand,brand_name FROM [94_farsheboom].[dbo].[Project_Goods_View]
            group by brand_name  order by brand desc";
            SqlDataReader reader = command.ExecuteReader();
            List<BrandDto> lstBrand = new List<BrandDto>();
            while (reader.Read())
            {
                if(reader["brand"] == null)
                    continue;
                BrandDto brand = new BrandDto();
                brand.Brand = Convert.ToInt32(reader["brand"]);
                brand.BrandName = reader["brand_name"].ToString();
                lstBrand.Add(brand);
            }
            cnn.Close();
            return Ok(lstBrand);
        }

        [HttpGet("getProjects")]
        public IActionResult GetProjects() 
        {        
            string connectionString = "Data Source=185.88.152.127,1430;Initial Catalog=94_farsheboom ;User Id=94_vaq;Password=V@qef2512740;MultipleActiveResultSets=True;Max Pool Size=9000;persist security info=True;";
            SqlConnection cnn = new SqlConnection(connectionString);
            if(cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand();
            command.Connection = cnn;
            command.CommandText = @"SELECT top(8) Count(header_srl) header, project_name, from_date FROM [94_farsheboom].[dbo].[Project_Goods_View] group by project_name, from_date order by from_date desc";
            SqlDataReader reader = command.ExecuteReader();
            List<ProjectDto> lstProject = new List<ProjectDto>();
            while (reader.Read())
            {
                if(reader["header"] == null)
                    continue;
                ProjectDto project = new ProjectDto();
                project.Header = Convert.ToInt32(reader["header"]);
                project.ProjectName = reader["project_name"].ToString();
                project.FromDate = reader["from_date"].ToString();
                lstProject.Add(project);
            }
            cnn.Close();
            lstProject.Reverse();
            return Ok(lstProject);
        }
    }
}