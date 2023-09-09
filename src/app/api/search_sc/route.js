import { NextResponse } from "next/server";
const axios = require("axios");
const { JSDOM } = require("jsdom");

export async function GET(request) {
  let url = new URL(request.url);
  var embedCodes = [];
  // try search for a song on SoundCloud
  const query = url.search;
  const scqRes = await axios.get(`https://soundcloud.com/search${query}`);
  const scqDom = new JSDOM(scqRes.data);
  const scqHits = scqDom.window.document.querySelectorAll("ul")[1];
  let trackLinks = [];
  for (let i = 0; i < scqHits.children.length; i++) {
    const trackURL = scqHits.getElementsByTagName("a")[i].getAttribute("href");
    const fullTrackURL = `https://soundcloud.com${trackURL}`;
    console.log("track link: ", fullTrackURL);
    trackLinks.push(trackURL);
    // get HTML embed code for the track
    // const oembedRes = await fetch(
    //   `https://soundcloud.com/oembed?format=json&url=${fullTrackURL}`
    // );
    // const oembedResult = await oembedRes.json();
    // embedCodes.push(
    //   oembedResult.html.replace(
    //     '"></iframe>',
    //     '&show_comments=false&hide_related=true&show_reposts=false&show_teaser=false"></iframe>'
    //   )
    // );
  }

  // console.log("html embed codes: ");
  // console.log(embedCodes);
  return NextResponse.json({ trackLinks }, { status: 200 });
}
