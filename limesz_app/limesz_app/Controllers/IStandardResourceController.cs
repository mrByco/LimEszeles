using Microsoft.AspNetCore.Mvc;

namespace margarita_app.Controllers;

public interface IStandardResourceController<T>
{
    public Task<List<T>> Get();
    public Task<T> Get(int id);
    public Task<T> Post([FromBody] object value);
    public Task<T> Put(int id, [FromBody] object value);
    public Task<T> Delete(int id);
}