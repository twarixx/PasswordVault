<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Password;
use App\Models\Role;

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
        $validated = $request->validate([
            'username' => 'required',
            'email' => 'required|email',
            'password' => ['required', Password::min(12)->mixedCase()->numbers()->uncompromised()->symbols()],
            'confirmpassword' => 'required_with:password|same:password',
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => \App\Enums\Role::FREE,
        ]);

        Auth::login($user);

        return response($user);
    }
}
