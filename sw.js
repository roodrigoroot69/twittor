const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
]

const APP_SHELL_INMTUABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'css/animate.css',
    //'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'js/libs/jquery.js',
]

self.addEventListener('install', e =>{
    const cacheStatic = caches.open(STATIC_CACHE).then(cache =>{
        return cache.addAll( APP_SHELL);
    })
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>{
        return cache.addAll( APP_SHELL_INMTUABLE);
    })

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
})


self.addEventListener('activate', e => {
    const response = caches.keys().then( keys => {
        keys.forEach(key=>{
            if (key !== STATIC_CACHE && key.includes('static')){
                return caches.delete(key);
            }
        })
    })
    e.waitUntil(response);
})
