<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Application;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json(Application::with(['candidate', 'work'])->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 1. Validate the incoming data
        $validated = $request->validate([
            'work_id' => 'required|exists:works,id',
        ]);

        $user = auth()->user();

$candidate = Candidate::where('user_id', $user->id)->firstOrFail();

$validated['candidate_id'] = $candidate->id;

        // 2. Create the new item in the database
        $application = Application::create($validated);

        // 3. Return the newly created item with a 201 Created status code
        return response()->json([
            'message' => 'Application opportunity created successfully!',
            'data' => $application
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Application $application)
    {
        return response()->json($application);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $application = Application::findOrFail($id);
    
        // Validate the incoming data
        $validated = $request->validate([

        ]);

        // Update and save
        $application->update($validated);

        return response()->json([
            'message' => 'Application updated successfully!',
            'data' => $application
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $application = Application::findOrFail($id);
        $application->delete();
    }
}
