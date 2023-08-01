<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
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

    // function login($email, $password) {
    //     if($email && $password) {
    //         $users = User::where('email', $email)->first();

    //         if(!Hash::check($password, $users['password'])) {
    //             $users = 'Wrong Password!';
    //             $status = 0;
    //         }
    //         else {
    //             $status = 1;
    //         }
    //     }
    //     else {
    //         $users = "Fill all the inputs!";
    //         $status = 0;
    //     }

    //     return json_encode([$status, $users]);
    // }

    // function registration(Request $request) {
    //     $users = new User;

    //     $users->first_name = $request->first_name;
    //     $users->last_name = $request->last_name;
    //     $users->email = $request->email;
    //     $users->password = $request->password;
    //     $users->type = 'customer';
    //     $users->save();

    //     $status=1;
        
    //     return json_encode([$status, $users]);
    // }

    function add(Request $request) {
        $products = new Product;

        // $request->validate([
        //     'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        // ]);

        // $photoPath = $request->file('photo')->store('photos', 'public');

        // $base64photo = $request->photo;
        // $imageData = base64_encode($base64photo);
        // $filename = uniqid() . '.jpg';
        // $path = public_path('photos\\' . $filename);
        // file_put_contents($path, $imageData);

        // $photoPath = $request->photo->store('photos', 'public');

        // $base64photo = base64_encode(file_get_contents($photoPath));

        // $products->photo = 'data:' . mime_content_type($photoPath) . ';base64,' . $base64photo;


        $products->name = $request->name;
        $products->description = $request->description;
        $products->price = $request->price;
        $products->quantity = $request->quantity;
        $products->category = $request->category;
        //$products->photo = $request->photo;
        $products->save();

        $status=1;
        return json_encode([$status, $products]);
    }

    function dashboard() {
        $products = Product::all();
        
        // $modifiedProducts = $products->map(function ($product) {
        //     // $imagePath = $product->photo; // This is the base64 encoded image path from the database
        //     // $product->photo = substr($imagePath, strpos($imagePath, ',') + 1);

        //     $imagePath = $product->photo; // This is the image path (file path or URL) from the database
        //     $imageData = base64_decode($imagePath); // Encode the image data as base64
        //     $product->photo =  $imageData;

        //     return $product;
        // });

        return json_encode($products);
    }

    function favorite($user_id) {
        $favorites = Favorite::where('user_id', $user_id)->get();

        $product_id = $favorites->pluck('product_id');
        $products = Product::whereIn('id', $product_id)->get();

        return json_encode($products);
    }

    function cart($user_id) {
        $carts = Cart::where('user_id', $user_id)->get();
        
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

    function delete(Request $request) {
        $products = Product::find($request->product_id);
        
        $products->delete();

        return json_encode(['message' => 'Row Deleted Successfully']);
    }

    function edit(Request $request) {
        $products = Product::find($request->product_id);
        
        $products->name = $request->name;
        $products->description = $request->description;
        $products->price = $request->price;
        $products->quantity = $request->quantity;
        $products->category = $request->category;
        $products->save();

        return json_encode([$products]);
    }

    public function store(Request $request)
    {

        return redirect()->route('products.index')->with('success', 'Product added successfully.');
    }
}