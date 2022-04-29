//PokemonAPIからデータを取得
const fetchPokemonApi = async () => {
    const allPokemonId = 809;
    for (let i = 1; i <= 1; i++) {
        await getPokemonData(i);
    }
};

const getPokemonData = async (id) => {
    //英語名で取得
    const pokemonDataUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(pokemonDataUrl);
    const reslt = await response.json();
    createPokemonCard(reslt);
};

const createPokemonCard = (data) => {
    const pokemon = {
        id: data.id,
        name: data.name,
        type: data.types,
        image: `../../images/${plasticSurgeryId(data.id)}.png`
    }
    const pokemonImage = document.getElementById('pokemon-image');
    pokemonImage.src  = pokemon.image;

    const pokemonId = document.getElementById('pokemonID');
    const pokemonName = document.getElementById('pokemonName');
    const pokemonType = document.getElementById('pokemonType');
    pokemonId.innerText = `No: ${plasticSurgeryId(data.id)}`;
    pokemonName.innerText = `Name: ${pokemon.name}`;
    pokemonType.innerText = `Type: ${plasticSurgeryType(pokemon.type)}`;
};


//ポケモンIDの整形(image用)
const plasticSurgeryId = (id) => {
    if (id <= 9) {
        id = `00${id}`;
    }else if (id <= 99) {
        id = `0${id}`;
    }
    return id;
}

//ポケモンタイプの整形
const plasticSurgeryType = (pokemonType) => {
    let types = [];
    let i = 0;
    //typeを配列に入れる
    const arrayType = (pokemonType).map(type => {
        types[i] = type.type.name;
        i++;
    });
    types = types.join('、');
    return types;
}

fetchPokemonApi();