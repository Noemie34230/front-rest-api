import { Pokemon, PokemonService } from '../services'; 

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



export async function searchPokemon() {
  const searchInput = document.getElementById("search") as HTMLInputElement;

  if (searchInput) {
    const searchTerm = searchInput.value.trim().toLowerCase();
    console.log('Utilisateur a tapé :', searchTerm);

    try {
      const allPokemonsWithDetails = await pokemonService.getAllPokemonsWithDetails();
      
      // Filtrer les Pokémon correspondant au terme de recherche
      const matchingPokemon = allPokemonsWithDetails.find(pokemon =>
        pokemon.name.toLowerCase() === searchTerm
      );

        // Si la valeur de recherche est vide, j'affiche toutes les cartes
        if (searchTerm === '') {
          const cards = document.querySelectorAll('.card');
          cards.forEach((card) => {
            if (card instanceof HTMLElement) {
              card.style.display = 'block';
            }
          });
          return;
        }

      if (matchingPokemon) {
        console.log("Pokémon trouvé :", matchingPokemon);
        // Affichage du Pokémon trouvé sur le navigateur
        displaySinglePokemon(matchingPokemon);

      
        const cardContainer = document.querySelector<HTMLUListElement>('.card-container');
        if (cardContainer) {
          const matchingCard = cardContainer.querySelector(`[data-pokemon-name="${matchingPokemon.name}"]`);
          if (matchingCard) {

            matchingCard.classList.add('visible-card');
          }
        }
      } else {
        console.log("Aucun Pokémon trouvé pour le terme de recherche :", searchTerm);
      
      }
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


function displaySinglePokemon(matchingPokemon: Pokemon) {
  const cardList = document.querySelectorAll('.card');

  // Parcourir les cartes pour trouver celle qui correspond au Pokémon recherché
  cardList.forEach((card: Element) => {
    const nameElement = card.querySelector('.pokemon-name');
    const cardName = nameElement ? nameElement.textContent?.toLowerCase() : '';

    if (cardName === matchingPokemon.name.toLowerCase()) {
      // Cacher les autres cartes et afficher celle qui correspond au Pokémon recherché
      // pour pouvoir utiliser style il faut que card soit une instance de HTMLELEMENT
      if (card instanceof HTMLElement) {
        card.style.display = 'block';
      }
    } else {
      if (card instanceof HTMLElement) {
        card.style.display = 'none';
      }
    }
  });
}