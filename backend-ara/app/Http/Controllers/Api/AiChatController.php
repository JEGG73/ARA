<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Telemetry;
use App\Models\AiConsultation;
use Illuminate\Support\Facades\Http;

class AiChatController extends Controller
{
    public function ask(Request $request)
    {
        $validatedData = $request->validate([
            'prompt' => 'required|string|max:500',
            'agrobot_id' => 'required|exists:agrobots,id',
        ]);

        $agrobotId = $validatedData['agrobot_id'];
        $userPrompt = $validatedData['prompt'];

        $telemetry = Telemetry::where('agrobot_id', $agrobotId)->latest()->first();

        if (!$telemetry) {
            return response()->json([
                'message' => 'El Agrobot seleccionado aun no cuenta con lecturas de suelo registradas para contextualizar la IA.'
            ], 400);
        }

        $apiKey = env('GEMINI_API_KEY');

        $historyLogs = AiConsultation::where('user_id', $request->user()->id)
            ->latest()->take(5)->get()->reverse();

        $contents = [];
        foreach ($historyLogs as $log) {
            $contents[] = [
                "role" => "user",
                "parts" => [["text" => $log->prompt]]
            ];
            $contents[] = [
                "role" => "model",
                "parts" => [["text" => $log->response]]
            ];
        }

        $contents[] = [
            "role" => "user",
            "parts" => [["text" => $userPrompt]]
        ];

        $systemContext = "Eres 'TerraMind IA', el asesor agronómico de ARA Web. El usuario ya te conoce, 
        por lo que está **estrictamente PROHIBIDO que te presentes o des introducciones repetitivas**. 
        Ve directo a responder la duda de forma natural. Contexto del suelo actual: N: 
            {$telemetry->nitrogen}, P: {$telemetry->phosphorus}, K: {$telemetry->potassium}, pH: {$telemetry->ph}.";

        $payload = [
            "systemInstruction" => [
                "parts" => [["text" => $systemContext]]
            ],
            "contents" => $contents
        ];

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json'
            ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $apiKey, $payload);

            if ($response->successful()) {
                $geminiData = $response->json();
                $aiResponseText = $geminiData['candidates'][0]['content']['parts'][0]['text'];

                $consultation = AiConsultation::create([
                    'user_id' => $request->user()->id,
                    'prompt' => $userPrompt,
                    'response' => $aiResponseText
                ]);

                return response()->json([
                    'id_consulta' => $consultation->id,
                    'pregunta' => $userPrompt,
                    'respuesta_ia' => $aiResponseText
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Error al comunicarse con el cerebro de TerraMind IA.',
                    'details' => $response->json()
                ], 502);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error interno en el servidor.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
