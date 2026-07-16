<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Work;
use Illuminate\Support\Str;

class WorkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json(Work::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 1. Validate the incoming data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        // 2. Create the new work item in the database
        $work = Work::create($validated);

        // 3. Return the newly created item with a 201 Created status code
        return response()->json([
            'message' => 'Work opportunity created successfully!',
            'data' => $work
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Work $work)
    {
        return response()->json($work);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $work = Work::findOrFail($id);
    
        // Validate the incoming data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Update and save
        $work->update($validated);

        return response()->json([
            'message' => 'Work updated successfully!',
            'data' => $work
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $work = Work::findOrFail($id);
        $work->delete();
    }
}
