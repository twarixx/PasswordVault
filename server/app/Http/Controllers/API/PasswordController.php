<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Password;
use Illuminate\Encryption\Encrypter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $passwords = Auth::user()->passwords;

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
            'masterpassword' => 'required|string',
        ]);

        $this->checkIfPasswordAlreadyExists($validatedData['masterpassword'], $validatedData['password']);

        $this->checkMasterPassword($validatedData['masterpassword']);

        $validatedData['password'] = $this->encrypt($validatedData["masterpassword"], $validatedData['password']);

        $password = Password::create([
            'website' => $validatedData['website'] ,
            'password' => $validatedData['password'] ,
            'username' => $validatedData['username'],
            'user_id' => Auth::user()->id
        ]);

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
            'id' => 'required|int',
            'website' => 'required|string',
            'password' => 'required|unique:passwords',
            'username' => 'required|string',
            'masterpassword' => 'required|string'
        ]);

        $this->checkMasterPassword($validatedData['masterpassword'], $validatedData['password']);

        $validatedData = $this->encrypt($validatedData['masterpassword'], $validatedData);

        $password->update($validatedData);

        return response()->json($validatedData, 200);
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

    protected function decrypt($passwordData, $password)
    {
        $masterPasswordMd5Encoded = md5($password);

        $encrypter = new Encrypter($masterPasswordMd5Encoded, 'AES-256-CBC');

        return $encrypter->decryptString($passwordData);
    }

    protected function encrypt($masterpassword, $validatedData)
    {
        $masterPasswordBase64Encoded = md5($masterpassword);

        $encrypter = new Encrypter($masterPasswordBase64Encoded, 'AES-256-CBC');

        $validatedData = $encrypter->encryptString($validatedData);

        return $validatedData;
    }

    private function checkIfPasswordAlreadyExists($masterpassword, $password)
    {
        $savedEncryptedPasswords = Auth::user()->passwords;

        Auth::user()->passwords()->each(function (Password $encryptedPassword) use ($masterpassword, $password) {
            $plainPassword = $this->decrypt($encryptedPassword['password'], $masterpassword);

            if($plainPassword == $password) {
                throw new \Exception("password is already in use");
            }

        });
    }
}
