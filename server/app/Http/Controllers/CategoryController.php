<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class CategoryController extends Controller
{
    public function addCategory(Request $request){
        $validation = Validator::make($request->all(),[
            "name" => "required|string|unique:categories",
            "description" => "required|string"
        ]);

        if($validation->fails()){
            return response()->json($validation->errors()->all(),400);
        }
        $validated = $validation->validated();
        $santiziedCategory = strtolower($validated["name"]);


        $existingCategory = Category::where('name', $santiziedCategory)
        ->first();

    if ($existingCategory) {
        return response()->json(["message" => "Deal with the same value and duration already exists!"], 409);
    }
        $category = Category::create(["name"=>$santiziedCategory,
        "description"=>$validated["description"],"category_uuid" => Uuid::uuid4()]);
        return response()->json(['category'=>$category,"message"=>"category added"]);
    }

    
    public function addCategories(Request $request){
        $requestData = $request->all();

        if (!isset($requestData['categories'])) {
            return response()->json(['message' => 'Invalid request data. Missing "data" key.'], 400);
        }
        $validation = Validator::make($request->all(),[
            "categories.*.name" => "required|string",
            "categories.*.description" => "string"
        ]);

        if($validation->fails()){
            return response()->json($validation->errors()->all(),400);
        }

        $validated = $validation->validated();
        $categories = [];

        foreach($validated["categories"] as $category){

            $santiziedCategory = strtolower($category["name"]);


            if($existingDeal = Category::where('name', $santiziedCategory)
            ->first()){
                continue;
            }

            $record = Category::create(["name" => $santiziedCategory,"description" => $category["description"],"category_uuid" => Uuid::uuid4()]);
            $categories[] = $record; 
        }
        if(empty($categories)){
            return response()->json("No new categories have been added",200);
        }

        return response()->json(['categories'=>$categories,"message"=>"New categories have been added!"]);
    }

    public function getCategories(Request $request){
        return response()->json(["categories" => Category::all()]);
    }

    public function getCategoryItems(Request $request){
        $validation = Validator::make($request->all(),[
            "category_uuid" => "required|uuid",
        ]);
        $validated = $validation->validated();
        $categoryItems = Category::join("items","items.category_id","=","categories.id")->select('items.name', 'items.image', 'items.price','items.item_uuid')->where("categories.category_uuid",$validated["category_uuid"])->get();
        $categoryName = Category::where("category_uuid",$validated["category_uuid"])->first("name")->name;
        return response()->json(["items"=>$categoryItems,"category_name"=>$categoryName]);
    } 
    // ? implement caching in FE

}