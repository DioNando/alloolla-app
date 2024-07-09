<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuditLogResource extends JsonResource
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
            'user' => new UserResource($this->user),
            'action' => $this->action,
            'entity_type' => $this->entity_type,
            'entity_id' => $this->entity_id,
            'color' => $this->color,
            'icon' => $this->icon,
            'details' => $this->details,
            'date' => date_format($this->created_at, "l, d F Y"),
            'time' => date_format($this->created_at, "H:i"),
        ];
    }
}
