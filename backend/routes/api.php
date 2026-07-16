<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\WorkController As WorkController;

Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from Laravel!',
    ]);
});

// Route::get('/works', [WorkController::class, 'index']);
// Route::get('/works/{work}', [WorkController::class, 'find']);
// Route::get('/works/{work}/edit', [WorkController::class, 'edit']);
// Route::delete('/works/{work}', [WorkController::class, 'destroy']);

Route::apiResource('works', WorkController::class);


