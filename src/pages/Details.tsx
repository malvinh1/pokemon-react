/** @jsxImportSource @emotion/react */

import { useQuery } from "@apollo/client";
import { css, Theme, useTheme } from "@emotion/react";
import React, { useState } from "react";

import Pokeball from "../assets/pokeball.png";
import Error from "../components/Error";
import Header from "../components/Header";
import LoadingIndicator from "../components/LoadingIndicator";
import {
  Pokemon,
  Pokemon_pokemon,
  PokemonVariables,
} from "../generated/server/Pokemon";
import { POKEMON } from "../graphql/server/pokemon";

type Props = {
  location: {
    state: {
      name: string;
    };
  };
};

export default function Details(props: Props) {
  const styles = useStyles(useTheme());

  const [pokemonData, setPokemonData] = useState<Pokemon_pokemon>();

  const { loading, error } = useQuery<Pokemon, PokemonVariables>(POKEMON, {
    variables: {
      name: props.location.state.name,
    },
    onCompleted: ({ pokemon }) => {
      if (pokemon) {
        setPokemonData(pokemon);
      }
    },
  });

  if (loading) {
    return <LoadingIndicator containerStyle={{ marginTop: 100 }} />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div css={styles.container}>
      <Header />
      <div css={styles.detailsContainer}>
        <div css={styles.detailsHeader}>
          <img
            css={styles.image}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData?.id}.png`}
          />
          <form css={styles.detailsNameContainer}>
            <input
              css={styles.detailsName}
              value={pokemonData?.name || ""}
              onChange={() => {}}
            />
          </form>
          <div css={styles.detailsTypeContainer}>
            {pokemonData?.types?.map((item) => (
              <div key={Math.random()} css={styles.detailsValues}>
                {item?.type?.name}
              </div>
            ))}
          </div>
        </div>

        <div css={styles.details}>
          <div css={styles.detailsPokemonContainer}>
            <div css={styles.detailsTitle}>ABILITIES</div>
            <div css={{ display: "flex", flexWrap: "wrap" }}>
              {pokemonData?.abilities?.map((item) => (
                <div key={Math.random()} css={styles.detailsAbilitiesAndMoves}>
                  {item?.ability?.name}
                </div>
              ))}
            </div>
          </div>

          <div css={styles.detailsPokemonContainer}>
            <div css={styles.detailsTitle}>MOVES</div>
            <div css={{ display: "flex", flexWrap: "wrap" }}>
              {pokemonData?.moves?.map((item) => (
                <div key={Math.random()} css={styles.detailsAbilitiesAndMoves}>
                  {item?.move?.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div css={styles.detailsButton}>
        <img css={styles.pokeballImage} src={Pokeball} alt="Catch em all!" />
        <div css={styles.detailsButtonText}>CATCH</div>
      </div>
    </div>
  );
}

const useStyles = ({ colors }: Theme) => {
  return {
    container: css({
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: colors.background,
    }),
    detailsContainer: css({
      display: "flex",
      marginBottom: "5rem",
      "@media screen and (max-width: 960px)": {
        flexDirection: "column",
        marginBottom: 0,
      },
    }),
    detailsHeader: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 16,
    }),
    detailsNameContainer: css({
      display: "flex",
      alignItems: "center",
    }),
    detailsTypeContainer: css({
      display: "flex",
      justifyContent: "center",
    }),
    detailsName: css({
      border: 0,
      fontSize: "2rem",
      fontWeight: 700,
      textTransform: "capitalize",
      marginTop: "-1rem",
      padding: 16,
      borderRadius: "1rem",
      backgroundColor: "#fff",
      textAlign: "center",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      "@media screen and (max-width: 960px)": {
        fontSize: "1.2rem",
      },
    }),
    detailsValues: css({
      padding: 16,
      margin: 16,
      borderRadius: "2rem",
      backgroundColor: "#fd7d24",
      textTransform: "capitalize",
      color: "#fff",
      fontWeight: 700,
      "@media screen and (max-width: 960px)": {
        fontSize: ".8rem",
        padding: 8,
      },
    }),
    details: css({
      display: "flex",
      borderLeft: "1px solid #ccc ",
      margin: 16,
      justifyContent: "center",
      "@media screen and (max-width: 960px)": {
        borderLeft: "none",
        borderTop: "1px solid #ccc ",
        flexDirection: "column",
      },
    }),
    detailsPokemonContainer: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 16,
    }),
    detailsTitle: css({
      color: "#D4AF37",
      margin: 16,
      fontSize: "1.5rem",
      fontWeight: 700,
      "@media screen and (max-width: 960px)": {
        fontSize: "1rem",
      },
    }),
    detailsAbilitiesAndMoves: css({
      padding: 16,
      margin: 16,
      borderRadius: "2rem",
      backgroundColor: "#fff",
      textTransform: "capitalize",
      textAlign: "center",
      fontWeight: 700,
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      "@media screen and (max-width: 960px)": {
        fontSize: ".8rem",
        padding: 8,
      },
    }),
    detailsButton: css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      padding: 16,
      borderRadius: 10,
      backgroundColor: "#fff",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      cursor: "pointer",
      filter: "grayscale(100%)",
      width: "15vmin",
      position: "sticky",
      bottom: 0,
      "&:hover": {
        filter: "none",
        backgroundColor: "grey",
        color: "#fff",
        transition: ".25s ease",
        transform: "matrix(1,0,0,1,0,-10)",
      },
    }),
    detailsButtonText: css({
      fontSize: "1rem",
      fontWeight: 700,
      marginTop: 6,
    }),
    image: css({
      height: 260,
      borderRadius: "15rem",
      backgroundColor: "#f5f5f5",
      "@media (max-width: 960px)": {
        height: 240,
      },
    }),
    pokeballImage: css({
      height: "15vmin",
      "@media (max-width: 960px)": {
        height: "10vmin",
      },
    }),
  };
};
