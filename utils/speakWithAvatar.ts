type AvatarResponse = {
  result_url: string;
};

type SpeakWithAvatarParams = {
  text: string;
  presenterId: string;
  voiceId: string;
  bgColor: string;
};

export async function speakWithAvatar({
  text,
  presenterId,
  voiceId,
  bgColor,
}: SpeakWithAvatarParams): Promise<AvatarResponse> {
  const response = await fetch("/api/clips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      presenterId,
      voiceId,
      bgColor,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create talk: ${errorText}`);
  }

  const data = await response.json();

  if (!data.result_url) {
    throw new Error("No result URL in the response");
  }

  return data;
}
