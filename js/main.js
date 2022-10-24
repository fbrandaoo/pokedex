const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonAnimated = document.querySelector('.pokemon__3d');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input-search');
const btnPrev = document.querySelector('.previous');
const btnNext = document.querySelector('.next');

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.textContent = 'Loading . . .';
    pokemonNumber.textContent = '';
    pokemonImage.src = 'https://res.cloudinary.com/dhfmm9rmk/image/upload/v1666575610/loading.svg';
    pokemonAnimated.src = 'https://res.cloudinary.com/dhfmm9rmk/image/upload/v1666575610/loading.svg';

    const data = await fetchPokemon(pokemon)
    
    if(data){
        pokemonName.textContent = data.name;
        pokemonNumber.textContent = data.id;
        pokemonImage.src = `https://img.pokemondb.net/sprites/home/normal/${data.name}.png`
        pokemonAnimated.src = `https://img.pokemondb.net/sprites/black-white/anim/normal/${data.name}.gif`
        inputSearch.value = null;
        searchPokemon = data.id;
    } else {
        pokemonName.textContent = 'Not Found : C';
        pokemonNumber.textContent = 'N/A';
        pokemonImage.src = 'https://res.cloudinary.com/dhfmm9rmk/image/upload/v1666180633/error-24x24.svg';
        pokemonAnimated.src = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(inputSearch.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
});

const randomNumber = Math.floor(Math.random()*889 + 1);

renderPokemon(randomNumber);
