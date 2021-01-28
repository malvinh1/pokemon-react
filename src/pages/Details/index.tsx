/** @jsxImportSource @emotion/react */

import { useQuery } from "@apollo/client";
import { css, Theme, useTheme } from "@emotion/react";
import React, { useState } from "react";

import Error from "../../components/Error";
import LoadingIndicator from "../../components/LoadingIndicator";
import {
  Pokemon,
  Pokemon_pokemon,
  PokemonVariables,
} from "../../generated/server/Pokemon";
import { POKEMON } from "../../graphql/server/pokemon";
import CatchButton from "./components/CatchButton";
import DetailsContent from "./components/DetailsContent";
import DetailsHeader from "./components/DetailsHeader";

type Props = {
  location: {
    state: {
      name: string;
    };
  };
};

export default function Details(props: Props) {
  const styles = useStyles(useTheme());
  const { colors } = useTheme();

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
    return (
      <LoadingIndicator
        containerStyle={{
          paddingTop: 100,
          height: "100vh",
          backgroundColor: colors.background,
        }}
      />
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <div css={styles.container}>
      <div css={styles.detailsContainer}>
        <DetailsHeader
          id={pokemonData?.id || 0}
          name={pokemonData?.name || ""}
          types={pokemonData?.types}
        />
        <DetailsContent pokemonData={pokemonData} />
      </div>
      <CatchButton />
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
  };
};
