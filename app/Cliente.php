<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{

    public function __construct(array $attributes = []){
        parent::__construct($attributes);
        $this->setKeyName("id");
        $this->setKeyType('string');
    }

    public function paquetes(){
        return $this->hasMany(Paquete::class, 'cliente_id', "id");
    }

    public function entregas(){
        return $this->hasMany(Entrega::class, 'cliente_id', 'id')->get();
    }

}
