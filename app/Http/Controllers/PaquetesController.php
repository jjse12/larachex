<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Paquete;

class PaquetesController extends Controller
{
    //

    public function index(){
        $paquetes = Paquete::all()->get();
        return response()->json($paquetes);
    }

    public function inventario(){
        $paquetes = Paquete::where('estado', null)->orderBy('cliente_id', 'asc')->get();

        //$response = response()->json($paquetes);
        $i=1;
        foreach ($paquetes as $paq) {
            $paq['_id'] = $paq->tracking;
            $paq['carga_fecha'] = $paq->carga()->fechaFormateada();
        }

        return $paquetes;
        //return response()->json($paquetes);
    }
}
