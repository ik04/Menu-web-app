<?php

namespace App\Http\Controllers;

use App\Models\Deal;
use App\Enums\Status;
use App\Models\Item;
use App\Models\Order;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;


class OrderController extends Controller
{
    public function addOrder(Request $request){
        $validation = Validator::make($request->all(),[
            "item_uuid" => "required|uuid",
        ]);
        $validated = $validation->validated();
    
        
        try{
            $item = Item::where("item_uuid",$validated["item_uuid"])->first();
            $actualItemId = $item->id;
            $price = $item->price;
        }catch(Exception $e){
            return response()->json(["error" => "invalid Item UUID"], 400);
        }
        $actualUserId = $request->user()->id;

        $existingOrder = Order::where('item_id', $actualItemId)
        ->where('user_id', $actualUserId)->where("status",Status::PENDING->value)
        ->exists();

    if ($existingOrder) {
        return response()->json(["message" => "Order with the same item already exists!"], 409);
    }

        $order = Order::create([
            "item_id" => $actualItemId,
            "user_id" => $actualUserId,
            "order_uuid" => Uuid::uuid4(),
            "total_price" => $price
        ]);
        return response()->json(["order_uuid"=>$order->order_uuid,"message"=>"order has been created!"],201);
    }
    public function getActualItemId($item_uuid){

        $actualItemId = Item::select("item_uuid","id")->where("item_uuid",$item_uuid)->first()->id;
        return $actualItemId;

    }
   

    public function priceOfOrder($orderId){
        $order = Order::where("id",$orderId)->first();

        $itemId = $order->item_id;
        $itemQuantity = $order->quantity;
        $item = Item::where("id",$itemId)->first();
        $itemDealId = $item->deal_id;
        $itemPrice = $item->price;

        if(!is_null($itemDealId)){
            $deal = Deal::where("id",$itemDealId)->first();
            $itemDealValue = $deal->value;
            $itemFinalPrice = $itemQuantity * ($itemPrice - ($itemPrice*($itemDealValue/100)));
            return $itemFinalPrice;            
        }
        else{
            $itemPrice = $item->price;
            $itemFinalPrice = $itemQuantity * $itemPrice;
            return $itemFinalPrice;
        }
        //? use joins not individual calls $item_price = $item->price, what's the better implementation?
        // todo: implement a function to delete records after expiration of duration
    }


    public function incrementOrderQuantity(Request $request){
        $validation = Validator::make($request->all(),[
            "order_uuid" => "required|uuid"
        ]);

        $validated = $validation->validated();
        
        if(!$order = Order::where("order_uuid",$validated["order_uuid"])->exists()){
            return response()->json(["error"=>"Order not found"],400);
        }
        $order = Order::join("items","orders.item_id","=","items.id")->where("order_uuid",$validated["order_uuid"])->select("quantity","total_price","status","order_uuid","items.price","orders.id")->first();
        // $order = Order::where("order_uuid",$validated["order_uuid"])->first(); //! optimise query using select

        $currentQuantity = $order->quantity;
        $order->quantity = $currentQuantity + 1;
        $order->save();
        $totalPrice = $this->priceOfOrder($order->id);
        $order->total_price = $totalPrice;
        $order->save();
        $order->id = null;

        return response()->json(["order" => $order, "message" => "Order Quantity updated!"],200);
        
    }
    public function decrementOrderQuantity(Request $request){
        $validation = Validator::make($request->all(),[
            "order_uuid" => "required|uuid"
        ]);

        $validated = $validation->validated();
        if(!$order = Order::where("order_uuid",$validated["order_uuid"])->exists()){
            return response()->json(["error"=>"Order not found"],400);
        }

        $order = Order::join("items","orders.item_id","=","items.id")->where("order_uuid",$validated["order_uuid"])->select("quantity","total_price","status","order_uuid","items.price","orders.id")->first();
        // $order = Order::where("order_uuid",$validated["order_uuid"])->first(); //! optimise query using select

        $currentQuantity = $order->quantity;

        if($currentQuantity === 1){
            $order->delete();
            return response()->json(["message"=>"order deleted"],200);
        }
        $order->quantity = $currentQuantity - 1;
        $order->save();
        $totalPrice = $this->priceOfOrder($order->id);
        $order->total_price = $totalPrice;
        $order->save();
        return response()->json(["order" => $order, "message" => "Order Quantity updated!"],200);
    }
    
    
    public function finishOrder(Request $request)
    {
        $userId = $request->user()->id;
        $orders = Order::join("items","orders.item_id","=","items.id")->select("order_uuid","quantity","total_price","name","image")->where("status", Status::PENDING->value)->where("user_id", $userId)->update(['status' => Status::COMPLETE->value]);
        return response()->json(["message" => "Orders Completed!"], 200);
    }

    public function getOrderCount(Request $request){
        $userId = $request->user()->id;
        $orderCount = Order::where("status", Status::PENDING->value)->where("user_id", $userId)->count();
        return response()->json(["message" => "Orders Count", "order_count" => $orderCount], 200);
    }
    
    
    public function getUserPendingOrders(Request $request){
        $userId = $request->user()->id;

        $orders = Order::join("items","orders.item_id","=","items.id")->select("order_uuid","quantity","status","total_price","item_uuid","name","image")->where("user_id",$userId)->where("status",Status::PENDING)->get(); 
        return response()->json(["orders" => $orders,"message" => "pending orders"],200);
        
    }

    public function deleteOrder(Request $request){
        $validation = Validator::make($request->all(),[
            "order_uuid" => "required|uuid"
        ]);

        $validated = $validation->validated();

        if(!$order = Order::where("order_uuid",$validated["order_uuid"])->first()){
            return response()->json(["error"=>"Order not found"],400);
        }
        $order->delete();
        return response()->json(["message"=>"order deleted"],200);
    }

}
// ? should i implement a check for complete orders? since you shouldn't be able to alter completed routes