using FarshBoomCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FarshBoomCore.Repositories.Generic
{
    public interface IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        Task<IEnumerable<TEntity>> GetAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "");

        IQueryable<TEntity> GetAsQueryable(
            Expression<Func<TEntity, bool>> filter = null,
            string includeProperties = "");
        Task<IEnumerable<TEntity>> GetAllAsync(string includeProperties = "");
        IEnumerable<TEntity> GetAll(string includeProperties = "");
        Task<TEntity> GetByIDAsync(object id);
        Task<int> InsertAsync(TEntity entity);
        Task<int> DeleteAllAsync(Expression<Func<TEntity, bool>> filter = null);
        
        Task<int> UpdateAsync(TEntity entityToUpdate);
        Task<int> InsertAllAsync(List<TEntity> entities);
        Task<int> RemoveAsync(object id);
        int Insert(TEntity entity);
    }
}
