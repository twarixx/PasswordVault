<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Password;
use App\Models\User;
use Illuminate\Encryption\Encrypter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mockery\Generator\StringManipulation\Pass\Pass;

class PasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get all passwords
        $passwords = Password::with('user')->where('App\Models\User', '=', Auth::user()->id)->get();
        //return JSON response with the passwords

        return response($passwords);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'website' => 'required|string',
            'password' => 'required|unique:passwords',
            'username' => 'required|string',
            'category' => 'string',
            'masterpassword' => 'required|string',
        ]);

        $this->checkMasterPassword($validatedData['masterpassword']);

        $validatedData = $this->encrypt($validatedData);

        $password = Password::create($validatedData);

        return response()->json($password);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|int',
            'masterpassword' => 'required|string',
        ]);

        $passwordData = Password::find($validatedData['id']);

        $this->checkMasterPassword($validatedData['masterpassword']);

        $password = $this->decrypt($passwordData, $validatedData);

        return response()->json($password);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Password $password)
    {
        $validatedData = $request->validate([
            'website' => 'required|string',
            'password' => 'required|unique:passwords',
            'username' => 'required|string',
            'category' => 'string',
            'masterpassword' => 'required|string'
        ]);

        $masterPasswordBase64Encoded = base64_encode($validatedData['masterpassword']);

        $encrypter = new Encrypter($masterPasswordBase64Encoded);

        $password->update($validatedData);

        return response()->json($masterPasswordBase64Encoded, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Password $password)
    {
        $password->delete();

        return response()->json(null, 204);
    }

    protected function checkMasterPassword($masterPassword) {

        $user = Auth::user();
        $hasher = app('hash');
        if (!$hasher->check($masterPassword, $user->password)) {
            // NOT Success
            return response('password is incorrect');
        }
    }

    protected function decrypt($passwordData, $validatedData)
    {
        $masterPasswordBase64Encoded = md5($validatedData['masterpassword']);

        $encrypter = new Encrypter($masterPasswordBase64Encoded, 'AES-256-CBC');

        $validatedData["password"] = $encrypter->decrypt($passwordData["password"]);

        return $validatedData;
    }

    protected function encrypt($validatedData)
    {
        $masterPasswordBase64Encoded = md5($validatedData['masterpassword']);

        $encrypter = new Encrypter($masterPasswordBase64Encoded, 'AES-256-CBC');

        $validatedData["password"] = $encrypter->decrypt($validatedData["password"]);

        return $validatedData;
    }
}
