<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cliente;

class ClientesController extends Controller
{

    public function index(){
        return response()->json(Cliente::all());
    }
    //
    public function getTarifa(Cliente $cliente){
        return $cliente->tarifa;
    }

    public function getCelular(Cliente $cliente){
        return $cliente->celular;
    }

    public function getEmail(Cliente $cliente){
        return $cliente->email;
    }

}
