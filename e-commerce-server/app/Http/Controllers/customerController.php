<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Product;
use App\Models\Favorite;
use App\Models\Cart;

class customerController extends Controller
{
    function getProducts($id = null){
        if($id){
            $products = Product::find($id);
        }else{
            $products = Product::all();
        }
        
        return json_encode(["products" => $products]);
    }

    function login($email, $password) {
        if($email && $password) {
            $users = User::where('email', $email)->first();

            if(!Hash::check($password, $users['password'])) {
                $users = 'Wrong Password!';
                $status = 0;
            }
            else {
                $status = 1;
            }
        }
        else {
            $users = "Fill all the inputs!";
            $status = 0;
        }

        return json_encode([$status, $users]);
    }

    function registration(Request $request) {
        
        $users = new User;

        $users->first_name = $request->first_name;
        $users->last_name = $request->last_name;
        $users->email = $request->email;
        $users->password = $request->password;
        $users->type = 'customer';
        $users->save();

        $status=1;
        
        return json_encode([$status, $users]);
    }

    function dashboard() {
        $products = Product::all();
        
        return json_encode($products);
    }

    function favorite() {
        $favorites = Favorite::all();
        
        $product_id = $favorites->pluck('product_id');
        $products = Product::whereIn('id', $product_id)->get();

        return json_encode($products);
    }

    function cart() {
        $carts = Cart::all();
        
        $product_id = $carts->pluck('product_id');
        $products = Product::whereIn('id', $product_id)->get();

        return json_encode($products);
    }

    function product($id) {
        $products = Product::all();
        
        $products = Product::where('id', $id)->first();

        return json_encode($products);
    }

    function addFavorite(Request $request) {
        $favorites = Favorite::where('product_id', $request->product_id)
                             ->where('user_id', $request->user_id)
                             ->first();

        if(is_null($favorites)){
            $favorites = new Favorite;

            $favorites->user_id = $request->user_id;
            $favorites->product_id = $request->product_id;
            $favorites->save();
            
            return json_encode([$favorites]);
        }
    }

    function addCart(Request $request) {
        $carts = Cart::where('product_id', $request->product_id)
                     ->where('user_id', $request->user_id)
                     ->first();

        if(is_null($carts)){
            $carts = new Cart;
            
            $carts->user_id = $request->user_id;
            $carts->product_id = $request->product_id;
            $carts->save();
            
            return json_encode([$carts]);
        }
    }
}