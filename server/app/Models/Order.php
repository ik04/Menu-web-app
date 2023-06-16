<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        "item_id",
        "quantity",
        "order_uuid",
        "status",
        "total_price",
        "user_id"
        //* if user is added, they'll show up directly in the order

    ];
}