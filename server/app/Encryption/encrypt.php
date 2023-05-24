<?php 

namespace App\encrypt;

use Illuminate\Encryption\Encrypter; 

class encrypt extends Encrypter 
{ 
    public function setKey( $key ) 
    { $this->key = (string) $key; } 
}