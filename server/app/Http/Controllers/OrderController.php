<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Models\Deal;
use App\Models\Item;
use App\Models\Order;
use App\Models\User;
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
    public function getActualUserId($user_uuid){

        $actualUserId = User::where("user_uuid",$user_uuid)->first()->id;
        return $actualUserId;

    }
    public function addOrder(Request $request){
        $validation = Validator::make($request->all(),[
            "item_uuid" => "required|uuid",
            "user_uuid" => "required|uuid",
        ]);
        $validated = $validation->validated();
    
        try{
            $item = Item::where("item_uuid",$validated["item_uuid"])->first();
            $actualItemId = $item->id;
            $price = $item->price;
        }catch(Exception $e){
            return response()->json(["error" => "invalid Item UUID"], 400);
        }
        try{
            $actualUserId = $this->getActualUserId($validated["user_uuid"]);
        }catch(Exception $e){
            return response()->json(["error" => "invalid User UUID"], 400);
        }

        $existingOrder = Order::where('item_id', $actualItemId)
        ->where('user_id', $actualUserId)
        ->first();

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
        
        if(!$order = Order::where("order_uuid",$validated["order_uuid"])->first()){
            return response()->json(["error"=>"Order not found"],400);

        }

        $currentQuantity = $order->quantity;
        $order->quantity = $currentQuantity + 1;
        $order->save();
        $totalPrice = $this->priceOfOrder($order->id);
        $order->total_price = $totalPrice;
        $order->save();

        return response()->json(["order" => $order, "message" => "Order Quantity updated!"],200);
        
    }
    public function decrementOrderQuantity(Request $request){
        $validation = Validator::make($request->all(),[
            "order_uuid" => "required|uuid"
        ]);

        $validated = $validation->validated();
        if(!$order = Order::where("order_uuid",$validated["order_uuid"])->first()){
            return response()->json(["error"=>"Order not found"],400);
        }

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

    // public function checkoutOrder(Request $request){
    //     $validation = Validator::make($request->all(),[
    //         "order_uuid" => "required|uuid",
    //     ]);
    //     $validated = $validation->validated();

    //     $order = Order::where("order_uuid",$validated)->first();

    //     if($order && !is_null($order->id)){
    //         $totalPrice = $this->priceOfOrder($order->id);
    //         $order->total_price = $totalPrice;
    //         $order->save();

    //         return response()->json(["order"=>$order],200);
    //     }else{
    //         return response()->json(["error"=>"Record not found or Invalid Uuid",400]);
    //     }
    //     // todo: run tests and update checks
    // }

    
    public function finishOrder(Request $request) // * this function will run after payment or when the last button is pressed
    { // todo: make it accept multiple responses and make themm all complete

        $requestData = $request->all();

        if (!isset($requestData['orders'])) {
            return response()->json(['message' => 'Invalid request data. Missing "orders" key.'], 400);
        }

        $validation = Validator::make($request->all(), [
            "orders.*.order_uuid" => "required|uuid",
        ]);
        $validated = $validation->validated();

        $orders = [];

        foreach ($validated['orders'] as $checkedoutOrder) {
            $order = Order::where("order_uuid", $checkedoutOrder["order_uuid"])->first();
                $order->status = Status::COMPLETE->value;
                $order->save();

                $orders[] = $order;
        }
        return response()->json(["message"=>"Orders Completed!","orders"=>$orders],200);

    }
    
    
    public function getUserPendingOrders(Request $request){
        $validation = Validator::make($request->all(),[
            "user_uuid" => "required|uuid"
        ]);
        $validated = $validation->validated();

        try{
            $actualUserId = $this->getActualUserId($validated["user_uuid"]);
        }catch(Exception $e){
            return response()->json(["error" => "invalid User UUID"], 400);
        }
        $orders = Order::where("user_id",$actualUserId)->where("status",Status::PENDING)->get();
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