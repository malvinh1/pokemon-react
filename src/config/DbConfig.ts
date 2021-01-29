export const DBConfig = {
  name: "PokemonDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "pokemons",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "nickname", keypath: "nickname", options: { unique: true } },
        { name: "image", keypath: "image", options: { unique: false } },
      ],
    },
  ],
};
