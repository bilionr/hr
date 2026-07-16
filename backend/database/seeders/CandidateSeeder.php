<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CandidateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Fetch Candidate Role ID
        $candidateRoleId = DB::table('roles')->where('name', 'Candidate')->value('id');

        // 2. Fetch all Users who are Candidate users
        $candidateUsers = DB::table('users')->where('role_id', $candidateRoleId)->get();

        if ($candidateUsers->isEmpty()) {
            $this->command->warn('Skipping CandidateSeeder: Please seed candidate users first!');
            return;
        }

        $candidates = [];

        // 3. Create candidate profiles. 
        // Some users will get 1 profile, others will get 2 (verifying "one user can have many candidates")
        foreach ($candidateUsers as $index => $user) {
            
            // First candidate profile (for everyone)
            $candidates[] = [
                'user_id'    => $user->id,
                'full_name'  => $user->name,
                'email'      => $user->email,
                'phone'      => '0812' . rand(10000000, 99999999),
                'address'    => 'Main Road No. ' . rand(1, 100) . ', Jakarta',
                'birth_date' => Carbon::now()->subYears(rand(20, 35))->format('Y-m-d'),
                'status'     => 'applied',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];

            // If it's an even index, create a second profile (e.g. for applying to design vs engineering)
            if ($index % 2 === 0) {
                $candidates[] = [
                    'user_id'    => $user->id,
                    'full_name'  => $user->name . ' (Alternate Profile)',
                    'email'      => 'alt.' . $user->email, // keep unique
                    'phone'      => '0813' . rand(10000000, 99999999),
                    'address'    => 'Secondary Address St. ' . rand(101, 200),
                    'birth_date' => Carbon::now()->subYears(rand(20, 35))->format('Y-m-d'),
                    'status'     => 'interviewing',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];
            }
        }

        DB::table('candidates')->insert($candidates);
        $this->command->info('CandidateSeeder: Created profiles linked to Candidate users.');
    }
}