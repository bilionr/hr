<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'password', 'role_id'
    ];

    public function candidate()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
}
