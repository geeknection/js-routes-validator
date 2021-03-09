# `@buuhv/js-routes-validator`

It is no longer necessary to have a structure for each project, be it done with ReactJs, Angular, Vue or with javascript code developed by you.
The lib JS Routes Validator allows you to create a quick and complete validation.
Just inform the global and authentication routes and say if you want to verify a session by passing its value to the Lib's token.
It just it! Let Lib take care of the rest.


## Getting started

`npm install @buuhv/js-routes-validator --save`

## Usage
```typescript
function getMyData() {

}
const routes = new RoutesValidator({
    auth: authRoutes,
    global: generalRoutes,
    inAuthRedirectTo: process.env.PUBLIC_URL + '/',
    inPrivateRedirectTo: process.env.PUBLIC_URL + '/login'
});
routes.token = localStorage.getItem('TOKEN') || '';//its not necessary 'case you dont want check private routes;
routes.callback = getMyData//its not necessary. Callback can be used after your validate session on system. It without token doesnt works;
routes.init();
```

---

## Contributors

This module was extracted from `ReactJs` core. Please reffer to https://github.com/geeknection/js-routes-validator/contributors for the complete list of contributors.

## License
The library is released under the MIT licence. For more information see `LICENSE`.