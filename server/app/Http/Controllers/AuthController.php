<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function authenticate(Request $request): \Illuminate\Contracts\Foundation\Application|ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Respons
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
    }

    public function register(Request $request) {

        $user = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
            'firstname'=> ['required'],
            'lastname' => ['required'],
        ]);

    }
}
