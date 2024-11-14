<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "content" => $this->content,
            "state" => $this->state,
            "user" => $this->user->name,
            "category" => $this->category->category_name,
            "createAt" => $this->created_at,
            "updateAt" => $this->updated_at
        ];
    }
}
