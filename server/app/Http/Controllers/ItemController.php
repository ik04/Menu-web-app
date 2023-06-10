<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Deal;
use App\Models\Item;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class ItemController extends Controller
{

    public function getCategoryId($categoryId)
{
    $actualCategoryId = Category::where("category_uuid", $categoryId)->first("id")->id;
    return $actualCategoryId;
}
    public function getDealId($dealId)
{
    $actualDealId = Deal::where("deal_uuid", $dealId)->first("id")->id;
    return $actualDealId;
}


    public function addItem(Request $request){
        $validation = Validator::make($request->all(),[
            "name"=>"required|string",
            "image"=>"required|mimes:png,jpeg,jpg",
            "price"=>"required|integer", // * inr
            "deal_uuid"=>"required|uuid",
            "category_uuid"=>"required|uuid"]);

           

            if($validation->fails()){
                return response()->json($validation->errors()->all(),400);
            }
            $validated = $validation->validated();

            $actualCategoryId = $this->getCategoryId($validated["category_uuid"]);
            $actualDealId = $this->getDealId($validated["deal_uuid"]);



            if($request->has('image')){
                try{
                    $image = $request->file('image');
                    $img_name = time().'.'.$image->getClientOriginalExtension();
                    Storage::disk('public')->put("/posts/".$img_name,file_get_contents($image));
                    $url = Storage::url("posts/".$img_name);
                }catch(Exception $e){ 
                    //! use throw exception for future
                   return $e->getMessage();
                }
            }

            // ? find the base64 method for sending images (for future)

            $item = Item::create([
                "name" => $validated["name"],
                "image" => $url,
                "price" => $validated["price"],
                "deal_id" => $actualDealId,
                "category_id" => $actualCategoryId,
                "item_uuid" => Uuid::uuid4()
            ]);
            return response()->json(["item"=>$item,"message"=>"The item has been added!"]); // ! don't return item or remove id parts
        }

        
        
        
    
    
}