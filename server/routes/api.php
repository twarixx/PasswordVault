<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UpgradeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\PasswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
     return $request->user();
});

Route::post('/login', [AuthController::class, 'authenticate']);

Route::middleware('auth')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('guest')->post('/register', [AuthController::class, 'register']);

Route::middleware('auth')->get('/testauth', function () {

    return response(Auth::user());
});

Route::get('/passwords', [PasswordController::class, 'index']);
Route::post('/passwords', [PasswordController::class, 'store']);
Route::get('/passwords/{password}', [PasswordController::class, 'show']);
Route::put('/passwords/{password}', [PasswordController::class, 'update']);
Route::delete('/passwords/{password}', [PasswordController::class, 'destroy']);

Route::middleware('auth')->post('/upgrade', [UpgradeController::class, 'upgrade']);
Route::middleware('auth')->post('/downgrade', [UpgradeController::class, 'downgrade']);
