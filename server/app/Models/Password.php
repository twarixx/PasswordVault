<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Password extends Model
{
    use HasFactory;

    //add website, username, password and category to fillable
    protected $fillable = ['website', 'username', 'password', 'category'];
}
