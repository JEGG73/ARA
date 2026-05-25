<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Agrobot extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'mac_address',
        'name',
        'is_active'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function telemetries(): HasMany
    {
        return $this->hasMany(Telemetry::class);
    }
}
