<?php

use App\Http\Controllers\Api\AgrobotController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AiChatController;
use App\Http\Controllers\Api\HardwareController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Rutas publicas
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('reset-password', [AuthController::class, 'resetPassword']);
Route::post('hardware/telemetry', [HardwareController::class, 'storeTelemetry']);

Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    Route::apiResource('agrobots', AgrobotController::class);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('chat', [AiChatController::class, 'ask']);
    Route::get('agrobots/{id}/telemetry', [HardwareController::class, 'getTelemetry']);
});
