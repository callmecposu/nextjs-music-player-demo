import { NextResponse } from "next/server";
const axios = require("axios");
const { JSDOM } = require("jsdom");

export async function GET(request) {
  let reqUrl = new URL(request.url);
  let trackURL = reqUrl.searchParams.get("url");
  let title = reqUrl.searchParams.get("title");
  let artist = reqUrl.searchParams.get("artist");
  trackURL = "https:/genius.com" + trackURL;
  const trackPageRes = await axios.get(trackURL);
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
  return NextResponse.json({ title, artist, lyrics }, { status: 200 });
}
