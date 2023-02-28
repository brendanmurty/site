import "https://deno.land/x/dotenv@v3.2.0/load.ts";

export async function LastFmLovedTracks(): Promise<
  { artist: string; track: string; url: string }[]
> {
  const lastFmApiKey: string = Deno.env.get("LASTFM_API_KEY") || "";
  const lastFmApiUrl = "http://ws.audioscrobbler.com/2.0/";
  const lastFmUsername = "brendanmurty";

  if (!lastFmApiKey) {
    throw new Error(
      "LastFmLovedTracks - Required ENV variable (LASTFM_API_KEY) is not set."
    );
  }

  const apiRequestUrl: string =
    lastFmApiUrl +
    "?method=user.getlovedtracks&user=" +
    lastFmUsername +
    "&limit=5&api_key=" +
    lastFmApiKey +
    "&format=json";

  const apiResponse = await fetch(apiRequestUrl);
  const apiResponseBody = await apiResponse.json();

  if (apiResponse.status != 200) {
    throw new Error("LastFmLovedTracks - Invalid API response.");
  }

  const lovedTracks = [];
  for (const track of apiResponseBody.lovedtracks.track) {
    lovedTracks.push({
      artist: track.artist.name,
      track: track.name,
      url: track.url
    });
  }

  return lovedTracks;
}
