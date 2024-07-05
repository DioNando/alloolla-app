<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InteractionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'product' => new ProductResource($this->product),
            'type' => $this->type,
            'color' => $this->color,
            'icon' => $this->icon,
            'user' => new UserResource($this->user),
            'description' => $this->description,
            'created_at' => date_format($this->created_at, "l, d F Y"),
            // setlocale(LC_TIME, ['fr', 'fra', 'fr_FR']),
            // 'created_at' => strftime('%A, %d %B %Y'),
            'time' => date_format($this->created_at, "H:i"),
        ];
    }
}
