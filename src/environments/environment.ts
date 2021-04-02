// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://192.168.25.146:8081/massoterapia-api',
  firebaseConfig: {
    apiKey: 'AIzaSyAGTTbmctEtrWzbBKDoa_XfjTDOVgaBgOo',
    authDomain: 'massoterapia-3c8d9.firebaseapp.com',
    databaseURL: 'https://massoterapia-3c8d9.firebaseio.com',
    projectId: 'massoterapia-3c8d9',
    storageBucket: 'massoterapia-3c8d9.appspot.com',
    messagingSenderId: '388189759736',
    appId: '1:388189759736:web:788ce546fd71741c21f30d',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
