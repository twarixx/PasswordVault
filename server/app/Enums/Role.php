<?php

namespace App\Enums;

enum Role:string
{
    case FREE = 'Free';
    case PAID = 'Paid';
    case ADMIN = 'Admin';
}
