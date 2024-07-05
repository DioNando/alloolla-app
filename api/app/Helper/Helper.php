<?php

namespace App\Helper;

use App\Http\Resources\InteractionResource;
use App\Models\Interaction;

class Helper
{

    public static function interactionProduct(int $id, int $user, string $type, string $color, string $icon, string $description) {
        $data = new Interaction();
        $data->product_id = $id;
        $data->user_id = $user;
        $data->type = $type;
        $data->color = $color;
        $data->icon = $icon;
        $data->description = $description;
        $data->save();
        return new InteractionResource($data);
    }

    public static function interactionCategory(int $id, int $user, string $type, string $color, string $icon, string $description) {
        $data = new Interaction();
        $data->category_id = $id;
        $data->user_id = $user;
        $data->type = $type;
        $data->color = $color;
        $data->icon = $icon;
        $data->description = $description;
        $data->save();
        return new InteractionResource($data);
    }


}
