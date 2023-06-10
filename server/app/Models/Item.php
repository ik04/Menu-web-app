<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "image",
        "price",
        "deal_id",
        "category_id",
        "item_uuid"
    ];
}