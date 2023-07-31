<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\customerController;

Route::get('/get_products/{id?}', [customerController::class, "getProducts"]);

Route::get('/login/{email}/{password}', [customerController::class, "login"]);

Route::post('/register', [customerController::class, "registration"]);

Route::post('/add', [customerController::class, "add"]);

Route::get('/dashboard', [customerController::class, "dashboard"]);

Route::get('/favorite/{user_id}', [customerController::class, "favorite"]);

Route::get('/cart/{user_id}', [customerController::class, "cart"]);

Route::get('/product/{id}', [customerController::class, "product"]);

Route::post('/add_favorite', [customerController::class, "addFavorite"]);

Route::post('/add_cart', [customerController::class, "addCart"]);

Route::post('/delete', [customerController::class, "delete"]);