<?php

namespace App\Enums;

enum Role:string
{
    case FREE = 'Free';
    case PAID = 'Paid';
    case ADMIN = 'Admin';

    public static function getRole($role)
    {
        return match($role)
        {
            'Free' => Role::FREE,
            'Paid' => Role::PAID,
            'Admin' => Role::ADMIN,
        };
    }

}
