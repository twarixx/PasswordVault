<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Password extends Model
{
    use HasFactory;

    //add User, website, username, password and category to fillable
    protected $fillable =
        [
            'User',
            'website',
            'username',
            'password',
            'category',
            'user_id',
        ]; 

    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function Category(): HasMany 
    { 
        return $this->hasMany(Category::class); 
    }
}
