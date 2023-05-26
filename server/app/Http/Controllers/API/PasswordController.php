<?php

namespace App\Http\Controllers\API;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Http\Resources\PasswordResource;
use App\Models\Category;
use App\Models\Password;
use App\Models\User;
use Illuminate\Encryption\Encrypter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mockery\Generator\StringManipulation\Pass\Pass;
use mysql_xdevapi\Exception;

class PasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
//        $passwords = Auth::user()->passwords;

        $userPasswords = User::find(Auth::user()->id)->passwords;

        return PasswordResource::collection($userPasswords);
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
            'masterpassword' => 'required|string'
        ]);

        if (Auth::user()->role() === Role::FREE && Auth::user()->passwords->count() >= 50) {
            throw new \Exception("Your free account has limited the maximum allowed of 50 passwords");
        }

        $this->checkMasterPassword($validatedData['masterpassword']);

        $this->checkIfPasswordAlreadyExists($validatedData['masterpassword'], $validatedData['password']);

        $validatedData['password'] = $this->encrypt($validatedData["masterpassword"], $validatedData['password']);

        $password = Password::create([
            'website' => $validatedData['website'] ,
            'password' => $validatedData['password'] ,
            'username' => $validatedData['username'],
            'user_id' => Auth::user()->id,
            'category_id' => $validatedData['category'] ?? null
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

        $passwordData->password = $this->decrypt($passwordData->password, $validatedData["masterpassword"]);

        return PasswordResource::collection($passwordData);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|int',
            'website' => 'required|string',
            'password' => 'required|unique:passwords',
            'confirmpassword' => 'required|same:password',
            'username' => 'required|string',
            'masterpassword' => 'required|string'
        ]);

        $password = Password::find($validatedData['id']);

        $this->checkMasterPassword($validatedData['masterpassword']);

        if ($request->passwordchanged == 'true'){
            $this->checkIfPasswordAlreadyExists($validatedData['masterpassword'], $validatedData['password']);
        }

        $validatedData['password'] = $this->encrypt($validatedData['masterpassword'], $validatedData['password']);

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
            throw new \Exception("Masterpassword incorrect");
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
                throw new \Exception("Password is already in use");
            }
        });
    }

    public function search(Request $request)
    {
        $validatedData = $request->validate([
            'query' => 'required|string',
        ]);

        $result = Password::where('user_id', Auth::user()->id)
        ->where('website', 'LIKE', '%'.$validatedData['query'].'%')
        ->orWhere('username', 'LIKE', '%'.$validatedData['query'].'%')
        ->get();

        return response($result);
    }
}
