<?php

namespace App\Http\Controllers\API;

use App\Models\Password;
use Illuminate\Http\Request;

use Illuminate\Validation\Rule;

class PasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get all passwords
        $passwords = Password::all();
        //return JSON response with the passwords
        return response()->json($passwords);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'url' => 'required|string',
            'password' => 'required|unique:passwords',
            'username' => 'required|string',
            'category' => 'required|string',
        ]);

        $password = Password::create($validatedData);

        return response()->json($password, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Password $password)
    {
        // return JSON response with the password
        return response()->json($password);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Password $password)
    {
        $validatedData = $request->validate([
            'url' => 'required|string',
            'password' => 'required|string',
            'username' => 'required|string',
            'category' => 'required|string',
        ]);

        $password->update($validatedData);

        return response()->json($password, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Password $password)
    {
        $password->delete();

        return response()->json(null, 204);
    }
}