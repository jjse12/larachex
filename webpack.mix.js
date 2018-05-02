let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/js/app.jsx', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css/sass_generated/sass.css')
    .styles([
        'public/css/sass_generated/sass.css',
        'node_modules/react-table/react-table.css',
    ], 'public/css/app.css')
;
