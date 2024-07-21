<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'regular_price' => $this->regular_price,
            'stock' => $this->stock,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'id_product_wp' => $this->id_product_wp,
            'categories' => $this->categories,
            'images' => $this->images,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
