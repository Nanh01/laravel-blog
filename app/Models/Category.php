<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [ 'category_id', 'category_name'];
    protected $timestamp = null;
    public function blog()
{
    return $this->hasMany(Blog::class);
}
}
