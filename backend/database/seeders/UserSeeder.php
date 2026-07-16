<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = DB::table('roles')->pluck('id', 'name'); // returns ['HR Admin' => 1, 'Candidate' => 4, etc]

        if ($roles->isEmpty()) {
            $this->command->warn('Skipping UserSeeder: Please seed your roles table first!');
            return;
        }

        $users = [
            // HR Admin
            [
                'name' => 'John Admin',
                'email' => 'admin@company.com',
                'password' => Hash::make('password'),
                'role_id' => $roles['HR Admin'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // HR Staff
            [
                'name' => 'Sarah Staff',
                'email' => 'staff@company.com',
                'password' => Hash::make('password'),
                'role_id' => $roles['HR Staff'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Interviewer
            [
                'name' => 'David Tech Lead',
                'email' => 'interviewer@company.com',
                'password' => Hash::make('password'),
                'role_id' => $roles['Interviewer'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Candidates (Let's seed 5 test candidates)
            [
                'name' => 'Alice Johnson',
                'email' => 'alice@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => $roles['Candidate'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Bob Smith',
                'email' => 'bob@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => $roles['Candidate'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Charlie Brown',
                'email' => 'charlie@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => $roles['Candidate'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Diana Prince',
                'email' => 'diana@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => $roles['Candidate'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Ethan Hunt',
                'email' => 'ethan@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => $roles['Candidate'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('users')->insert($users);
    }
}
