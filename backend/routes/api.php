<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\WorkController As WorkController;
use App\Http\Controllers\Api\ApplicationController As ApplicationController;
use App\Http\Controllers\Api\AuthController As AuthController;


Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from Laravel!',
    ]);
});

Route::apiResource('works', WorkController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Any logged-in user can apply / view applications
    Route::apiResource('applications', ApplicationController::class)->except(['destroy']);

    Route::middleware('admin')->group(function () {
        // Only admins can create/edit/delete works
        Route::post('/works', [WorkController::class, 'store']);
        Route::put('/works/{work}', [WorkController::class, 'update']);
        Route::patch('/works/{work}', [WorkController::class, 'update']);
        Route::delete('/works/{work}', [WorkController::class, 'destroy']);

        // Only admins can delete applications
        Route::delete('/applications/{application}', [ApplicationController::class, 'destroy']);
    });
});
