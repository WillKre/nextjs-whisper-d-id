let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];

export const startRecording = (
  setRecording: (isRecording: boolean) => void,
  onTranscription: (audioBlob: Blob) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          audioChunks = [];
          onTranscription(audioBlob);
        };
        mediaRecorder.start();
        setRecording(true);
        resolve();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
        reject(
          new Error(
            "Failed to access microphone. Please check your permissions."
          )
        );
      });
  });
};

export const stopRecording = (
  setRecording: (isRecording: boolean) => void
): void => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    setRecording(false);
  }
};
