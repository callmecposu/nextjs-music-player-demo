"use client";

import { EDGE_RUNTIME_WEBPACK } from "next/dist/shared/lib/constants";
import React, { useState } from "react";

export default function QueryForm({
  embedCodesSetter,
  playerIndexSetter,
  loadingSetter,
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    loadingSetter(true);
    let embedCodes = [];
    const searchResp = await fetch(
      `/api/search_sc?q=${query.split(" ").join("%20")}`
    );
    const searchRes = await searchResp.json();
    console.log(searchRes);
    let fetchPromises = [];
    for (let url of searchRes.trackLinks) {
      fetchPromises.push(
        fetch("/api/embed_player?url=" + encodeURIComponent(url))
      );
    }
    await Promise.all(fetchPromises)
      .then((fetchResponses) => {
        console.log(fetchResponses);
        return Promise.all(
          fetchResponses.map((fetchResponse) => fetchResponse.json())
        );
      })
      .then((fetchResults) => {
        console.log(fetchResults);
        embedCodes = [...fetchResults.map((x) => x.embedCode)];
      });

    embedCodesSetter(embedCodes);
    playerIndexSetter(0);
    loadingSetter(false);
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
