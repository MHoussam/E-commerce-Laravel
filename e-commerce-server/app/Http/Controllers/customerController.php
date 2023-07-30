<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Product;

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
}
