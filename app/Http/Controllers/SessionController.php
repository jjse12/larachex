<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class SessionController extends Controller
{
    use AuthenticatesUsers;

    public function __construct(){
        $this->middleware('guest')->except('destroy');
    }

    public function username()
    {
        return 'user';
    }


    public function create(){
        if (auth()->check())
            return redirect()->route('home');
        return view('layouts.login');
    }

    public function store()
    {

        $user = \App\Admin::where([['user', '=', request('user')], ['password', '=', request('password')]])->first();
        if ($user != null)
            auth()->login($user);


        if (!auth()->check())
        /*

        if (!auth()->attempt([

            'user' => request('user'),
            'password' => request('password')

        ])){
         */
        {
            return redirect("/login")->withErrors([
                'message' => 'El usuario y la contraseña no coinciden con ningún registro en la base de datos'
            ]);
        }

        return redirect()->route('home');
    }

    public function destroy(){
        auth()->logout();
        return redirect()->route('home');
    }
}
