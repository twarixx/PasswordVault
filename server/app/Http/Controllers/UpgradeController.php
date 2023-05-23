<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpgradeController extends Controller
{
    public function upgrade(Request $request)
    {
        $authUser = Auth::user();

        $user = User::find($authUser->id);

        if ($user->role() == Role::PAID || $user->role == Role::ADMIN) {
            return response("You cant upgrade now!");
        }

        if ($user->firstname == null ||
            $user->lastname == null ||
            $user->city == null ||
            $user->zipcode == null ||
            $user->bank == null
            ) {
            return response($user);

        }

        $user->role = Role::PAID;
        $user->save();

        return response($user);
    }

    public function downgrade()
    {
        $authUser = Auth::user();

        $user = User::find($authUser->id);

        if ($user->role() == Role::FREE || $user->role() == Role::ADMIN) {
            return response("You cant upgrade now!");
        }

        if ($user->firstname == null ||
            $user->lastname == null ||
            $user->city == null ||
            $user->zipcode == null ||
            $user->bank == null
        ) {
            return response($user);

        }

        $user->role = Role::PAID;
        $user->save();

        return response($user);
    }
}
