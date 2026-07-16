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
Route::apiResource('applications', ApplicationController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


