<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Password;
use Illuminate\Encryption\Encrypter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
<<<<<<< HEAD
use Mockery\Generator\StringManipulation\Pass\Pass;
=======
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5

class PasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
<<<<<<< HEAD
        $passwords = Auth::user()->passwords;

        return response($passwords);
=======
        $user = Auth::User();
        //get all passwords
        $passwords = Password::findOrFail($user);
        //return JSON response with the passwords
        return response()->json($passwords);
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5
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
<<<<<<< HEAD
=======
            'category' => 'string',
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5
            'masterpassword' => 'required|string',
        ]);

        $this->checkMasterPassword($validatedData['masterpassword']);

<<<<<<< HEAD
        $this->checkIfPasswordAlreadyExists($validatedData['masterpassword'], $validatedData['password']);

        $validatedData['password'] = $this->encrypt($validatedData["masterpassword"], $validatedData['password']);

        $password = Password::create([
            'website' => $validatedData['website'] ,
            'password' => $validatedData['password'] ,
            'username' => $validatedData['username'],
            'user_id' => Auth::user()->id
        ]);
=======
        $validatedData = $this->encrypt($validatedData);

        $password = Password::create($validatedData);
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5

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
<<<<<<< HEAD
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|int',
            'website' => 'required|string',
            'password' => 'required|unique:passwords',
            'username' => 'required|string',
            'masterpassword' => 'required|string'
        ]);

        $password = Password::find($validatedData['id']);

        $this->checkMasterPassword($validatedData['masterpassword']);

        $this->checkIfPasswordAlreadyExists($validatedData['masterpassword'], $validatedData['password']);

        $validatedData['password'] = $this->encrypt($validatedData['masterpassword'], $validatedData['password']);

        $password->update($validatedData);

        return response()->json($validatedData, 200);
=======
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
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5
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
<<<<<<< HEAD
            throw new \Exception("masterpassword incorrect");
        }
    }

    protected function decrypt($passwordData, $password)
    {
        $masterPasswordMd5Encoded = md5($password);

        $encrypter = new Encrypter($masterPasswordMd5Encoded, 'AES-256-CBC');

        return $encrypter->decryptString($passwordData);
    }

    protected function encrypt($masterpassword, $password)
    {
        $masterPasswordBase64Encoded = md5($masterpassword);

        $encrypter = new Encrypter($masterPasswordBase64Encoded, 'AES-256-CBC');

        $password = $encrypter->encryptString($password);

        return $password;
    }

    private function checkIfPasswordAlreadyExists($masterpassword, $password)
    {
        Auth::user()->passwords()->each(function (Password $encryptedPassword) use ($masterpassword, $password) {
            $plainPassword = $this->decrypt($encryptedPassword['password'], $masterpassword);
            if($plainPassword == $password) {
                throw new \Exception("password is already in use");
            }
        });
=======
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
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5
    }
}
