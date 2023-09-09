"use client";

import { EDGE_RUNTIME_WEBPACK } from "next/dist/shared/lib/constants";
import React, { useState } from "react";

export default function QueryForm({
  embedCodesNumSetter,
  embedCodesSetter,
  playerIndexSetter,
  playerIndexRef,
  loadingToggler,
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    loadingToggler(true);
    let embedCodes = [];
    const searchResp = await fetch(
      `/api/search_sc?q=${query.split(" ").join("%20")}`
    );
    const searchRes = await searchResp.json();
    console.log(searchRes);
    embedCodesNumSetter(searchRes.trackLinks.length);
    for (let url of searchRes.trackLinks) {
      const embedResp = await fetch(
        "/api/embed_player?url=" + encodeURIComponent(url)
      );
      const embedRes = await embedResp.json();
      embedCodes.push(embedRes.embedCode);
      console.log(embedCodes);
      if (embedCodes.length == 1) {
        embedCodesSetter([...embedCodes]);
        playerIndexSetter(0);
        loadingToggler(false);
      }
    }
    let myInterval = setInterval(() => {
      console.log(`player index: ${playerIndexRef.current}`);
      if (playerIndexRef.current == 1) {
        embedCodesSetter(embedCodes);
        clearInterval(myInterval);
      }
    }, 1000);

    // const lyricsResp = await fetch(
    //   `/api/search_genius?q=${query.split(" ").join("%20")}`
    // );
    // const lyricsRes = await lyricsResp.json();
    // console.log(lyricsRes);
    // callback(playerRes.embedCodes, lyricsRes.result);
  };

  return (
    <div className="flex justify-center mt-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your query"
          required
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="border-2 rounded-md"
        ></input>
        <button type="submit" className="ms-2 p-2 rounded-md bg-gray-200">
          Search
        </button>
      </form>
    </div>
  );
}
