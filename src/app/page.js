"use client";

import { useState } from "react";
import SCPlayer from "./components/SCPlayer";
import QueryForm from "./components/QueryForm";

export default function Home() {
  const [playerEmbedCodes, setPlayerEmbedCodes] = useState([]);
  const [playerIndex, setPlayerIndex] = useState(0);

  return (
    <div>
      <h2 className="text-center text-4xl font-semibold">Music player Demo</h2>
      <QueryForm
        callback={(x) => {
          setPlayerEmbedCodes(x);
          console.log("embed codes state:");
          console.log(playerEmbedCodes);
          setPlayerIndex(0);
        }}
      />
      <SCPlayer embedCode={playerEmbedCodes[playerIndex]} />
      {playerEmbedCodes.length != 0 && playerIndex > 0 && (
        <button
          className="rounded-md bg-gray-200 m-2 p-2"
          onClick={() => setPlayerIndex(playerIndex - 1)}
        >
          Show Prev
        </button>
      )}
      {playerEmbedCodes.length != 0 &&
        playerIndex < playerEmbedCodes.length - 1 && (
          <button
            className="rounded-md bg-gray-200 m-2 p-2"
            onClick={() => setPlayerIndex(playerIndex + 1)}
          >
            Show Next
          </button>
        )}
    </div>
  );
}
