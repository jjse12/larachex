<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {

            $table->integer('id_correlativo')->unique()->unsigned();
            $table->string('id',8)->unique();
            $table->string('nombre',64);
            $table->string('apellido', 64);
            $table->integer('tarifa')->default(60);
            $table->string('email', 64)->unique();
            $table->integer('celular')->unsigned();
            $table->integer('telefono')->unsigned();
            $table->string('direccion',200);
            $table->char('genero');
            $table->date('cumple');
            $table->string('comentario', 500);
            $table->timestamp('fecha_registro');

            $table->primary("id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clientes');
    }
}
