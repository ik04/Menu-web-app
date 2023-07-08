<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Deal;
use App\Models\Item;
use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class ItemController extends Controller
{

    public function getJoinItems(Request $request){
        $joinItems = Item::join("categories","items.category_id","=","categories.id")->join("deals","items.deal_id","=","deals.id")->select('items.name', 'items.image', 'items.price','items.item_uuid', 'categories.name as category_name', 'deals.value as deal_value')
        ->get();
        return response()->json(["items"=>$joinItems]);
    }
    public function getJoinItem(Request $request){
        $validation = Validator::make($request->all(),[
            "item_uuid" => "required|uuid"
        ]);
        $validated = $validation->validated();
        $joinItems = Item::join("categories","items.category_id","=","categories.id")->join("deals","items.deal_id","=","deals.id")->select('items.name', 'items.image', 'items.price', 'categories.name as category_name', 'deals.value as deal_value')->where("item_uuid",$validated["item_uuid"])
        ->get();
        return response()->json(["item"=>$joinItems]);
    }

    

    public function healthCheck(Request $request){
        
        return response()->json("Hi from Menu-App ~ ishaan khurana",200);
    }

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
            "deal_uuid"=>"uuid|nullable", 
            "category_uuid"=>"required|uuid"]);

            if($validation->fails()){
                return response()->json($validation->errors()->all(),400);
            }
            $validated = $validation->validated();

            try {
                $actualCategoryId = $this->getCategoryId($validated["category_uuid"]);
            } catch (Exception $e) {
                return response()->json(["error" => "invalid Category UUID"], 400);
            }
            
            if($request->has('image')){
                try{
                    $image = $request->file('image');
                    $img_name = time().'.'.$image->getClientOriginalExtension();
                    Storage::disk('public')->put("/items/".$img_name,file_get_contents($image));
                    $url = Storage::url("items/".$img_name);
                }catch(Exception $e){ 
                    //! use throw exception for future
                   return $e->getMessage();
                }
            }
            
            if($request->has('deal_uuid')){
                try{
                    $actualDealId = $this->getDealId($validated["deal_uuid"]);
                    $item = Item::create([
                        "name" => $validated["name"],
                        "image" => $url,
                        "price" => $validated["price"],
                        "deal_id" => $actualDealId,
                        "category_id" => $actualCategoryId,
                        "item_uuid" => Uuid::uuid4()
                    ]);
                   
                    return response()->json(["item"=>$item,"message"=>"The item has been added!"]); // ! don't return item or remove id parts
                    
                } catch(Exception $e){
                    return response()->json(["error" => "invalid Deal UUID"], 400);
                }
            }
            // ? find the base64 method for sending images (for future)
            $item = Item::create([
                "name" => $validated["name"],
                "image" => $url,
                "price" => $validated["price"],
                "category_id" => $actualCategoryId,
                "item_uuid" => Uuid::uuid4()
            ]);
            return response()->json(["item"=>$item,"message"=>"The item has been added! (no deal)"]); // ! don't return item or remove id parts
        }

        public function getItems(Request $request){

            return response()->json(["items"=>Item::all()],200);
        }

     

// todo: add search route
        
        
        
    
    
}