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

        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'city' => 'required',
            'bank' => 'required',
            'zipcode' => 'required',
        ]);

        if ($user->role() == Role::PAID || $user->role == Role::ADMIN) {
            return response("You cant upgrade now!");
        }

        $user->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'city' => $request->city,
            'bank' => $request->bank,
            'zipcode' => $request->zipcode,
        ]);
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

        $user->role = Role::FREE;
        $user->save();

        return response($user);
    }


}
