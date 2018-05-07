<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/inventario', 'PaquetesController@inventario');

Route::get('/clientes', 'ClientesController@index');
Route::get('/cliente/{cliente}/tarifa', 'ClientesController@getTarifa');
Route::get('/cliente/{cliente}/celular', 'ClientesController@getCelular');
Route::get('/cliente/{cliente}/email', 'ClientesController@getEmail');

Route::get('/mercaderia', 'PaquetesController@index');
Route::get('/inventario', 'PaquetesController@inventario');

Route::get('/entregas-incompletas', 'EntregasController@incompletas');
Route::get('/entregas-completas', 'EntregasController@completas');
