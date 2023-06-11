<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Models\Deal;
use App\Models\Item;
use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;


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

    public function priceOfOrder($order_id){
        $order = Order::where("id",$order_id)->first();

        $item_id = $order->item_id;
        $item_quantity = $order->quantity;
        $item = Item::where("id",$item_id)->first();
        $item_deal_id = $item->deal_id;
        $item_price = $item->price;

        if(!is_null($item_deal_id)){
            $deal = Deal::where("id",$item_deal_id)->first();
            $item_deal_value = $deal->value;
            $item_final_price = $item_quantity * ($item_price - ($item_price*($item_deal_value/100)));
            return $item_final_price;            
        }
        else{
            $item_price = $item->price;
            $item_final_price = $item_quantity * $item_price;
            return $item_final_price;
        }
        //? use joins not individual calls $item_price = $item->price, what's the better implementation?
        // todo: implement a function to delete records after expiration of duration
    }

    public function checkoutOrder(Request $request){
        //* this will be called when the client presses proceed to checkout
        $validation = Validator::make($request->all(),[
            "order_uuid" => "required|uuid",
        ]);
        $validated = $validation->validated();

        $order = Order::where("order_uuid",$validated)->first();

        if($order && !is_null($order->id)){

            $total_price = $this->priceOfOrder($order->id);
            $order->total_price = $total_price;
            $order->save();

            return response()->json(["order"=>$order],200);


        }else{
            return response()->json(["error"=>"Record not found or Invalid Uuid",400]);
        }
        // todo: run tests and update checks
    }

    
    public function finishOrder(Request $request) // * this function will run after payment or when the last button is pressed
    {
        $validation = Validator::make($request->all(), [
            "order_uuid" => "required|uuid",
        ]);
        $validated = $validation->validated();
    
        $order = Order::where("order_uuid", $validated)->first();
        if ($order && !is_null($order->id)) {
            if (is_null($order->total_price)) {
                return response()->json(["error" => "Total price is not available, Order is not checked-out"], 400);
            }
    
            $order->status = Status::COMPLETE->value;
            $order->save();
    
            return response()->json(["order" => $order], 200);
        } else {
            return response()->json(["error" => "Record not found or Invalid Uuid"], 400);
        }
    }
    
        

        

}