/** @jsxImportSource @emotion/react */

import { css, keyframes, Theme, useTheme } from "@emotion/react";
import React, { useEffect, useMemo } from "react";
import { useIndexedDB } from "react-indexed-db";

import Gotcha from "../assets/gotcha.png";
import PokemonRun from "../assets/pokemon-run.png";

type Props = {
  location: {
    state: {
      name: string;
      nickname: string;
    };
  };
};

export default function CatchPokemon({ location }: Props) {
  const styles = useStyles(useTheme());
  const { add } = useIndexedDB("pokemons");

  const result = useMemo(() => Math.floor(Math.random() * 2) + 0, []);

  useEffect(() => {
    if (result === 1) {
      add({
        name: location.state.name,
        nickname: location.state.nickname,
      }).then(
        (event) => {
          console.log("ID generated", event);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  return (
    <div css={styles.container}>
      <img css={styles.image} src={result === 0 ? PokemonRun : Gotcha} />
      <h1>Catching Pokemon</h1>
    </div>
  );
}

const Zoom = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

const useStyles = ({ colors }: Theme) => {
  return {
    container: css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
      backgroundColor: colors.background,
    }),
    image: css({
      animation: `${Zoom} 1s ease 1`,
      height: "50vmin",
      "@media screen and (max-width: 960px)": {
        height: "75vmin",
      },
    }),
  };
};
