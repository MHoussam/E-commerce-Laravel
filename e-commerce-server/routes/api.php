<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\customerController;

Route::get('/get_products/{id?}', [customerController::class, "getProducts"]);

Route::get('/login/{email}/{password}', [customerController::class, "login"]);
Route::post('/register', [customerController::class, "registration"]);

Route::get('/dashboard', [customerController::class, "dashboard"]);