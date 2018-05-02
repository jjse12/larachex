<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{

    public function paquetes(){
        return $this->hasMany(Paquete::class, 'cliente_id', "id");
    }

    public function entregas(){
        return $this->hasMany(Entrega::class, 'cliente_id', 'id')->get();
    }

}
