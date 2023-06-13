<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

use App\Enums\Status;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    


    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer("item_id");
            $table->integer("user_id");
            $table->integer("quantity")->default(1);
            $table->decimal("total_price",4,2)->nullable();
            $table->tinyInteger("status")->default(Status::PENDING->value); // incomplete order, will be updated using an update request
            $table->uuid("order_uuid")->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};