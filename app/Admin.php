<?php

namespace App;

use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;


class Admin extends User {

    use Notifiable;
    protected $table = 'admins';
    protected $primaryKey = 'user';

    protected $fillable = array('id', 'user', 'name', 'password', 'owner');
    protected $hidden = array('password', 'remember_token');


    public function getAuthIdentifier()
    {
        return $this->name;
    }

    public function getAuthIdentifierName()
    {
        return "name";
    }
}
