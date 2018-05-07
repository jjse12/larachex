<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Paquete;

class PaquetesController extends Controller
{
    //

    public function index(){
        $paquetes = Paquete::all();
        return response()->json($paquetes);
    }

    public function inventario(){
        $paquetes = Paquete::where('estado', null)->orderBy('cliente_id', 'asc')->get();

        foreach ($paquetes as $paq){
            if (strpos($paq->cliente_nombre, 'Ã±'))
                $paq->cliente_nombre = str_replace('Ã±', 'ñ', $paq->cliente_nombre);
            //urlmensaje.replace(" ", "%20").replace("Ã¡", "á").replace("Ã©", "é").replace("Ã³", "ó").replace("Ãº", "ú").replace("Ã¼", "ü").replace("Ã±", "ñ").replace("Ã", "í");
            $paq['carga_fecha'] = $paq->carga()->fechaFormateada();
        }

        return $paquetes;
    }
}
