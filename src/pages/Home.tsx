/** @jsxImportSource @emotion/react */

import { useTheme } from "@emotion/react";
import React from "react";

import Card from "../components/Card";
import Header from "../components/Header";

export default function Home() {
  const theme = useTheme();

  return (
    <div
      css={{
        height: "100vh",
        backgroundColor: theme.colors.background,
      }}
    >
      <Header />
      <Card
        name="bulbasaur"
        imgUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        pokemonOwned={0}
      />
    </div>
  );
}
