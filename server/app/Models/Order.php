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
        "status"
        // "user"
        //* if user is added, they'll show up directly in the order

    ];
}