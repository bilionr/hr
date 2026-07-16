<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            WorkSeeder::class,
            UserSeeder::class,        // 3rd (Uses Roles)
            CandidateSeeder::class,   // 4th (Uses Users)
            ApplicationSeeder::class, // 5th (Uses Candidates & Works)
        ]);
    }
}
