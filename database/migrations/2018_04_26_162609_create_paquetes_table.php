<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaquetesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paquetes', function (Blueprint $table) {

            $table->string('tracking');
            $table->integer('carga_id');
            $table->string('cliente_id');
            $table->string('cliente_nombre');
            $table->decimal("peso", 10);
            $table->dateTime("estado")->nullable()->default(null);
            $table->string('plan');

            $table->primary('tracking');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paquetes');
    }
}
