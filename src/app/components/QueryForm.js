"use client";

import React, { useState } from "react";

export default function QueryForm({ callback, loadingToggler }) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    loadingToggler();
    const playerResp = await fetch(
      `http://localhost:3000/api/search_sc?q=${query.split(" ").join("%20")}`
    );
    const playerRes = await playerResp.json();
    console.log(playerResp);
    const lyricsResp = await fetch(
      `http://localhost:3000/api/search_genius?q=${query
        .split(" ")
        .join("%20")}`
    );
    const lyricsRes = await lyricsResp.json()
    console.log(lyricsRes);
    callback(playerRes.embedCodes, lyricsRes.result);
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
