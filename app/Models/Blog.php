<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    //
    protected $fillable = ['title', 'content','state', 'user_id', 'category_id'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function category()
{
    return $this->belongsTo(Category::class);
}
}
