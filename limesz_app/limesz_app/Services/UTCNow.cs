namespace limesz_app.Services
{
	public class UTCNow
	{
		public static DateTime GetNow
		{
			get {
				return DateTime.UtcNow + Offset;
			}
		}

		private static TimeSpan Offset = TimeSpan.Zero;

#if TEST
		public static void SetTime(DateTime target)
		{
			Offset = target - DateTime.UtcNow;
		}
#endif
	}
}

