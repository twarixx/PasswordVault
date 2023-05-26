<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
<<<<<<< HEAD
<<<<<<< HEAD
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
=======
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5
=======
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
>>>>>>> def6cfa4f9dbd01185f9c809a98d2deb38cf42c4

class Password extends Model
{
    use HasFactory;

    //add User, website, username, password and category to fillable
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> def6cfa4f9dbd01185f9c809a98d2deb38cf42c4
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
<<<<<<< HEAD
=======
    protected $fillable = ['User', 'website', 'username', 'password', 'category'];
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5
=======
>>>>>>> def6cfa4f9dbd01185f9c809a98d2deb38cf42c4
}
