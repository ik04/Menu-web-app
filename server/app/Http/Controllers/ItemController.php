<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    public function addItem(Request $request){
        $validation = Validator::make($request->all(),[
            "name"=>"required|string",
            "image"=>"required|mimes:png,jpeg,jpg",
            "price"=>"required|integer",
            "deal_id"=>"required|integer",
            "category_id"=>"required|integer"]);

            if($validation->fails()){
                return response()->json($validation->errors()->all(),400);
            }
            
            $validated = $validation->validated();
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

        }
        
        
    
    
}