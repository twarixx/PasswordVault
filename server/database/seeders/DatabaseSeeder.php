<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Password;
use App\Models\User;
use Illuminate\Database\Seeder;

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

        User::create([
            'username' => "test",
            'email' => 'test@test.com',
            'password' => '$2y$10$34VSzBjve2nW6Mqg1V6HLOIdJjCFTxYiSHmZtCIEd1n1NRMavr4US',
            'role' => 'Free'
        ]);
    }
}
