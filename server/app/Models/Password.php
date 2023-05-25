<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
<<<<<<< HEAD
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
=======
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5

class Password extends Model
{
    use HasFactory;

    //add User, website, username, password and category to fillable
<<<<<<< HEAD
    protected $fillable =
        [
            'User',
            'website',
            'username',
            'password',
            'category',
            'user_id',
        ];

    protected $hidden = [
        'password'
    ];

    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
=======
    protected $fillable = ['User', 'website', 'username', 'password', 'category'];
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5
}
