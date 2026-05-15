<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Telemetry extends Model
{
    use HasFactory;

    protected $fillable = [
        'agrobot_id',
        'nitrogen',
        'phosphorus',
        'potassium',
        'ph',
    ];

    public function agrobot()
    {
        return $this->belongsTo(Agrobot::class);
    }
}
