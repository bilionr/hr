<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });

        DB::table('roles')->insert([
            ['name' => 'HR Admin', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'HR Staff', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Interviewer', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Candidate', 'created_at' => now(), 'updated_at' => now()],
        ]);
    
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->constrained('roles')->onDelete('cascade');
        });

        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('status')->default('applied'); // e.g., 'applied', 'interviewing', 'hired', 'rejected'
            $table->timestamps();
        });

        Schema::create('works', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('department');
            $table->text('description');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained('candidates')->onDelete('cascade');
            $table->foreignId('work_id')->constrained('works')->onDelete('cascade');
            $table->date('apply_date')->useCurrent(); // Defaults to the date it was created
            $table->string('status')->default('pending'); // e.g., 'pending', 'reviewed', 'shortlisted'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
        Schema::dropIfExists('works');
        Schema::dropIfExists('candidates');
        Schema::dropIfExists('users');
        Schema::dropIfExists('roles');
    }
};
