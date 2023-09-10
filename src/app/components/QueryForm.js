"use client";

import { EDGE_RUNTIME_WEBPACK } from "next/dist/shared/lib/constants";
import React, { useState } from "react";

export default function QueryForm({
  embedCodesSetter,
  playerIndexSetter,
  lyricsInfoSetter,
  lyricsIndexSetter,
  loadingSetter,
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    console.time("Data fetched in: ");
    e.preventDefault();
    loadingSetter(true);
    let embedCodes = [];
    let lyricsInfo = [];
    const SCsearchResp = await fetch(
      `/api/search_sc?q=${query.split(" ").join("%20")}`
    );
    const SCsearchRes = await SCsearchResp.json();
    console.log(SCsearchRes);
    const GsearchResp = await fetch(
      `/api/search_genius?q=${query.split(" ").join("%20")}`
    );
    const GsearchRes = await GsearchResp.json();
    console.log(GsearchRes);
    let SCfetchPromises = SCsearchRes.trackLinks.map((url) =>
      fetch("/api/embed_player?url=" + encodeURIComponent(url))
    );
    let GfetchPromises = GsearchRes.result.map((hit) =>
      fetch(
        `/api/scrap_lyrics?url=${encodeURIComponent(hit.url)}&artist=` +
          `${hit.artist}&title=${hit.title}`
      )
    );
    Promise.all([...SCfetchPromises, ...GfetchPromises])
      .then((fetchResponses) => {
        console.log(fetchResponses);
        return Promise.all(
          fetchResponses.map((fetchResponse) => fetchResponse.json())
        );
      })
      .then((fetchResults) => {
        console.log(fetchResults);
        embedCodes = [
          ...fetchResults
            .filter((x) => x.embedCode !== undefined)
            .map((x) => x.embedCode),
        ];
        lyricsInfo = [...fetchResults.filter((x) => x.lyrics !== undefined)];
        console.log(embedCodes);
        console.log(lyricsInfo);
        embedCodesSetter(embedCodes);
        playerIndexSetter(0);
        lyricsInfoSetter(lyricsInfo);
        lyricsIndexSetter(0);
        loadingSetter(false);
        console.timeEnd("Data fetched in: ");
      });
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
