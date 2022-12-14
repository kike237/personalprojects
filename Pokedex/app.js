let mainScreen = document.querySelector(".main-screen");
let pokeName = document.querySelector(".poke-name");
let pokeId = document.querySelector(".poke-id");
let pokeFrontImg = document.querySelector(".poke-front-image");
let pokeBackImg = document.querySelector(".poke-back-image");
let pokeType1 = document.querySelector(".poke-type-one");
let pokeType2 = document.querySelector(".poke-type-two");
let pokeWeight = document.querySelector(".poke-weight");
let pokeHeight = document.querySelector(".poke-height");
let pokeListItems = document.querySelectorAll('.list-item')
let leftbutton = document.querySelector('left-button');
let rightbutton = document.querySelector('right-button');

//Variables

const AllPokemonTypes = [
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
];

let offsetvalue = 0;



//Functions

const resetScreen = () => {
  mainScreen.classList.remove("hide");
  for (let tipos of AllPokemonTypes) {
    mainScreen.classList.remove(tipos);
  }
};

function aumentarOffSet(){
    if(offsetvalue < 1133)
    offsetvalue+=20;
    fetchPokemonList();
}

function disminuirOffSet(){
    if(offsetvalue > 0)
    offsetvalue-=20;
    fetchPokemonList();
}

const getPokemonInfo = (e) => {
    if(!e.target) return;
    const listItem = e.target;
    if(!listItem.textContent) return;

    const id = listItem.textContent.split('.')[0];
    fetchPokemonData(id);
}


////
const fetchPokemonData = (id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then((res) => res.json())
  .then((data) => {
    

    resetScreen();

    pokeName.textContent = data["name"];
    pokeId.textContent ="#"+data["id"].toString().padStart(3,"0");

    const dataTypes = data["types"];
    const dataFirstType = dataTypes["0"];
    const dataSecondType = dataTypes["1"];

    pokeType1.textContent = dataFirstType["type"]["name"];
    if (dataSecondType) {
      pokeType2.textContent = dataSecondType["type"]["name"];
      pokeType2.classList.remove("hide");
    } else {
      pokeType2.textContent = "";
      pokeType2.classList.add("hide");
    }

    mainScreen.classList.add(
      (pokeType1.textContent = dataFirstType["type"]["name"])
    );

    pokeWeight.textContent = data.weight+" oz";
    pokeHeight.textContent = data["height"]+" inch";

    pokeFrontImg.src = data["sprites"]["front_default"] || "";
    pokeBackImg.src = data["sprites"]["back_default"] || "";
  });


  //get data for the right side

  const fetchPokemonList = () => {fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offsetvalue}&limit=20`)
  .then(res =>res.json())
  .then(data=>{
    
    const { results } = data;
    

for (let i=0;i<pokeListItems.length;i++){
 const pokeListItem = pokeListItems[i]
 const resultData = results[i];

 if(resultData){
    const { name, url } = resultData;
    const urlArray = url.split('/');
    const id = urlArray[urlArray.length-2];
    pokeListItem.textContent = id+'.'+name;
 }
 else{
    pokeListItem.textContent='';
 }
}
})}

//pagination

// rightbutton.addEventListener("click", aumentarOffSet);
//lo hice en otro lado jaja
// leftbutton.addEventListener("click", disminuirOffSet);

for(let pokeListItem of pokeListItems){
    pokeListItem.addEventListener('click',getPokemonInfo)
}
//Initial State

fetchPokemonList();
fetchPokemonData(1);