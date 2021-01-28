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
        () => {
          console.log("pokemon catched!");
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
      <div css={styles.title}>{result === 1 ? "SUCCESSFUL!" : "FAILED"}</div>
      <div css={styles.subtitle}>
        {result === 1 ? "Gotta catch em' all!" : "It ran away..."}
      </div>
      <a css={styles.button} href="/">
        <div css={styles.buttonText}>{"<"}</div>
      </a>
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
    title: css({
      fontWeight: 700,
      textAlign: "center",
      fontSize: "5vmin",
      color: colors.primary,
    }),
    subtitle: css({
      fontWeight: 700,
      textAlign: "center",
      fontSize: "3vmin",
      color: colors.primary,
    }),
    button: css({
      textDecoration: "none",
      backgroundColor: "#ffcb05",
      boxShadow: "0 1px 6px 0 rgb(49 53 59 / 12%)",
      padding: 16,
      marginTop: 16,
      borderRadius: 10,
      outline: "none",
      transform: "matrix(1,0,0,1,0,0)",
      transition: ".25s ease",
    }),
    buttonText: css({
      fontWeight: 700,
      fontSize: "3rem",
      margin: "0 10px",
    }),
  };
};
