import React from "react";

export default function LyricsContainer({ info }) {
  return (
    <div className="m-4 border-2 rounded-md">
      <h2 className="text-lg font-semibold">{info.title}</h2>
      <h3 className=" text-md text-gray-400">{info.artist}</h3>
      <p
        className="mt-2"
        dangerouslySetInnerHTML={{ __html: info.lyrics.join("</br>") }}
      ></p>
    </div>
  );
}
