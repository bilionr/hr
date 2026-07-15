<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\Api\WorkController;

Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from Laravel!',
    ]);
});

Route::get('/works', [WorkController::class, 'index']);