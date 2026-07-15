<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'department', 'description', 'is_active'
    ];

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
