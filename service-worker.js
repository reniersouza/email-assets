// Objetivo: service worker principal da PWA.
// Responsabilidade:
// - Cache da aplicação
// - Funcionamento offline
// - Atualização de versões
// - Gerenciamento do App Shell


const CACHE_VERSION = 'v0.6.1';

const CACHE_NAME =
    `objetivonet-email-signature-${CACHE_VERSION}`;



const APP_SHELL = [

    './',
    './index.html',
    './404.html',
    './manifest.json',


    // CSS

    './assets/css/base.css',
    './assets/css/layout.css',
    './assets/css/components.css',
    './assets/css/themes.css',
    './assets/css/utilities.css',
    './assets/css/animations.css',
    './assets/css/responsive.css',


    // JS

    './assets/js/app.js',
    './assets/js/router.js',
    './assets/js/config.js',
    './assets/js/constants.js',
    './assets/js/storage.js',
    './assets/js/events.js',
    './assets/js/helpers.js',
    './assets/js/utils.js',
    './assets/js/logger.js',
    './assets/js/store.js',


    // CONFIG
    // Config fica fora de assets

    './config/settings.json',
    './config/themes.json',
    './config/templates.json',
    './config/icons.json',


    // Assets

    './favicon.ico',

    './assets/icons/icon-192.svg',
    './assets/icons/icon-512.svg',

    './assets/social/github.svg',
    './assets/social/linkedin.svg',

    './assets/placeholders/profile-placeholder.svg',
    './assets/placeholders/logo-placeholder.svg'

];



/*
==================================================
INSTALL
==================================================
*/


self.addEventListener(
    'install',
    (event) => {


        event.waitUntil(


            caches.open(CACHE_NAME)

                .then(async (cache) => {


                    const results =
                        await Promise.allSettled(

                            APP_SHELL.map(
                                (file) =>
                                    cache.add(file)
                            )

                        );


                    const failed =
                        results.filter(
                            (item) =>
                                item.status === 'rejected'
                        );


                    if (failed.length) {

                        console.warn(
                            'Arquivos não adicionados ao cache:',
                            failed
                        );

                    }


                })


                .then(
                    () =>
                        self.skipWaiting()
                )


        );


    }

);




/*
==================================================
ACTIVATE
==================================================
*/


self.addEventListener(
    'activate',
    (event) => {


        event.waitUntil(


            caches.keys()

                .then(
                    (keys) =>


                        Promise.all(

                            keys

                                .filter(
                                    (key) =>
                                        key !== CACHE_NAME
                                )


                                .map(
                                    (key) =>
                                        caches.delete(key)
                                )

                        )

                )


                .then(
                    () =>
                        self.clients.claim()
                )


        );


    }

);




/*
==================================================
FETCH
==================================================
*/


self.addEventListener(
    'fetch',
    (event) => {


        if (
            event.request.method !== 'GET'
        ) {

            return;

        }



        event.respondWith(

            cacheFirst(
                event.request
            )

        );


    }

);




async function cacheFirst(request) {


    const cachedResponse =
        await caches.match(request);



    if (cachedResponse) {

        return cachedResponse;

    }



    try {


        const networkResponse =
            await fetch(request);



        const cache =
            await caches.open(
                CACHE_NAME
            );



        cache.put(
            request,
            networkResponse.clone()
        );



        return networkResponse;



    } catch {


        return caches.match(
            './404.html'
        );


    }

}