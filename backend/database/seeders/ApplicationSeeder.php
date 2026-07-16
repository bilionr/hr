<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Fetch Candidate IDs from the candidates table
        $candidateIds = DB::table('candidates')->pluck('id');

        // 2. Fetch Work IDs
        $workIds = DB::table('works')->pluck('id');

        // Safety check
        if ($candidateIds->isEmpty() || $workIds->isEmpty()) {
            $this->command->warn('Skipping ApplicationSeeder: Ensure you have both Candidates and Works seeded first.');
            return;
        }

        $statuses = ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'];
        $applications = [];

        // 3. Create applications for these specific candidate profiles
        foreach ($candidateIds as $candidateId) {
            // Pick 1 or 2 random works to apply to
            $appliedWorks = $workIds->random(rand(1, 2));

            foreach ($appliedWorks as $workId) {
                $applications[] = [
                    'candidate_id' => $candidateId, // Correctly points to candidate profile
                    'work_id'      => $workId,
                    'apply_date'   => Carbon::now()->subDays(rand(1, 15))->format('Y-m-d'),
                    'status'       => $statuses[array_rand($statuses)],
                    'created_at'   => Carbon::now(),
                    'updated_at'   => Carbon::now(),
                ];
            }
        }

        DB::table('applications')->insert($applications);
        $this->command->info('ApplicationSeeder: Successfully linked applications to candidate profiles!');
    }
}