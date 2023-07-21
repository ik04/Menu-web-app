<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\Item;
use Faker\Core\Uuid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Ramsey\Uuid\Uuid as UuidUuid;

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


Route::prefix("v1")->group(function(){
    // * INIT ROUTES
    
    // * UNIVERSAL Routes   
    Route::get("healthcheck",[ItemController::class,"healthCheck"]);
    
    // * CATEGORY ROUTES
    Route::post("get-category-items",[CategoryController::class,"getCategoryItems"]);  
    Route::get("get-categories",[CategoryController::class,"getCategories"]);
    
    // * DEAL ROUTES
    Route::get("get-deals",[DealController::class,"getDeals"]);
    
    // * ITEM ROUTES
    Route::get("get-detailed-items",[ItemController::class,"getJoinItems"]);
    Route::post("get-detailed-item",[ItemController::class,"getJoinItem"]);
    
    
    // * ADMIN ROUTES
    Route::post("auth-register",[UserController::class,"authRegister"]);
    Route::post("auth-login",[UserController::class,"authLogin"]);
    
    Route::middleware(['auth:sanctum',"checkUserPrivilege"])->group(function (){
        
        Route::get("get-items",[ItemController::class,"getItems"]);
        
        // * ADDITION ROUTES
        Route::post("add-category",[CategoryController::class,"addCategory"]);  
        Route::post("add-categories",[CategoryController::class,"addCategories"]); // * add multiple categories using an array of objects (state)
        Route::post("add-deal",[DealController::class,"addDeal"]);
        Route::post("add-deals",[DealController::class,"addDeals"]); // * add multiple deals using an array of objects (state)
        Route::post("add-item",[ItemController::class,"addItem"]); 
    });
    
    
    // * USER ROUTES
    Route::get("get-user-data",[UserController::class,"userData"]);
    Route::post("register",[UserController::class,"register"]);
    Route::post("login",[UserController::class,"login"]);
    
    Route::middleware(['auth:sanctum'])->group(function (){
    Route::post("logout",[UserController::class,"logout"]);
    // * ORDER ROUTES 
    Route::post("add-order",[OrderController::class,"addOrder"]);
    Route::delete("delete-order",[OrderController::class,"deleteOrder"]);
    Route::post("finish-orders",[OrderController::class,"finishOrder"]); // ? would it be wise to shift the completed orders to a new table, if so how do i do that?
    Route::post("add-order-quantity",[OrderController::class,"incrementOrderQuantity"]); 
    Route::post("decrease-order-quantity",[OrderController::class,"decrementOrderQuantity"]); 
    Route::get("get-pending-orders",[OrderController::class,"getUserPendingOrders"]); // * checkout route instead
});
});

// todo: (getting all user orders totalling price in the end, allow going back to modify order, adding to order with an item and current user (actual issue))


Route::get("/_db-init",function(){
    Category::create([
        "name" =>"starters",
        "description"=>"random",
        "category_uuid"=>"b4706b6c-e53f-4d1a-9c70-32567f8fbd89",
    ]);
    Category::create([
        "name" =>"Main Course",
        "description"=>"random",
        "category_uuid"=>"5c915529-904e-4d3d-b335-100a653dfa4b",
    ]);
    Category::create([
        "name" =>"Dinner",
        "description"=>"random",
        "category_uuid"=>"90392922-ee4b-4fa7-b047-293fe9622dc2",
    ]);

    
    $relativePath = __DIR__ . "/init/items.json";
        $items = file_get_contents($relativePath);
        $items = json_decode($items);
        $items = $items->items;
        foreach($items as $item){
            $item = Item::create([
                "name" => $item->pizza_name,
                "image" => "/storage/items/default.jpg",
                "price" => 100,
                "category_id" => 1,
                "item_uuid" => UuidUuid::uuid4()
            ]);
        }
        
        
        $relativePath = __DIR__ . "/init/categories.json";
        $categories = file_get_contents($relativePath);
        $categories = json_decode($categories);
        $categories = $categories->categories;
        foreach($categories as $category){
            $category = Category::create([
                "name" => $category->name,
                "description" => "this is inititialized stuff",
                "category_uuid" => UuidUuid::uuid4()
            ]);
        }
        return response()->json("initialized",200);
    
});