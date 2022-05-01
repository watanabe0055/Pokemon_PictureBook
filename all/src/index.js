//PokemonAPIからデータを取得
const fetchPokemonApi = async () => {
    const allPokemonId = 809;
    for (let i = 1; i <= allPokemonId; i++) {
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
        image: `../../images/${plasticSurgeryId(data.id)}.png`,
    };
    //innerHTMLで一括で生成する
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon-card");
    pokemonEl.innerHTML = `<img src=${
        pokemon.image
    } alt="ポケモンの画像" class="pokemonImage" id="pokemon-image">
    <di>
        <dt class="card-item" id="pokemonID">No: ${plasticSurgeryId(
            data.id
        )}</dt>
        <dt class="card-item" id="pokemonName">Name: ${pokemon.name}</dt>
        <dt class="card-item" id="pokemonType">Type: ${plasticSurgeryType(
            pokemon.type
        )}</dt>
    </di>`;
    const card = document.getElementById("container");
    card.appendChild(pokemonEl);
};

//ポケモンIDの整形(image用)
const plasticSurgeryId = (id) => {
    if (id <= 9) {
        id = `00${id}`;
    } else if (id <= 99) {
        id = `0${id}`;
    }
    return id;
};

//ポケモンタイプの整形
const plasticSurgeryType = (pokemonType) => {
    let types = [];
    let i = 0;
    //typeを配列に入れる
    const arrayType = pokemonType.map((type) => {
        types[i] = type.type.name;
        i++;
    });
    types = types.join("、");
    return types;
};

const pokemonCard = document.getElementById("pokemon-card");

fetchPokemonApi();

const toggle = document.getElementById("mycheck");
const onClickToggle = () => {
    console.log(toggle.checked);
};
