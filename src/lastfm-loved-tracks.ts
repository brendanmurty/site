import "https://deno.land/x/dotenv@v3.2.0/load.ts";

export async function LastFmLovedTracks(): Promise<{ artist: string; track: string; image: string; url: string; }[]> {
  const lastFmApiKey: string = Deno.env.get("LASTFM_API_KEY") || "";
  const lastFmUsername = "brendanmurty";

  if (!lastFmApiKey) {
    throw new Error("LastFmLovedTracks - Required ENV variable (LASTFM_API_KEY) is not set.");
  }

  const apiRequestUrl: string = 'http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=' + lastFmUsername + '&limit=5&api_key=' + lastFmApiKey + '&format=json';

  const apiResponse = await fetch(apiRequestUrl);
  const apiResponseBody = await apiResponse.json();

  if (apiResponse.status != 200) {
    throw new Error("LastFmLovedTracks - Invalid API response.");
  }

  let lovedTracks = [];
  for (const track of apiResponseBody.lovedtracks.track) {
    // TODO: Get the correct image URL here - https://www.last.fm/api/show/track.getInfo

    lovedTracks.push({
      "artist": track.artist.name,
      "track": track.name,
      "image": track.image[2]["#text"],
      "url": track.url,
    });
  }

  return lovedTracks;
}
