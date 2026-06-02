<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agrobot;
use Illuminate\Http\Request;

class AgrobotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $agrobots = Agrobot::with('user')->get();
        return response()->json($agrobots, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'mac_address' => 'required|string|unique:agrobots,mac_address',
            'name' => 'nullable|string|max:255',
            'is_active' => 'boolean'
        ]);

        $validatedData['user_id'] = $request->user()->id;

        $agrobot = Agrobot::create($validatedData);

        return response()->json([
            'message' => 'Agrobot registrado exitosamente',
            'data' => $agrobot
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $agrobot = Agrobot::with('telemetries')->find($id);

        if (!$agrobot) {
            return response()->json([
                'message' => 'Agrobot no encontrado'
            ], 404);
        }

        return response()->json($agrobot, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $agrobot = Agrobot::find($id);

        if (!$agrobot) {
            return response()->json([
                'message' => 'Agrobot no encontrado'
            ], 404);
        }

        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'is_active' => 'boolean'
        ]);

        $agrobot->update($validatedData);

        return response()->json([
            'message' => 'Agrobot actualizado correctamente',
            'data' => $agrobot
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $agrobot = Agrobot::find($id);

        if (!$agrobot) {
            return response()->json([
                'message' => 'Agrobot no encontrado'
            ], 404);
        }

        $agrobot->delete();

        return response()->json([
            'message' => 'Agrobot eliminado correctamente'
        ], 200);
    }
}
