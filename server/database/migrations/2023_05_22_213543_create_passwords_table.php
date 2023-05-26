<?php

use App\Models\User;
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
        Schema::create('passwords', function (Blueprint $table) {
            $table->id();
<<<<<<< HEAD
            $table->foreignid(User::class);
            $table->string('website');
            $table->string('username');
            $table->string('password');
=======
            $table->foreignid('user_id')->constrained('users');
            $table->string('website');
            $table->string('username');
            $table->mediumText('password');
>>>>>>> def6cfa4f9dbd01185f9c809a98d2deb38cf42c4
            $table->string('category')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('passwords');
    }
};
