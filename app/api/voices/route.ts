import { NextResponse } from "next/server";

type ElevenLabsVoice = {
  voice_id: string;
  name: string;
  samples: null;
  category: string;
  fine_tuning: {
    is_allowed_to_fine_tune: boolean;
    state: Record<string, string>;
    verification_failures: any[];
    verification_attempts_count: number;
    manual_verification_requested: boolean;
    language: string;
    progress: Record<string, any>;
    message: Record<string, string>;
    dataset_duration_seconds: null;
    verification_attempts: null;
    slice_ids: null;
    manual_verification: null;
  };
  labels: {
    accent: string;
    description: string;
    age: string;
    gender: string;
    use_case: string;
  };
  description: null;
  preview_url: string;
  available_for_tiers: any[];
  settings: null;
  sharing: null;
  high_quality_base_model_ids: string[];
  safety_control: null;
  voice_verification: {
    requires_verification: boolean;
    is_verified: boolean;
    verification_failures: any[];
    verification_attempts_count: number;
    language: null;
    verification_attempts: null;
  };
  permission_on_resource: null;
  is_legacy: boolean;
  is_mixed: boolean;
};

type ElevenLabsResponse = {
  voices: ElevenLabsVoice[];
};

export async function GET() {
  try {
    const response = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch voices: ${response.statusText}`);
    }

    const data: ElevenLabsResponse = await response.json();

    const transformedVoices = data.voices.map(({ name, voice_id }) => ({
      name,
      voice_id,
    }));

    return NextResponse.json({ voices: transformedVoices });
  } catch (error) {
    console.error("Error fetching voices:", error);

    return NextResponse.json(
      { error: "Failed to fetch voices" },
      { status: 500 }
    );
  }
}
