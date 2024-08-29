import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const audioFile = new File([audioBlob], "recording.wav", {
    type: "audio/wav",
  });

  const response = await openai.audio.transcriptions.create({
    model: "whisper-1",
    file: audioFile,
  });

  return response.text;
}
