<?php

namespace App\Http\Controllers;

use App\Models\Deal;
use App\Models\Item;
use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

use function PHPUnit\Framework\isNull;

class OrderController extends Controller
{
    public function getActualItemId($item_uuid){

        $actualItemId = Item::where("item_uuid",$item_uuid)->first()->id;
        return $actualItemId;

    }
    public function addOrder(Request $request){
        $validation = Validator::make($request->all(),[
            "item_uuid" => "required|uuid",
            "quantity" => "required|integer",
        ]);
        $validated = $validation->validated();


        try{
            $actualItemId = $this->getActualItemId($validated["item_uuid"]);
        }catch(Exception $e){
            return response()->json(["error" => "invalid Item UUID"], 400);
        }


        $order = Order::create([
            "item_id" => $actualItemId,
            "quantity" => $validated["quantity"],
            "order_uuid" => Uuid::uuid4()
        ]);
        return response()->json(["order_uuid"=>$order->order_uuid,"message"=>"order has been created!"],201);
    }

    public function priceOfOrder($order_uuid){
        $order = Order::where("order_uuid",$order_uuid)->first();

        $item_id = $order->item_id;
        $item_quantity = $order->quantity;
        $item = Item::where("id",$item_id)->first();
        $item_deal_id = $item->deal_id;

        if(!isNull($item_deal_id)){
            $item_details = Item::join("deals","items.deal_id","=","deals.id")->get(["price","value"])->where("items.id",$item_id);
            $item_price = $item_details->price;
            $item_deal_value = $item_details->value;
            $item_final_price = $item_quantity * ($item_price - ($item_price*($item_deal_value/100)));

            return $item_final_price;            
        }
        else{
            $item_price = $item->price;
            $item_final_price = $item_quantity * $item_price;
            return $item_final_price;
        }
        //! use joins not individual calls $item_price = $item->price;
        //? but why?
        // todo: implement a function to delete records after expiration of duration
    }

    public function processOrder(Request $request){
        //* this will be called when the client presses proceed to checkout
        $validation = Validator::make($request->all(),[
            "order_uuid" => "required|uuid",
        ]);
        $validated = $validation->validated();

        $total_price = $this->priceOfOrder($validated["order_uuid"]);
        return response()->json(["total_price" => $total_price],200);
        
    }
        

        

}