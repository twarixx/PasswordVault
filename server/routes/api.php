<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UpgradeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CategoryController;
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

Route::middleware('auth')->delete('/passwords/{password}', [PasswordController::class, 'destroy']);
Route::middleware('auth')->post('/passwords/show', [PasswordController::class, 'show']);
Route::middleware('auth')->put('/passwords/{password}', [PasswordController::class, 'update']);
Route::middleware('auth')->post('/passwords', [PasswordController::class, 'store']);
Route::middleware('auth')->get('/passwords', [PasswordController::class, 'index']);
Route::middleware('auth')->delete('/passwords/{password}', [PasswordController::class, 'destroy']);

Route::middleware('auth')->post('/search', [PasswordController::class, 'search']);

Route::middleware('auth')->get('/categories', [CategoryController::class, 'index']);
Route::middleware('auth')->post('/categories', [CategoryController::class, 'store']);
Route::middleware('auth')->get('/categories/{category}', [CategoryController::class, 'show']);
Route::middleware('auth')->put('/categories/{category}', [CategoryController::class, 'update']);
Route::middleware('auth')->delete('/categories/{category}', [CategoryController::class, 'destroy']);
Route::middleware('auth')->middleware('auth')->get('categories/{category}/passwords', [CategoryController::class, 'getAllPasswordsInCategory']);

Route::post('/login', [AuthController::class, 'authenticate']);

Route::middleware('auth')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('guest')->post('/register', [AuthController::class, 'register']);

Route::middleware('auth')->get('/testauth', function () {

    return response(Auth::user());

});

Route::middleware('auth')->get('/passwords', [PasswordController::class, 'index']);
Route::middleware('auth')->post('/passwords', [PasswordController::class, 'store']);
Route::middleware('auth')->get('/passwords/{password}', [PasswordController::class, 'show']);
Route::middleware('auth')->put('/passwords/', [PasswordController::class, 'update']);
Route::middleware('auth')->delete('/passwords/{password}', [PasswordController::class, 'destroy']);

Route::middleware('auth')->post('/upgrade', [UpgradeController::class, 'upgrade']);
Route::middleware('auth')->post('/downgrade', [UpgradeController::class, 'downgrade']);

Route::middleware('auth')->post('/masterpassword', [\App\Http\Controllers\MasterPasswordController::class, 'checkMasterPassword']);
