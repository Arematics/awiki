// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  client_id: 'test',
  realm_name: 'arematics',
  rest_url: 'http://localhost:8080/api/v1/',
  auth_api: 'https://auth.arematics.com/auth',
  redirect_to: 'http://localhost:4200/admin',
  footerNavigation: [{text: 'Startseite', url: '/'}, {text: 'Impressum', url: '/impressum/'}, {text: 'Panel', url: '/admin/'}]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
