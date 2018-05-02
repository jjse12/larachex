<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Carga extends Model
{

    public function fechaFormateada(){
        return Carbon::createFromTimeString($this->fecha)->format('d/m/Y');
    }

    public function paquetes(){
        return $this->hasMany(Paquete::class, 'carga_id', 'id')->get();
    }
}
