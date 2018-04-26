<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Carga extends Model
{

    public function paquetes(){
        return $this->hasMany(Paquete::class, 'carga_id', 'id')->get();
    }
}
