"use client";

import React, { useState } from "react";

export default function QueryForm({ callback }) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch(
      `http://localhost:3000/api/search_sc?q=${query.split(" ").join("%20")}`
    );
    const res = await resp.json();
    console.log(res);
    callback(res.embedCodes);
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
