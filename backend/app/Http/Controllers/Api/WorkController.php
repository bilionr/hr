<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Work;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WorkController extends Controller
{
    // Career Portal: public list of published jobs
    public function index(Request $request)
    {
        $query = Work::query();
        return response()->json($query->latest()->paginate(10));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'description' => 'required|string',
            'is_active' => 'required|boolean',
        ]);

        $work = Work::create($data);
        return response()->json($work, 201);
    }

    public function update(Request $request, Work $Work)
    {
        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'department' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'sometimes|in:full_time,part_time,contract,internship',
            'description' => 'sometimes|string',
            'requirements' => 'nullable|string',
            'status' => 'sometimes|in:draft,published,closed',
            'application_deadline' => 'nullable|date',
        ]);

        $work->update($data);

        return response()->json($Work);
    }

    public function destroy(Work $work)
    {
        $work->delete();

        return response()->json(null, 204);
    }
}
