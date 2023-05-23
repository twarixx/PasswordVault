<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
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
            'firstname' => 'max:255',
            'lastname' => 'max:255',
            'zipcode' => 'max:255',
            'city' => 'max:255',
            'username' => 'required',
            'email' => 'required|email',
            'password' => ['required', Password::min(12)->mixedCase()->numbers()->uncompromised()->symbols()],
            'confirmpassword' => 'required_with:password|same:password',
        ]);

        $user = User::create($request->all());

        Auth::login($user);

        return response($user);
    }
}
