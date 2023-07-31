<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\customerController;

Route::get('/get_products/{id?}', [customerController::class, "getProducts"]);

Route::get('/login/{email}/{password}', [customerController::class, "login"]);

Route::post('/register', [customerController::class, "registration"]);

Route::get('/dashboard', [customerController::class, "dashboard"]);

Route::get('/favorite', [customerController::class, "favorite"]);

Route::get('/cart', [customerController::class, "cart"]);

Route::get('/product/{id}', [customerController::class, "product"]);

Route::post('/add_favorite', [customerController::class, "addFavorite"]);

Route::post('/add_cart', [customerController::class, "addCart"]);