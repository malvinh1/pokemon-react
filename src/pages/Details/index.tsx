/** @jsxImportSource @emotion/react */

import { useQuery } from "@apollo/client";
import { css, Theme, useTheme } from "@emotion/react";
import React, { useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { useHistory } from "react-router-dom";

import CatchButton from "../../components/CatchButton";
import Error from "../../components/Error";
import LoadingIndicator from "../../components/LoadingIndicator";
import {
  Pokemon,
  Pokemon_pokemon,
  PokemonVariables,
} from "../../generated/server/Pokemon";
import { POKEMON } from "../../graphql/server/pokemon";
import DetailsContent from "./components/DetailsContent";
import DetailsHeader from "./components/DetailsHeader";

type Props = {
  location: {
    state: {
      name: string;
      nickname?: string;
    };
  };
};

export default function Details(props: Props) {
  const styles = useStyles(useTheme());
  const { colors } = useTheme();
  const { deleteRecord, getByIndex } = useIndexedDB("pokemons");
  const history = useHistory();

  const [pokemonData, setPokemonData] = useState<Pokemon_pokemon>();
  const [nickname, setNickname] = useState("");
  const [catched, setCatched] = useState<{
    id: number;
    name: string;
    nickname: string;
  } | null>(null);

  const { loading, error } = useQuery<Pokemon, PokemonVariables>(POKEMON, {
    variables: {
      name: props.location.state.name,
    },
    onCompleted: async ({ pokemon }) => {
      if (pokemon) {
        setPokemonData(pokemon);
        setNickname(props.location.state.nickname || pokemon.name || "");

        const catchedPokemon = await getByIndex(
          "nickname",
          props.location.state.nickname || pokemon.name
        );

        if (catchedPokemon) {
          setCatched(catchedPokemon);
        }
      }
    },
  });

  const onCatchClick = () => {
    if (catched) {
      deleteRecord(catched.id).then(
        () => {
          console.log("successfully released the pokemon");
        },
        (error) => {
          console.log(error);
        }
      );
      history.goBack();
    } else {
      history.push({
        pathname: "/catching-pokemon",
        state: {
          name: pokemonData?.name,
          nickname: nickname,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData?.id}.png`,
        },
      });
    }
  };

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
          name={nickname}
          types={pokemonData?.types}
        />
        <DetailsContent pokemonData={pokemonData} />
      </div>
      <CatchButton
        label={catched ? "RELEASE" : "CATCH"}
        onClick={onCatchClick}
      />
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
