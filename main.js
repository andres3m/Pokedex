/*
async function getPokemon(){
    let response = await
    fetch("https://pokeapi.co/api/v2/pokemon/1/");
    let data = await response.json();
    console.log(data)
}
getPokemon()

async function get10RandomQuestions(){
    let response = await
    fetch("https://opentdb.com/api.php?amount=10");
    let data = await response.json();
    console.log(data)
}
get10RandomQuestions()

async function getDadJoke(){
    let response = await
    fetch("https://icanhazdadjoke.com/", {
  headers: { accept: "application/json" },
});
    let data = await response.json();
    console.log(data)
}
getDadJoke()

async function getHelloEnglishDefinition(){
    let response = await
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_GB/hello`);
    let data = await response.json();
    console.log(data)
}
getHelloEnglishDefinition()
*/

/*
PLAN TO BUILD a POKEDEX:

0. Test con console that we can get the info from the API ✅
1. Choose the visual structure or interface of our POKEDEX to be coded in .html
It can contain: 

main title (title)*
main logo (img) to remove background squares ❗
main heading (h1)*
subheading (h2) optional
search box (textinput)*
search (button)*
Results (p)*


2. Code the chosen structure in the .html file.✅
3. Code on .js file the code that allow us to search for a pokemon by name and it
returns to us it's information:

-async Function that bring to us the data from 
the API*
-select p with id #pokemonresults*
-get the info out of the data*
-change the text pf the p tp that info*
-call the function at the bottom 

-select buttpn with id #search
-store button in a variable

-Attach Event listener to that button with 
addEventListener method
-tell the event listener to list for a click
-give the event listener the ability to call 
getpokemoninfo() when the click happens


[Behaviour of the webpage]
-When we enter to the website:
-show static website
-if user type a pokemon name and click search button the site will show the info of
that pokemon.
-if there is no match to the search, the site will return, " Pokemon not found" message.


4 o 5. Give style to the webpage, by adding a background color and some style to the
info shown.
4 o 5 If there is a picture of each pokemon on the database: try to show it on the 
information result of the searched pokemon

6. If we have time we can try to show a hint autocomplete on the search box so the site 
will try to autocomplete the name of the pokemon the user typed.

*/

// Function to capitalise first letter so the name is displayed like "Pikachu" instead of "pikachu"
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Clear all cards from screen
function clearAllCards() {
  return (document.querySelector(".allPokeCards").innerHTML = "");
}

//Save the array of object form the API in to a variable called apiData
let apiData = [];

// Function to get fisrt 100 pokemon form the API
async function getAllPokemonFromAPI() {
  for (let i = 1; i <= 151; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    const data = await response.json();
    apiData.push(data);
  }
  console.log(apiData);
}

//When script runs it fetches from the API only once
let fetchCounter = 0;
if (fetchCounter === 0) {
  getAllPokemonFromAPI();
  fetchCounter++;
}

function getAllPokemonCards() {
  resultsContainer.innerHTML = ""; // Clear any previous rearch results
  clearAllCards();
  // //const addedCards = new Set();
  apiData.forEach(function (element) {
    let name = capitalizeFirstLetter(element.name);
    const cards = document.querySelector(".allPokeCards");
    let card = document.createElement("div");
    card.setAttribute("class", "pokeCard");
    card.innerHTML = `
        <img class="pokeAllImg" src="${element.sprites.other.dream_world.front_default}" alt="${apiData.name}">        
        <h2>${name} <br/> No.${element.id}</h2>`;
    cards.appendChild(card);
    /*if (!addedCards.has(card)) {// Check if the card has already been added
            addedCards.add(card);// If not, add it to the set and append it to the DOM
            cards.appendChild(card);
        }*/
  });
}

let getAllButton = document.querySelector(".getAllButton");
getAllButton.addEventListener("click", getAllPokemonCards);

document.addEventListener("keydown", function(event) {
  if (event.code === "Home") {      
      debounce(getAllPokemonCards, 175);
  }
});

async function getRandomPokemon() {
  resultsContainer.innerHTML = ""; // Clear previous results
  clearAllCards();
  //Create a random number and assign it to the variable randomI
  let randomI = Math.floor(Math.random() * 151) + 1;
  // let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomI}/`);
  // let data = await response.json();
  let name = capitalizeFirstLetter(apiData[randomI].name);
  const cards = document.querySelector(".allPokeCards");
  let card = document.createElement("div");
  card.setAttribute("class", "singlePokeCard");
  card.innerHTML = `
      <img class="pokeSingImg" src="${apiData[randomI].sprites.other.dream_world.front_default}" alt="${name}">
      <h2 class="pokeSingName">${name}<br/> No.${apiData[randomI].id}</h2>`;      
  cards.appendChild(card);
}

let debounceTimeout;
let getRandomButton = document.querySelector(".getRandomButton");
getRandomButton.addEventListener("click", getRandomPokemon);

document.addEventListener("keydown", function(event) {
  if (event.code === "End") {
    debounce(getRandomPokemon, 175);
  }
});

function debounce(func, delay) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(func, delay);
}


// Function to perform search
function search(query) {
  // Filter the data array based on the query
  const filteredData = apiData.filter(function(item) {
    // Check if any key-value pair matches the query
    return Object.entries(item).some(function([key, value]) {
      if (typeof value === 'string') {
        return value.toLowerCase().startsWith(query.toLowerCase());
      } else if (key === 'id' && typeof value === 'number') {
        // If the key is 'id' and the value is a number, check if it matches the query
        return value === parseInt(query);
      }
      // If the value is neither a string nor an integer, don't include it in the filter
      return false;
    });        
  });
  
  // Return the filtered results
  return filteredData;    
}

const resultsContainer = document.getElementById("searchResults");

// Function to update the search results
function updateResults(results) {
    // Clear previous results
    resultsContainer.innerHTML = ""; // Clear previous results
    clearAllCards();

    if (results.length === 0 || results.query ==! ".") {
      // Display message if no results      
        const cards = document.querySelector(".allPokeCards");
        let card = document.createElement("div");
        card.setAttribute("class", "singlePokeCard");
        card.innerHTML = `
        <img class="pokeSingImgMove" src="${apiData[53].sprites.other.dream_world.front_default}" alt="No results found">
        <h2 class="pokeSingName">No results found<br/> #??</h2>`;      
        cards.appendChild(card); 
    } else {
        // Display each result in a separate div
        results.forEach(result => {
            let name = capitalizeFirstLetter(result.name);
            const cards = document.querySelector(".allPokeCards");
            let card = document.createElement("div");
            card.setAttribute("class", "singlePokeCard");
            card.innerHTML = `
            <img class="pokeSingImg" src="${result.sprites.other.dream_world.front_default}" alt="${result.name}">
            <h2 class="pokeSingName">${name} <br/> No.${result.id}</h2>`;
            cards.appendChild(card);
        });
    }
}

// Event listener for input change
document.getElementById("searchInput").addEventListener("input", function() {
  // Get the value from the input and trim whitespace
    const query = this.value.trim(); 
    // Perform search
    const searchResults = search(query); 
    // Update the search results
    updateResults(searchResults);
    // Clear results when the searchbox is empty or there is a "." in it
    if (query === "" || query.includes(".")) {
      clearAllCards();      
    }
});

//async function getPokemonbyName() {}
/*
const checkbox = document.getElementById('check-box');

checkbox.addEventListener('change', function() {
  if (this.checked) {
    h1.classList.add('funky')
    console.log('Checkbox is checked');
  } else {
    h1.classList.remove('funky')
    console.log('Checkbox is not checked');
  }
});
*/
