//日本語
//https://github.com/dayu282/pokemon-data.json

//image
//https://github.com/fanzeyi/pokemon.json

//inputのvauleを取得する
const onclickPokemonId = () => {
    const inputPokemonId = document.getElementById('Pokemon-id').value;
    fetchPokemonApi(inputPokemonId);
};

const fetchPokemonApi = async (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    const response = await fetch(url);
    const reslt = await response.json();
    console.log(reslt.name)
};