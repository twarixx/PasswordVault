<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response(Auth::user(), 200);
        }

        return response(["message"=> "Wrong username or password"], 401);
    }

    public function logout()
    {
       Auth::logout();

        return response(["message"=> 'logged out successfully']);
    }

    public function register(Request $request)
    {
        $request->validate([
            'username' => ['required'],
            'password' => ['required', 'size:12', "regex:/^([^\"!'\*\\]*)$/"],
            'email' => ['request', 'email', 'unique']
        ]);

        $user = User::create($request->all());

        Auth::login($user);

        return response($user, 200);
    }
}
