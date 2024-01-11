
import { PokemonService } from '../services';
import { getTypeClass } from './typesPokemon';



const navigateToPokemonDetails = (pokemonName: string) => {
    // Mettez ici la logique pour naviguer vers la page de détails du Pokémon
    console.log(`Naviguer vers la page de détails pour le Pokémon: ${pokemonName}` + navigateToPokemonDetails);
  };
export const renderCardListPokemon = async (): Promise<string> => {
    try {
        const pokemonService = new PokemonService();
        const pokemons = await pokemonService.getAllPokemonsWithDetails();

        // Générer le HTML avec les données obtenues
// ...
const html = `
    <div class="card_list">
        ${pokemons.map((pokemon: { name: any; order: any; image: any; types: any[] }) => {
          
            const arrayTypes = pokemon.types;
            // console.log(pokemon.name)

            let typesHtml = '';

            for (let element of arrayTypes) {
                // console.log(element);
                let typeClass = getTypeClass(element);

                typesHtml += `<p class="card_types ${typeClass}">${element}</p>`;
            }

            return `
               
            <div class="card" onclick="handleCardClick('${pokemon.name}')">
            <a href="/pokemon/${pokemon.name}"> 
                    <div class="card_text">
                        <div class="pokemon-name">${pokemon.name}</div>
                        <div># ${pokemon.order}</div>
                    </div>
                    <img src="${pokemon.image}" alt="${pokemon.name}" class="card_image">
                    <div class="types">
                        ${typesHtml}
                    </div>
                   
                </div>
                </a>
            `;
        }).join('')}
    </div>
`;
// ...


        return html;
        
    } catch (error) {
        console.error('Erreur lors de la récupération des données des Pokémon', error);
        // Vous pouvez gérer l'erreur ici et retourner une chaîne HTML d'erreur si nécessaire
        return '<div>Erreur lors de la récupération des données des Pokémon</div>';
    }
};



