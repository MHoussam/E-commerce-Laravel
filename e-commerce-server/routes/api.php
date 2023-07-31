<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\customerController;

Route::get('/get_products/{id?}', [customerController::class, "getProducts"]);

// Route::get('/log/{email}/{password}', [customerController::class, "login"]);

Route::post('/regist', [customerController::class, "registration"]);

Route::post('/add', [customerController::class, "add"]);

Route::get('/dashboard', [customerController::class, "dashboard"]);

Route::get('/favorite/{user_id}', [customerController::class, "favorite"]);

Route::get('/cart/{user_id}', [customerController::class, "cart"]);

Route::get('/product/{id}', [customerController::class, "product"]);

Route::post('/add_favorite', [customerController::class, "addFavorite"]);

Route::post('/add_cart', [customerController::class, "addCart"]);

Route::post('/delete', [customerController::class, "delete"]);

Route::post('/edit', [customerController::class, "edit"]);

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});

Route::controller(TodoController::class)->group(function () {
    Route::get('todos', 'index');
    Route::post('todo', 'store');
    Route::get('todo/{id}', 'show');
    Route::put('todo/{id}', 'update');
    Route::delete('todo/{id}', 'destroy');
}); 