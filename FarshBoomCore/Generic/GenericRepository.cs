using Microsoft.EntityFrameworkCore;
using FarshBoomCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using FarshBoomCore.Data;

namespace FarshBoomCore.Repositories.Generic
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        public DataContext context;
        public DbSet<TEntity> dbSet;
        string errorMessage = string.Empty;
        public GenericRepository(DataContext context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }
        public async Task<IEnumerable<TEntity>> GetAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return await orderBy(query).ToListAsync();
            }
            else
            {
                return await query.ToListAsync();
            }
        }

        public IQueryable<TEntity> GetAsQueryable(
           Expression<Func<TEntity, bool>> filter = null,
           string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            return query;
        }

        public async Task<TEntity> GetByIDAsync(object id)
        {
            return await dbSet.FindAsync(id);
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync(string includeProperties = "")
        {
            if (!string.IsNullOrEmpty(includeProperties))
                return await dbSet.Include(includeProperties).ToListAsync();
            else
                return await dbSet.ToListAsync();

        }

        public IEnumerable<TEntity> GetAll(string includeProperties = "")
        {
            if (!string.IsNullOrEmpty(includeProperties))
                return dbSet.Include(includeProperties).ToList();
            else
                return dbSet.ToList();
        }

        public async Task<int> InsertAsync(TEntity entity)
        {
            
            try
            {
                entity.AddedDate = DateTime.Now;
                dbSet.Add(entity);
                return await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }

        public int Insert(TEntity entity)
        {
            try
            {
                entity.AddedDate = DateTime.Now;

                dbSet.Add(entity);
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }

        public async Task<int> RemoveAsync(object id)
        {
            try
            {
                TEntity entityToDelete = dbSet.Find(id);
                if (context.Entry(entityToDelete).State == EntityState.Detached)
                {
                    dbSet.Attach(entityToDelete);
                }
                dbSet.Remove(entityToDelete);
                return await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }
        public async Task<int> DeleteAllAsync(
             Expression<Func<TEntity, bool>> filter = null)
        {
            try
            {
                var itemsToBeDeleted = dbSet.Where(filter);
                dbSet.RemoveRange(itemsToBeDeleted);
                return await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }

        public async Task<int> UpdateAsync(TEntity entityToUpdate)
        {
            try
            {
                entityToUpdate.LastModifiedDate = DateTime.Now;
                context.Update(entityToUpdate);
                return await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }

        public async Task<int> InsertAllAsync(List<TEntity> entities)
        {
            try
            {
                dbSet.AddRange(entities);
                return await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }
    }
}
