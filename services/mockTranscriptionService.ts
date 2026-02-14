
// Mock transcription service to simulate API call
export const mockTranscribe = (audioUrl: string): Promise<string> => {
  console.log("Simulating transcription for:", audioUrl);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Large pothole reported on the main road near the city hospital. It is causing significant traffic delays.");
    }, 2000);
  });
};
