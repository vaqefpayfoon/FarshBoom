
using System.Collections.Generic;
using System.Threading.Tasks;
using FarshBoomCore.Models;

namespace FarshBoomCore.Repositories.Generic
{
    public interface IMediaRepository<TEntity> where TEntity : class
    {
        Task<int> DeleteMediaAsync(int rowId, string mediaType, string fileName);
        int DeleteMedia(int rowId, string mediaType, string fileName);
        int UpdateInfo(int rowId, string mediaType, string fileName, string value, string field);
        List<Media> GetTitleDescriptions(int rowId);
    }
}
