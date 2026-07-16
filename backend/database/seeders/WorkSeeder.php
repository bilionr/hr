<?php

namespace Database\Seeders;

use App\Models\Work;
use App\Models\Roles;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('works')->insert([
            [
                'title' => 'Software Engineer Intern',
                'department' => 'Engineering',
                'description' => 'Join our Core Infrastructure team to help design, build, and maintain scalable systems using modern cloud architectures.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'UI/UX Product Designer',
                'department' => 'Design',
                'description' => 'Looking for a passionate designer to build modern, accessible user interfaces and wireframe flows for our new human resource management platform.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Data Analyst',
                'department' => 'Business Intelligence',
                'description' => 'Help drive decision-making by transforming raw data metrics into clear, actionable dashboards and weekly reporting structures.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'HR Operations Specialist',
                'department' => 'Human Resources',
                'description' => 'Manage end-to-end recruitment pipelines, onboarding workflows, and support company culture initiatives across our global regions.',
                'is_active' => false, // Set this one to inactive to test your layout filters!
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
