<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Telemetry;
use App\Models\Agrobot;
use Illuminate\Http\Request;

class HardwareController extends Controller
{
    public function storeTelemetry(Request $request)
    {
        $validatedData = $request->validate([
            'mac_address' => 'required|string|exists:agrobots,mac_address',
            'nitrogen' => 'required|numeric|min:0',
            'phosphorus' => 'required|numeric|min:0',
            'potassium' => 'required|numeric|min:0',
        ]);

        $agrobot = Agrobot::where('mac_address', $validatedData['mac_address'])->first();

        Telemetry::create([
            'agrobot_id' => $agrobot->id,
            'nitrogen' => $validatedData['nitrogen'],
            'phosphorus' => $validatedData['phosphorus'],
            'potassium' => $validatedData['potassium'],
        ]);

        return response()->json([
            'message' => 'Datos registrados exitosamente'
        ], 201);
    }

    public function getTelemetry($id)
    {
        $datos = Telemetry::where('agrobot_id', $id)
            ->latest()
            ->take(10)
            ->get();

        if ($datos->isEmpty()) {
            return response()->json([
                'message' => 'Aún no hay lecturas registradas para este Agrobot'
            ], 404);
        }

        return response()->json([
            'message' => 'Historial de telemetría recuperado',
            'data' => $datos
        ], 200);
    }

}
