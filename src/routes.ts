// // server.ts
// import express, { Request, Response } from 'express';
// import { detailPage, home } from './pages';

// const app = express();
// const port = 3000;


// // Route pour la page d'accueil
// app.get('/', (_req: Request, res: Response) => {
//   const content = home();
//   res.send(content);
// });

// // Route pour les détails du Pokémon
// app.get('/pokemon/:name', (req: Request, res: Response) => {
//   const content = detailPage({ name: req.params.name });
//   res.send(content);
// });

// // Démarrer le serveur
// app.listen(port, () => {
//   console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
// });


// src/router.ts
// import {PokemonService} from './services';

// const pokemonService = new PokemonService();
// const pokemons = await pokemonService.getAllPokemonsWithDetails();

// console.log(pokemons[0].name)

// const namePokemons: string[] = [];
// for (let i = 0; i < namePokemons.length; i++) {
  
//   namePokemons.push();
  
// }

// console.log(namePokemons);

export class Routes {
  public routes: { [key: string]: Function } = {};

  

  addRoute(path: string, callback: Function) {
    this.routes[path] = callback;
  }
  
  navigate() {
   
    const path = window.location.pathname;
    const routeKeys = Object.keys(this.routes);

    

    for (const routeKey of routeKeys) {
      const paramPattern = /:(\w+)/g;
      const routePattern = new RegExp(`^${routeKey.replace(paramPattern, '(\\w+)')}$`);
      const match = path.match(routePattern);
      // console.log(match)

      if (match) {
        const params: { [key: string]: string } = {};
        const paramNames = routeKey.match(paramPattern);

        if (paramNames) {
          for (let i = 0; i < paramNames.length; i++) {
            params[paramNames[i].slice(1)] = match[i + 1];
            // console.log(params[paramNames[i].slice(1)] = match[i + 1])
          }
        }

        this.routes[routeKey](params);
        return;
      }
    }
  }
}

