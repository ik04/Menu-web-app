<?php

namespace App\Http\Controllers;

use App\Models\Deal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class DealController extends Controller
{
    public function addDeal(Request $request){
        $validation = Validator::make($request->all(),[
            "value" => "required|integer",
            "duration" => "required|integer"
        ]);

        if($validation->fails()){
            return response()->json($validation->errors()->all(),400);
        }
        
        $validated = $validation->validated();
        $deal = Deal::create([
            "value" => $validated["value"],// * value is in percentage
            "duration" => $validated["duration"], // * duration is in hours
            "deal_uuid" => Uuid::uuid4()
            
        ]);
        
        return response()->json(["deal"=>$deal,"message" => "Deal has been added!"],201);
    }

    public function addDeals(Request $request)
    {

        $requestData = $request->all();

        if (!isset($requestData['deals'])) {
            return response()->json(['message' => 'Invalid request data. Missing "data" key.'], 400);
        }

        // ! request payload format
        // {
        //     "deals": [
        //       {"value": 30, "duration": 10},
        //       {"value": 20, "duration": 10}
        //     ]
        //   }
        $validation = Validator::make($request->all(), [
            "deals.*.value" => "required|integer",
            "deals.*.duration" => "required|integer"
        ]);

        if ($validation->fails()) {
            return response()->json($validation->errors()->all(), 400);
        }

        $validated = $validation->validated();
        $deals = [];

        foreach ($validated['deals'] as $dealData) {
            $record = Deal::create([
                "value" => $dealData['value'],
                "duration" => $dealData['duration'],
                "deal_uuid" => Uuid::uuid4()
            ]);

            $deals[] = $record;
        }

        return response()->json(["deals" => $deals, "message" => "Deals have been added!"], 200);
    }


    public function getDeals(Request $request){
        return response()->json(["Deals" => Deal::all()],200);
    
    }

    
}