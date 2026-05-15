<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('telemetries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('agrobot_id')->constrained()->cascadeOnDelete();
            $table->decimal('nitrogen', 5, 2);
            $table->decimal('phosphorus', 5, 2);
            $table->decimal('potassium', 5, 2);
            $table->decimal('ph', 4, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('telemetries');
    }
};
