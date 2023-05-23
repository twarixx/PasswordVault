<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Password extends Model
{
    use HasFactory;

    //add url, username, password and category to fillable
    protected $fillable = ['url', 'username', 'password', 'category'];
}
