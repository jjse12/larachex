<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEntregasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entregas', function (Blueprint $table) {
            $table->dateTime('fecha');
            $table->string('paquetes', 3);
            $table->string('cliente_id', 8);
            $table->string('cliente_nombre', 80);
            $table->string('total',12);
            $table->string('peso', 7);
            $table->string('tarifa', 7);
            $table->string('subtotal', 12);
            $table->string('metodo', 13);
            $table->string('ruta', 6)->default(null)->nullable();
            $table->string('descuento')->nullable();
            $table->string('detalle')->nullable;
            $table->dateTime('liquidado')->default(null)->nullable;
            $table->string('plan', 20);

            $table->primary('fecha');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entregas');
    }
}
