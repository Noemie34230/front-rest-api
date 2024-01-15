export interface Pokemon {
    name: string;
    order: number;
    height: number;
    image: string;
    types: string[];
}


// Récupération du nom du Pokémon à partir de l'URL
export function extractPokemonNameFromURL() {
    const path = window.location.pathname;
    const match = path.match(/^\/pokemon\/([^/]+)$/);
  
    // console.log('Path:', path);
    // console.log('Match:', match);
  
    if (match) {
      const pokemonName = match[1];
    //   console.log('Pokemon Name:', pokemonName);
      return pokemonName;
    }
  
    return null;
  }

export class PokemonService {
    allPokemons: any[] = [];

    async getAllPokemonsWithDetails( ) {
        const allPokemons: any[] = [];
        console.log(allPokemons)

        
        const totalNumberOfPages = 10; // Nombre total de pages
        const pageSize = 20; // Taille de la page
        //Récupération de 200 pokémons dans l'API

        for (let page = 1; page <= totalNumberOfPages; page++) {
            const result = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * pageSize}&limit=${pageSize}`);
            
            const data = await result.json();
            allPokemons.push(...data.results);
        }

        // Récupération des détails de chaque Pokémon
        const pokemonDetailsPromises = allPokemons.map(async (pokemon: { url: string }) => {
            const response = await fetch(pokemon.url);
            return response.json();
        });

        // J'attends que toutes les promesses soient résolues
        const pokemonDetailsArray = await Promise.all(pokemonDetailsPromises);

        // Ajout des détails à chaque Pokémon
        const pokemonsWithDetails = allPokemons.map((pokemon: { name: string }, index: number) => {
            return {
                name: pokemon.name,
                order: pokemonDetailsArray[index].order,
                height: pokemonDetailsArray[index].height,
                image: pokemonDetailsArray[index].sprites.other.home.front_default,
                types: pokemonDetailsArray[index].types.map((type: any) => type.type.name),
            };
        });

        return pokemonsWithDetails;
    }

/************************** Méthode pour recuperer les pokémons avec son nom *************/ 
    
        async getPokemonByName(pokemonName: string): Promise<any> {
            try {
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                // console.log(result)
                if (!result.ok) {
                    throw new Error(`Erreur lors de la récupération du Pokémon par nom (${result.status})`);
                }
    
                const data = await result.json();
                console.log(data)
                // pour avoir la hauteur en mètre
                const heightDividedByTen = data.height / 10;
                // pour avoir le poids en kg
                const weightDividedByTen = data.weight / 10;

                return {
                    name: data.name,
                    order: data.order,
                    height: heightDividedByTen ,
                    weight : weightDividedByTen,
                    abilities : data.abilities.map((ability: any) => ability.ability.name),
                    base_experience : data.base_experience,
                    image: data.sprites.other.home.front_default,
                    types: data.types.map((type: any) => type.type.name),
                };
            } catch (error) {
                console.error('Erreur lors de la récupération du Pokémon par nom', error);
                throw error; 
            }
        }
    
    
}
