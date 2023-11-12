using Microsoft.AspNetCore.Mvc;

namespace limesz_app.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TestController: ControllerBase
	{
        public TestController()
        {

        }

#if TEST
        [HttpGet("set-time/{millis}")]
        public bool SetTime(long millis)
        {
            var target = DateTime.UnixEpoch;
            target = target.AddMilliseconds(millis);
            UTCNow.SetTime(target);
            return true;
        }
#endif

    }
}

