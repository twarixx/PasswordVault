<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    use HasFactory;

    //add name and password to fillable
    protected $fillable = ['name', 'password_id', 'user_id'];

    public function passwords(): BelongsTo 
    {
        return $this->belongsTo(Password::class);
    }
}
