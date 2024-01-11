import '../style.css';
import { renderHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { renderCardDetailPokemon } from '../components/cardDetailPokemon';

export const detailPage = async (pokemonDetails: any) => {
  try {
    const headerHTML = renderHeader(false);
    const footerHTML = renderFooter();
    const cardDetailPokemonHTML = await renderCardDetailPokemon(pokemonDetails.name);
    document.querySelector<HTMLDivElement>('#app')!.innerHTML =  `
      ${headerHTML}
      ${cardDetailPokemonHTML}
      ${footerHTML}
    `;
  } catch (error) {
    console.error('Erreur lors de la génération de la page de détail', error);
  }

  return detailPage;
};


