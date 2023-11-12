using System.Text;
using Newtonsoft.Json;

namespace limesz_app.Misc
{
	public class DalleClient
	{

		public DalleClient()
		{
		}

		/// <summary>
		/// Retrieves an image from the DALL-E API based on a given prompt.
		/// </summary>
		/// <param name="prompt">The text prompt used to generate the image.</param>
		/// <returns>A Base64-encoded image as a string.</returns>
		public async Task<string> GetImage(string prompt)
		{
            var client = new HttpClient();
            var request = new HttpRequestMessage();
            request.RequestUri = new Uri("https://api.openai.com/v1/images/generations");
            request.Headers.Add("Authorization", $"Bearer {Config.Instance.OPEN_AI_KEY}");

            request.Method = HttpMethod.Post;

            request.Content = new StringContent(@"{
                        ""prompt"": """ + prompt + @""",
                        ""n"": 1,
                        ""response_format"": ""b64_json"",
                        ""size"": ""1024x1024""
                    }", Encoding.UTF8, "application/json");

            var response = await client.SendAsync(request);
            var responseString = await response.Content.ReadAsStringAsync();
            var parsedResponse = JsonConvert.DeserializeObject<DalleResponse>(responseString);
            return parsedResponse!.data[0].b64_json;
        }
	}

    public class DalleResponse
    {
        public int created { get; set; }
        public List<DalleResponseImage> data { get; set; }
    }

    public class DalleResponseImage
    {
        public string url { get; set; }
        public string b64_json { get; set; }
    }
}

