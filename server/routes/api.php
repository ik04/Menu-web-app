<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
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

Route::get("/v1/healthcheck",[ItemController::class,"healthCheck"]);

// * CATEGORY ROUTES
Route::post("/v1/add-category",[CategoryController::class,"addCategory"]);  
Route::post("/v1/add-categories",[CategoryController::class,"addCategories"]); // * add multiple categories using an array of objects (state)
Route::get("/v1/get-categories",[CategoryController::class,"getCategories"]);


// * DEAL ROUTES
Route::post("v1/add-deal",[DealController::class,"addDeal"]);
Route::post("v1/add-deals",[DealController::class,"addDeals"]); // * add multiple categories using an array of objects (state)
Route::get("v1/get-deals",[DealController::class,"getDeals"]);

// * ITEM ROUTES
Route::post("v1/add-item",[ItemController::class,"addItem"]); 
Route::get("/v1/get-items",[ItemController::class,"getItems"]);

// * ORDER ROUTES
Route::post("/v1/add-order",[OrderController::class,"addOrder"]);
Route::post("/v1/");

// todo: admin/moderator to interact with the addition routes