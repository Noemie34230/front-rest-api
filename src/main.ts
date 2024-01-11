 import './style.css'
// import { renderHeader } from './components/header';
// import { renderFooter } from './components/footer';
// import { renderCardListPokemon } from './components/cardListPokemon';



//         const headerHTML = renderHeader(true); 
//         const footerHTML = renderFooter();
//         const cardListPokemonHTML = await renderCardListPokemon();
//         // Affichage des noms et hauteurs des Pokémon dans le document HTML
//         document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//         ${headerHTML}
//           <div>
         
//             <ul>
//               ${cardListPokemonHTML};
//             </ul>
         
//           </div>
//         ${footerHTML} 
//   //       `;
  
// src/main.ts
// import { handleRouteChange } from './routes';

// // Écouter les changements de hash pour mettre à jour le contenu
// window.addEventListener('hashchange', handleRouteChange);
// window.addEventListener('DOMContentLoaded', handleRouteChange);

// src/main.ts
import { Routes } from './routes';
import { home } from './pages/home';
import { detailPage } from './pages/detailPage';
import { extractPokemonNameFromURL } from './services';
import { PokemonService } from './services';
import { initSearch } from './components/header';

const route = new Routes();
const pokemonService = new PokemonService();

route.addRoute('/', async () => {
    const homeHTML = await home();
    // console.log('Accueil');
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = homeHTML;
    initSearch();
    

});

route.addRoute('/pokemon/:name', async () => {
    const pokemonName = extractPokemonNameFromURL();

    if (pokemonName) {
        // console.log('Détails du Pokémon', pokemonName);
        const pokemonDetails = await pokemonService.getPokemonByName(pokemonName);
        // console.log('Détails du Pokémon', pokemonDetails);
        document.querySelector<HTMLDivElement>('#app')!.innerHTML = '';
        await detailPage(pokemonDetails);
    } else {
        console.error('Impossible de récupérer le nom du Pokémon depuis l\'URL.');
    }
});

// Gérez le changement d'URL
window.onpopstate = () => {
    route.navigate();
};

// Démarrez avec la première route
route.navigate();


