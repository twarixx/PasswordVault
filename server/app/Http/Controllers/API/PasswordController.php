<?php

namespace App\Http\Controllers\API;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Models\Password;
use Illuminate\Encryption\Encrypter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
<<<<<<< HEAD
=======
use Mockery\Generator\StringManipulation\Pass\Pass;
use mysql_xdevapi\Exception;
>>>>>>> def6cfa4f9dbd01185f9c809a98d2deb38cf42c4

class PasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
<<<<<<< HEAD
        $passwords = Auth::user()->passwords;
=======
        $passwords = Auth::user()->passwords->count();
>>>>>>> def6cfa4f9dbd01185f9c809a98d2deb38cf42c4

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

        if (Auth::user()->role() === Role::FREE && Auth::user()->passwords->count() >= 50) {
            throw new \Exception("Your free account has limited the maximum allowed of 50 passwords");
        }

        $this->checkMasterPassword($validatedData['masterpassword']);

        $validatedData = $this->encrypt($validatedData);

<<<<<<< HEAD
=======
        $validatedData['password'] = $this->encrypt($validatedData["masterpassword"], $validatedData['password']);

>>>>>>> def6cfa4f9dbd01185f9c809a98d2deb38cf42c4
        $password = Password::create([
            'website' => $validatedData['website'] ,
            'password' => $validatedData['password'] ,
            'username' => $validatedData['username'],
            'category' => $validatedData['category'],
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

        $passwordData->password = $this->decrypt($passwordData->password, $validatedData["masterpassword"]);

        return response()->json($passwordData);
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
            'confirmpassword' => 'required|same:password',
            'username' => 'required|string',
            'category' => 'string',
            'masterpassword' => 'required|string'
        ]);

<<<<<<< HEAD
        $masterPasswordBase64Encoded = base64_encode($validatedData['masterpassword']);
=======
        $password = Password::find($validatedData['id']);

        $this->checkMasterPassword($validatedData['masterpassword']);

        if ($request->passwordchanged == 'true'){
            $this->checkIfPasswordAlreadyExists($validatedData['masterpassword'], $validatedData['password']);
        }
>>>>>>> def6cfa4f9dbd01185f9c809a98d2deb38cf42c4

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
<<<<<<< HEAD
            return response('password is incorrect');
=======
            throw new \Exception("Masterpassword incorrect");
>>>>>>> def6cfa4f9dbd01185f9c809a98d2deb38cf42c4
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

<<<<<<< HEAD
        $validatedData["password"] = $encrypter->encrypt($validatedData["password"]);

        return $validatedData;
=======
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
>>>>>>> def6cfa4f9dbd01185f9c809a98d2deb38cf42c4
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
