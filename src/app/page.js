"use client";

import { useEffect, useRef, useState } from "react";
import SCPlayer from "./components/SCPlayer";
import QueryForm from "./components/QueryForm";
import LyricsContainer from "./components/LyricsContainer";
import Link from "next/link";

export default function Home() {
  const [playerEmbedCodes, setPlayerEmbedCodes] = useState([]);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [lyricsInfo, setLyricsInfo] = useState([]);
  const [lyricsIndex, setLyricsIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const lyrContRef = useRef();

  return (
    <div>
      <h2 className="text-center text-4xl font-semibold">Music player Demo</h2>
      <QueryForm
        loadingSetter={(x) => {
          setIsLoading(x);
        }}
        embedCodesSetter={(x) => setPlayerEmbedCodes(x)}
        playerIndexSetter={(x) => setPlayerIndex(x)}
        lyricsInfoSetter={(x) => setLyricsInfo(x)}
        lyricsIndexSetter={(x) => setLyricsIndex(x)}
      />
      {isLoading && (
        <div className="w-full mt-4 text-center text-xl font-semibold text-gray-400 animate-bounce">
          Loading...
        </div>
      )}
      {!isLoading && <SCPlayer embedCode={playerEmbedCodes[playerIndex]} />}
      {playerEmbedCodes.length != 0 && playerIndex > 0 && !isLoading && (
        <button
          className="rounded-md bg-gray-200 m-2 p-2"
          onClick={() => setPlayerIndex(playerIndex - 1)}
        >
          Show Prev
        </button>
      )}
      {playerEmbedCodes.length != 0 &&
        playerIndex < playerEmbedCodes.length - 1 &&
        !isLoading && (
          <button
            className="rounded-md bg-gray-200 m-2 p-2"
            onClick={() => {
              setPlayerIndex(playerIndex + 1);
            }}
          >
            Show Next
          </button>
        )}
      <section ref={lyrContRef}></section>
      {lyricsInfo.length != 0 && !isLoading && (
        <LyricsContainer info={lyricsInfo[lyricsIndex]} />
      )}
      {lyricsInfo.length != 0 && lyricsIndex > 0 && !isLoading && (
        <button
          className="rounded-md bg-gray-200 m-2 p-2"
          onClick={() => {
            setLyricsIndex(lyricsIndex - 1);
            lyrContRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Show Prev
        </button>
      )}
      {lyricsInfo.length != 0 &&
        lyricsIndex < lyricsInfo.length - 1 &&
        !isLoading && (
          <button
            className="rounded-md bg-gray-200 m-2 p-2"
            onClick={() => {
              setLyricsIndex(lyricsIndex + 1);
              lyrContRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Show Next
          </button>
        )}
    </div>
  );
}
