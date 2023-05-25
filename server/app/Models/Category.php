<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;

class Category extends Model
{
    use HasFactory;

    //add name and password to fillable
    protected $fillable = ['name', 'password_id', 'user_id'];

    public function passwords(): hasMany 
    {
        return $this->hasMany(Password::class);
    }
}
