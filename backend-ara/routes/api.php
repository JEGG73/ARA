<?php

use App\Http\Controllers\Api\AgrobotController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AiChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Rutas publicas
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('reset-password', [AuthController::class, 'resetPassword']);

Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResource('agrobots', AgrobotController::class);
    Route::post('chat', [AiChatController::class, 'ask']);
});
