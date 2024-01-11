import { PokemonService } from '../services'; // Assurez-vous de fournir le bon chemin

const pokemonService = new PokemonService();


export const renderHeader = (showSearchBar: boolean): string => {
  return `
    <header>
      <a href='/' class="lien_header" title="Accueil">
        <img src="../assets/pokeball.png" alt="Pokeball" class="image_header">
      </a>
      <div class="text">
        <h1>Pokémon! Attrapez-les tous </h1>
        <h2>Pokédex</h2>
      </div>
      <div class="input-container ${showSearchBar ? 'input_container_visible' : 'input_container_invisible'}">
        ${showSearchBar ? '<input type="search" placeholder="Rechercher" id="search">' : ''}
        ${showSearchBar ? '<i id="searchIcon" class="fa-solid fa-magnifying-glass icone"></i>' : ''}
      </div>
    </header>
  `;
};



async function searchPokemon() {
  const searchInput = document.getElementById("search") as HTMLInputElement;

  if (searchInput) {
    const searchTerm = searchInput.value.trim().toLowerCase();
    console.log('Utilisateur a tapé :', searchTerm);

    try {
      const allPokemonsWithDetails = await pokemonService.getAllPokemonsWithDetails();

      const cards = document.querySelectorAll('.card');

      cards.forEach((card) => {
        const nameElement = card.querySelector('.pokemon-name');
        const name = nameElement ? nameElement.textContent?.toLowerCase() : '';

        if (name && allPokemonsWithDetails.some((pokemon) => pokemon.name.toLowerCase() === name)) {
          console.log("ça fonctionne");
          
        } else {
          console.log("ça ne fonctionne pas");
         
        }
      });
    } catch (error) {
      console.error('Erreur lors de la recherche des Pokémon avec détails', error);
    }
  } else {
    console.error('Champ de recherche non trouvé!');
  }
}




export async function initSearch() {
  const searchInput =  document.querySelector<HTMLInputElement>('#search')!;

  if (searchInput) {
    console.log('Champ de recherche trouvé!');
    searchInput.addEventListener('input', searchPokemon);
  } else {
    console.error('Champ de recherche non trouvé sur initSearch!');
  }
}


