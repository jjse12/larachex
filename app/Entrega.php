<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entrega extends Model
{
    //
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->setKeyName('fecha');
        $this->setKeyType('string');
    }

    public function paquetes(){
        return $this->hasMany(Paquete::class, 'estado', 'fecha')->get();
    }
}
