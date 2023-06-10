<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $category = Category::create(["name"=>$santiziedCategory,
        "description"=>$validated["description"]]);
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
            $record = Category::create(["name" => $santiziedCategory,"description" => $category["description"]]);
            $categories[] = $record; 
        }


        return response()->json(['categories'=>$categories,"message"=>"categories have been added!"]);
        

    }

    public function getCategories(Request $request){
        return response()->json(["categories" => Category::all()]);
    }

    // public function getCategoryItems(Request $request){
    //     $validation = Validator::make($request->all(),[
    //         "name" => "required|string",
    //     ]);
    //     $validated = $validation->validated();
    //     $categorySearch = cate

    // }

}