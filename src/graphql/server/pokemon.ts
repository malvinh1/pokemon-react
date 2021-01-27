import { gql } from "@apollo/client";

export const POKEMONS = gql`
  query Pokemons($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      count
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`;
