import '../style.css'
import { renderHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { renderCardListPokemon } from '../components/cardListPokemon';


export const home = async () => {
        const headerHTML = renderHeader(true); 
        const footerHTML = renderFooter();
        const cardListPokemonHTML = await renderCardListPokemon();
        const pokemonDetailsHtml = '<div id="pokemon-details" class="pokemon-details"></div>';
        const homePageHtml = `
        ${headerHTML}
          <div>
         
            <ul>
              ${cardListPokemonHTML}
            </ul>
             ${pokemonDetailsHtml}
          </div>
        ${footerHTML} 
         `;
return homePageHtml
  
} 