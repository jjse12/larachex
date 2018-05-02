<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/login', 'SessionController@create')->name('login');
Route::post('/login', 'SessionController@store');
Route::post('/logout', 'SessionController@destroy')->name('logout');

Route::get('/app', 'HomeController@index')->name('home');
Route::get('/app{catchall}', 'HomeController@index')->where('catchall', '\/?.*');

Route::get('/{catchall}', 'HomeController@redirectApp')->where('catchall', '\/?.*');