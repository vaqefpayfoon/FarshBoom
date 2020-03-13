
using FarshBoomCore.Data;
using FarshBoomCore.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FarshBoomCore.Repositories.Generic
{
    public class MediaRepository<TEntity> : IMediaRepository<TEntity> where TEntity : Media
    {
        public DataContext context;
        public DbSet<TEntity> dbSet;

        public MediaRepository(DataContext context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }

        public int DeleteMedia(int rowId, string mediaType, string fileName)
        {
            try
            {
                var entityToDelete = dbSet.Where(q => q.FileName == fileName && q.RowId == rowId && q.MediaType == mediaType)
                .FirstOrDefault();
                dbSet.Remove(entityToDelete);
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }

        }

        public async Task<int> DeleteMediaAsync(int rowId, string mediaType, string fileName)
        {
            try
            {
                var entityToDelete = dbSet.Where(q => q.FileName == fileName && q.RowId == rowId && q.MediaType == mediaType)
                .FirstOrDefault();
                dbSet.Remove(entityToDelete);
                return await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }

        }

        public List<Media> GetTitleDescriptions(int rowId)
        { 
            var result =  dbSet.Where(q => q.RowId == rowId)
                .Select(x => new Media
                {
                    Description = x.Description,
                    Title = x.Title,
                    MediaType = x.MediaType,
                    FileName = x.FileName.Replace(".", "")
                }).ToList();

            return result;
        }

        public int UpdateInfo(int rowId, string mediaType, string fileName, string value, string field)
        {
            try
            {
                var entityToUpdate = dbSet.Where(q => q.FileName == fileName && q.RowId == rowId && q.MediaType == mediaType)
                .FirstOrDefault();

                if (field.ToUpper() == "TITLE")
                {
                    entityToUpdate.Title = value;
                }
                else if (field.ToUpper() == "DESCRIPTION")
                {
                    entityToUpdate.Description = value;
                }
                return  context.SaveChanges();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }
    }
}
