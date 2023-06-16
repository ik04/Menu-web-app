<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// * UNIVERSAL Routes   
Route::get("/v1/healthcheck",[ItemController::class,"healthCheck"]);
// * CATEGORY ROUTES
Route::post("/v1/get-category-items",[CategoryController::class,"getCategoryItems"]);  
Route::get("/v1/get-categories",[CategoryController::class,"getCategories"]);

// * DEAL ROUTES
Route::get("v1/get-deals",[DealController::class,"getDeals"]);

// * ITEM ROUTES
Route::get("/v1/get-detailed-items",[ItemController::class,"getJoinItems"]);
Route::post("/v1/get-detailed-item",[ItemController::class,"getJoinItem"]);


// * AUTH ROUTES
Route::post("/v1/auth-register",[UserController::class,"authRegister"]);
Route::post("/v1/auth-login",[UserController::class,"authLogin"]);

Route::middleware(['auth:sanctum',"checkUserPrivilege"])->group(function (){

    Route::get("/v1/get-items",[ItemController::class,"getItems"]);
    
    // * ADDITION ROUTES
    Route::post("/v1/add-category",[CategoryController::class,"addCategory"]);  
    Route::post("/v1/add-categories",[CategoryController::class,"addCategories"]); // * add multiple categories using an array of objects (state)
    Route::post("v1/add-deal",[DealController::class,"addDeal"]);
    Route::post("v1/add-deals",[DealController::class,"addDeals"]); // * add multiple deals using an array of objects (state)
    Route::post("v1/add-item",[ItemController::class,"addItem"]); 
});


// * USER ROUTES
Route::get("/v1/get-user-data",[UserController::class,"userData"]);
Route::post("/v1/register",[UserController::class,"register"]);
Route::post("/v1/login",[UserController::class,"login"]);

Route::middleware(['auth:sanctum'])->group(function (){
    Route::post("/v1/logout",[UserController::class,"logout"]);
    // * ORDER ROUTES 
    //todo: add get order routes
    Route::post("/v1/add-order",[OrderController::class,"addOrder"]);
    // Route::post("/v1/checkout-order",[OrderController::class,"checkoutOrder"]);
    Route::post("/v1/finish-order",[OrderController::class,"finishOrder"]); // ? would it be wise to shift the completed orders to a new table, if so how do i do that?
    Route::post("/v1/add-order-quantity",[OrderController::class,"incrementOrderQuantity"]); 
    Route::post("/v1/decrease-order-quantity",[OrderController::class,"decrementOrderQuantity"]); 
    Route::post("/v1/get-pending-orders",[OrderController::class,"getUserPendingOrders"]); // * checkout route instead
});

// todo: need to add alot of client routes 
// todo: (getting all user orders totalling price in the end, allow going back to modify order, adding to order with an item and current user (actual issue))

//? dev routes (idea)