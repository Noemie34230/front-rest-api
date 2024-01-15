import { PokemonService } from '../services';
import { getTypeClass } from './typesPokemon';

export const renderCardDetailPokemon = async (pokemonName: string): Promise<string> => {
  try {
    const pokemonService = new PokemonService();
    const pokemon = await pokemonService.getPokemonByName(pokemonName);

    // Génération du HTML avec les données obtenues
    const base_experienceHtml = pokemon.base_experience;
    const arrayTypes = pokemon.types;
    
    const typesHtml = arrayTypes.map((element: string) => {
      const typeClass = getTypeClass(element);
      return `<p class="card_types ${typeClass}">${element}</p>`;
    }).join('');
    const abilitiesHtml = pokemon.abilities.map((element:string) =>{
      return `<p class= "card_abilities">${element} </p> `
    }).join(', ');

    const html = `
      <div class="card_detail">
        <div class="card_detail_part_one">
          <div class = "name">${pokemon.name}</div>
          <div class = "order"># ${pokemon.order}</div>
        </div>

        <div class="card_detail_part_two">
          <img src="${pokemon.image}" alt="${pokemon.name}" class="card_detail_image">
          <div class= "column_text">
            <div class= "taille_hp">
              <div>Hauteur : ${pokemon.height} M</div>
              <div class = "hp">HP : ${base_experienceHtml }</div>
            </div>
            <div class="poids">Poids : ${pokemon.weight} Kg</div>
            <div class="abilities"> 
              Capacités :${abilitiesHtml}
            </div>
            <div class="types_detail">
              Types : ${typesHtml}
            </div>
          </div>
        </div>  
          
      </div>
    `;

    return html;

  } catch (error) {
    console.error(`Erreur lors de la récupération des données du Pokémon ${pokemonName}`, error);
    
    return `<div>Erreur lors de la récupération des données du Pokémon ${pokemonName}</div>`;
  }
};
