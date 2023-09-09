import { NextResponse } from "next/server";
const axios = require("axios");
const { JSDOM } = require("jsdom");

export async function GET(request) {
  let query = new URL(request.url).search;
  console.log(query);
  // get lyrics link for the song with Genius API
  const gAPIres = await fetch(`https://api.genius.com/search${query}`, {
    headers: {
      Authorization: `${process.env.GENIUS_API_KEY}`,
    },
  });
  const gAPIresponse = await gAPIres.json();
  console.log(gAPIresponse);
  const gAPIhits = gAPIresponse.response.hits;
  let result = [];
  if (gAPIhits.length != 0) {
    for (let hit of gAPIhits) {
      if (hit.type == "song") {
        let title = hit.result.title;
        let artist = hit.result.artist_names;
        let trackURL = hit.result.path;
        const trackPageRes = await axios.get(`https://genius.com${trackURL}`);
        const trackPageDOM = new JSDOM(trackPageRes.data);
        const lyrConts = trackPageDOM.window.document.querySelectorAll(
          "div[data-lyrics-container='true']"
        );
        let lyrics = [];
        for (let i = 0; i < lyrConts.length; i++) {
          let scrapedLyrics = lyrConts[i].innerHTML.match(/>[^<]+</g);
          if (scrapedLyrics) {
            scrapedLyrics.forEach((line) => {
              lyrics.push(line.substring(1, line.length - 1));
            });
          }
        }
        const newRes = { title, artist, lyrics };
        console.log(newRes);
        result.push(newRes);
      }
    }
  }
  return NextResponse.json({ result }, { status: 200 });
}
