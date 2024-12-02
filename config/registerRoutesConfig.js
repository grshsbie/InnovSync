function registerRoutes(router, routes) {
    routes.forEach((route) => {
        const { method, path, middlewares, handler } = route;
        if (middlewares && middlewares.length > 0) {
            router[method](path, ...middlewares, handler);
        } else {
            router[method](path, handler);
        }
    });
}

module.exports = registerRoutes;
