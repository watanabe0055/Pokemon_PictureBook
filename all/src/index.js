//ポケモンの総数
const allPokemonId = 809;
//現在選択している言語フラグ
const toggle = document.getElementById("mycheck");

//PokemonAPIからデータを取得
const allPokemonGet = async () => {
    for (let i = 1; i <= allPokemonId; i++) {
        const getData = await fetchPokemonApi(i);
        createPokemonCard(getData);
    }
};

//pokemonAPIをfetchする
const fetchPokemonApi = async (id) => {
    const pokemonDataUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(pokemonDataUrl);
    const reslt = await response.json();
    return reslt;
};

//ポケモンカードを作成する
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
    pokemonEl.setAttribute("id", `pokemonCard-${data.id}`);
    pokemonEl.addEventListener("click", openModal);
    pokemonEl.innerHTML = `<img src=${
        pokemon.image
    } alt="ポケモンの画像" class="pokemonImage" id=pokemonImage-${data.id}>
    <di>
        <dt class="card-item" id=pokemonId-${data.id}>No: ${plasticSurgeryId(
        data.id
    )}</dt>
        <dt class="card-item" id="pokemonName-${data.id}">Name: ${
        pokemon.name
    }</dt>
        <dt class="card-item" id="pokemonType-${
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

const onClickToggle = () => {
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
        const name = document.getElementById(`pokemonName-${i}`);
        const types = document.getElementById(`pokemonType-${i}`);
        name.innerText = `名前:${await changeLanguagePokemonName(
            count,
            toggle.checked
        )}`;
        types.innerText = `タイプ:${await changeLanguagePokemonType(
            i,
            toggle.checked
        )}`;
        count++;
    }
};

//言語選択が英語のとき
const enPokemonCard = async () => {
    let count = 0;
    for (let i = 1; i <= allPokemonId; i++) {
        const name = document.getElementById(`pokemonName-${i}`);
        const types = document.getElementById(`pokemonType-${i}`);
        name.innerText = `Name:${await changeLanguagePokemonName(
            i,
            toggle.checked
        )}`;
        types.innerText = `Type:${await changeLanguagePokemonType(
            i,
            toggle.checked
        )}`;
        count++;
    }
};

///切り替えた言語を取得して、ポケモン名を返す
const changeLanguagePokemonName = async (id, lang) => {
    const pokemonDataUrl = "../../pokedex.json";
    const response = await fetch(pokemonDataUrl);
    const reslt = await response.json();
    switch (lang) {
        case true:
            return reslt[id].name.japanese;
            break;
        case false:
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
            case true:
                typeArray[i] = resltType.names[8].name;
                break;
            case false:
                typeArray[i] = resltType.names[7].name;
                break;
        }
    }
    return typeArray;
};

//ローディング画面
window.onload = function () {
    setTimeout(() => {
        //loader削除
        const loader = document.querySelector(".loader-containt");
        loader.classList.add("loaded");
        loader.remove();
        //content表示
        const content = document.querySelector(".pokemon-pictreBook");
        content.style.visibility = "visible";
        loader.style.position = "absolute";
    }, 500);
};

//モーダルの表示
const openModal = async (event) => {
    let clickId = event.target.id;
    const modal = document.getElementById("modal");
    modal.style.display = "block";
    clickId = clickId.split("-");
    const modalData = await fetchPokemonApi(clickId[1]);
    modalInnerText(modalData);
};

//モーダルの非表示
const closeModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
};

//バツボタン以外を押下しても、モーダルを閉じる
window.addEventListener("click", function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

//モーダル内のテキストを生成
const modalInnerText = async (data) => {
    const img = document.querySelector("#modalItemImage");
    const id = document.querySelector("#modalItemId");
    const name = document.querySelector("#modalItemName");
    const type = document.querySelector("#modalItemType");
    const height = document.querySelector("#modalItemHeight");
    const weight = document.querySelector("#modalItemWeight");
    const hp = document.querySelectorAll(".status-list-hp");
    const attack = document.querySelectorAll(".status-list-attack");
    const defense = document.querySelectorAll(".status-list-defense");
    const spattack = document.querySelectorAll(".status-list-spattack");
    const spdefense = document.querySelectorAll(".status-list-spdefense");
    const speed = document.querySelectorAll(".status-list-speed");

    //日本語の時
    const label = document.querySelectorAll(".label");
    if (toggle.checked) {
        name.innerText = `名前: ${await changeLanguagePokemonName(
            data.id - 1,
            toggle.checked
        )}`;
        type.innerText = `タイプ: ${await changeLanguagePokemonType(
            data.id,
            toggle.checked
        )}`;
        height.innerText = `高さ: ${data.height / 10}m`;
        weight.innerText = `重さ: ${data.weight / 10}kg`;
        label[0].innerText = "たいりょく";
        label[1].innerText = "こうげき";
        label[2].innerText = "ぼうぎょ";
        label[3].innerText = "とくこう";
        label[4].innerText = "とくぼう";
        label[5].innerText = "すばやさ";
    } //英語の時
    else {
        name.innerText = `Name: ${await changeLanguagePokemonName(
            data.id - 1,
            toggle.checked
        )}`;
        type.innerText = `Type: ${await changeLanguagePokemonType(
            data.id,
            toggle.checked
        )}`;
        height.innerText = `Height: ${data.height / 10}m`;
        weight.innerText = `Weight: ${data.weight / 10}kg`;
        label[0].innerText = "HP";
        label[1].innerText = "Attack";
        label[2].innerText = "Defense";
        label[3].innerText = "Special Attack";
        label[4].innerText = "Special Defense";
        label[5].innerText = "Speed";
    }
    img.src = `../../images/${plasticSurgeryId(data.id)}.png`;
    id.innerText = `No: ${plasticSurgeryId(data.id)}`;
    statusBar(data.stats[0].base_stat, hp);
    statusBar(data.stats[1].base_stat, attack);
    statusBar(data.stats[2].base_stat, defense);
    statusBar(data.stats[3].base_stat, spattack);
    statusBar(data.stats[4].base_stat, spdefense);
    statusBar(data.stats[5].base_stat, speed);
};

//ステータスの色を変える
const statusBar = (num, stats) => {
    let elementNum = 0;
    for (let index = 1; index < num / 10; index++) {
        stats[elementNum].style.backgroundColor = "#fc0";
        elementNum++;
    }
};

allPokemonGet();
