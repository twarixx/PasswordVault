<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Password;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Http\Controllers\API\PasswordController;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $user = User::create([
            'username' => "test",
            'email' => 'test@test.com',
            'password' => '$2y$10$34VSzBjve2nW6Mqg1V6HLOIdJjCFTxYiSHmZtCIEd1n1NRMavr4US',
            'role' => 'Free'
        ]);

        $faker = Faker::create();

        for ($i = 0; $i < 48; $i++) {
            $passwords = Password::create( [
                'website' => 'Hyves',
                'username' => "Jantje",
                'user_id' => '1',
                'password' => (new PasswordController)->encrypt("test", $faker->unique()->password),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
