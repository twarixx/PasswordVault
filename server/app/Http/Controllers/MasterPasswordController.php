<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MasterPasswordController extends Controller
{
    public function checkMasterPassword(Request $request)
    {

        $user = Auth::user();
        $hasher = app('hash');
        $request->masterpassword;
        if (!$hasher->check($request->masterpassword, $user->password)) {
            // NOT Successs
            return response(['message' => 'Password incorrect!'], 403);
        }

    }
}
