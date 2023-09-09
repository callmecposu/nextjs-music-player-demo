import { NextResponse } from "next/server";

export async function GET(request) {
  let trackURL = new URL(request.url).searchParams.get("url");
  trackURL = "https://soundcloud.com" + trackURL;
  console.log("track URL: ", trackURL);
  const oembedResp = await fetch(
    `https://soundcloud.com/oembed?format=json&url=${trackURL}`
  );
  if (oembedResp.ok) {
    const oembedRes = await oembedResp.json();
    console.log(oembedRes);
    const embedCode = oembedRes.html.replace(
      '"></iframe>',
      '&show_comments=false&hide_related=true&show_reposts=false&show_teaser=false"></iframe>'
    );
    return NextResponse.json({ embedCode }, { status: 200 });
  } else {
    return NextResponse.json({embedCode: 'failed to get the embed code'}, {status:oembedResp.status})
  }
}
