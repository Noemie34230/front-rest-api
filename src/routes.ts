

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

