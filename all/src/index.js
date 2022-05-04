//ポケモンの総数
const allPokemonId = 809;

//PokemonAPIからデータを取得
const fetchPokemonApi = async () => {
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
    pokemonEl.setAttribute("id", "pokemonCard");
    pokemonEl.innerHTML = `<img src=${
        pokemon.image
    } alt="ポケモンの画像" class="pokemonImage" id="pokemon-image">
    <di>
        <dt class="card-item1" id=pokemonId${data.id}>No: ${plasticSurgeryId(
        data.id
    )}</dt>
        <dt class="card-item" id="pokemonName${data.id}">Name: ${
        pokemon.name
    }</dt>
        <dt class="card-item" id="pokemonType${
            data.id
        }">Type: ${plasticSurgeryType(pokemon.type)}</dt>
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

fetchPokemonApi();

const onClickToggle = () => {
    const toggle = document.getElementById("mycheck");
    //日本語の時
    if (toggle.checked) {
        jpPokemonCard();
    } else {
        enPokemonCard();
    }
};

//言語選択が日本語のとき
const jpPokemonCard = async () => {
    let count = 0;
    for (let i = 1; i <= allPokemonId; i++) {
        const name = document.getElementById(`pokemonName${i}`);
        const types = document.getElementById(`pokemonType${i}`);
        name.innerText = await changeLanguagePokemonName(count, "jp");
        changeLanguagePokemonType(i, "jp");
        types.innerText = await changeLanguagePokemonType(i, "jp");
        count++;
    }
};

//言語選択が英語のとき
const enPokemonCard = async () => {
    let count = 0;
    for (let i = 1; i <= allPokemonId; i++) {
        const name = document.getElementById(`pokemonName${i}`);
        const types = document.getElementById(`pokemonType${i}`);
        name.innerText = await changeLanguagePokemonName(count, "en");
        types.innerText = await changeLanguagePokemonType(i, "en");
        count++;
    }
};

///切り替えた言語を取得して、ポケモン名を返す
const changeLanguagePokemonName = async (id, lang) => {
    const pokemonDataUrl = "../../pokedex.json";
    const response = await fetch(pokemonDataUrl);
    const reslt = await response.json();
    switch (lang) {
        case "jp":
            return reslt[id].name.japanese;
            break;
        case "en":
            return reslt[id].name.english;
            break;
        default:
            return reslt[id].name.english;
            break;
    }
};

///切り替えた言語を取得して、タイプを返す
const changeLanguagePokemonType = async (id, lang) => {
    const pokemonDataUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(pokemonDataUrl);
    const reslt = await response.json();
    let typeArray = [];
    for (let i = 0; i < reslt.types.length; i++) {
        let pokemonSplitUrl = reslt.types[i].type.url;
        pokemonSplitUrl = pokemonSplitUrl.split("/");
        const pokemonDataType = `https://pokeapi.co/api/v2/type/${pokemonSplitUrl[6]}/`;
        const responseType = await fetch(pokemonDataType);
        const resltType = await responseType.json();
        switch (lang) {
            case "jp":
                typeArray[i] = resltType.names[8].name;
                break;
            case "en":
                typeArray[i] = resltType.names[7].name;
                break;
        }
    }
    return typeArray;
};
