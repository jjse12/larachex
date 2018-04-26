<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paquete extends Model
{

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->setKeyName("tracking");
        $this->setKeyType('string');
    }

    public static function inventario(){
        return static::where('estado', null)->get();
    }

    public function cliente(){
        return $this->belongsTo(Cliente::class, "cliente_id", "id")->first();
    }

    public function carga(){
        return $this->belongsTo(Carga::class, "carga_id", "id")->first();
    }

    public function entrega(){
        if ($this->getAttribute('estado') != null)
            return $this->belongsTo(Entrega::class, 'estado', 'fecha')->first();
        return null;
    }
}
