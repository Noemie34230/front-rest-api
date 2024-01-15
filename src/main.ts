 import './style.css'
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

// Gestion du changement d'URL
window.onpopstate = () => {
    route.navigate();
};

// Démarrage avec la première route
route.navigate();


