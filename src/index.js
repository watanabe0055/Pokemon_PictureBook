//日本語
//https://github.com/dayu282/pokemon-data.json

//image
//https://github.com/fanzeyi/pokemon.json

//inputのvauleを取得する
const onclickPokemonId = () => {
    const inputPokemonId = document.getElementById('Pokemon-id').value;
    fetchPokemonApi(inputPokemonId);
    getPokemonImage(inputPokemonId);
};

//PokemonAPIからデータを取得
const fetchPokemonApi = async (pokemonId) => {
    //英語名で取得
    const pokemonDataUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const response = await fetch(pokemonDataUrl);
    const reslt = await response.json();
    selectPokemonData(reslt, pokemonId)
};

//必要なデータのみ
const selectPokemonData = (data, number) => {
    const showPokemonData = document.getElementById('showPokemonData');
    showPokemonData.innerText = data.name;
};



//imageの取得
const getPokemonImage = (pokemonId) => {
    if (pokemonId <= 9) {
        pokemonId = `00${pokemonId}`;
    }else if (pokemonId <= 99) {
        pokemonId = `0${pokemonId}`;
    }

    pokemonImage = document.getElementById('pokemonImage');
    pokemonImage.src =`../images/${pokemonId}.png`;
}


///画面表示時にID:1の「フシギダネ」を表示させる
(() => {
    fetchPokemonApi(1);
    getPokemonImage(1);
    })();