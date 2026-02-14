
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoadReport } from '../types';
import { useVoice } from '../hooks/useVoice';
import AudioWaveform from '../components/AudioWaveform';
import { mockTranscribe } from '../services/mockTranscriptionService';

interface ReportScreenProps {
  onAddReport: (report: Omit<RoadReport, 'id'>) => Promise<void>;
}

const ReportScreen: React.FC<ReportScreenProps> = ({ onAddReport }) => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const { isRecording, startRecording, stopRecording, audioData, analyser } = useVoice();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleStopRecording = async () => {
    const { url, blob } = await stopRecording();
    if (blob) {
      setIsTranscribing(true);
      try {
        const transcribedText = await mockTranscribe(url);
        setNote(transcribedText);
      } catch (error) {
        console.error("Transcription error:", error);
      } finally {
        setIsTranscribing(false);
      }
    }
  };

  // Initialize camera
  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (err: any) {
      console.error("Camera access error:", err.message);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setPhoto(dataUrl);
        stopCamera();
      }
    }
  };

  // Location tracking
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error(`Location error: ${err.message}`)
      );
    }
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const newReport: Omit<RoadReport, 'id'> = {
        timestamp: Date.now(),
        latitude: location?.lat || 0,
        longitude: location?.lng || 0,
        photoUrl: photo || undefined,
        voiceUrl: audioData.url || undefined,
        note,
        status: 'Pending',
        locationName: 'Main St & 4th Ave' // Mocked geocoding
      };
      await onAddReport(newReport);
      navigate(`/confirmation/new`);
    } catch (error) {
      console.error("Error submitting report: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="p-4 border-b border-slate-100 flex items-center bg-white sticky top-0 z-10">
        <button onClick={() => { stopCamera(); navigate(-1); }} className="p-2 -ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="ml-2 text-xl font-bold text-slate-800">New Report</h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Photo Section */}
        <section>
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">1. Evidence Photo</label>
          <div className="relative aspect-video rounded-3xl bg-slate-100 overflow-hidden border-2 border-slate-100">
            {!photo && !stream ? (
              <div className="flex flex-col items-center justify-center h-full space-y-2">
                <button 
                  onClick={startCamera}
                  className="bg-blue-100 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-200 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Open Camera
                </button>
                <p className="text-xs text-slate-400">Please provide clear image of damage</p>
              </div>
            ) : stream && !photo ? (
              <div className="relative h-full w-full">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <button 
                  onClick={capturePhoto}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                </button>
              </div>
            ) : (
              <div className="relative h-full w-full">
                <img src={photo!} alt="Captured" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setPhoto(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </section>

        {/* Audio Section */}
        <section>
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">2. Voice Note (Optional)</label>
          <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <button 
              onClick={() => isRecording ? handleStopRecording() : startRecording()}
              className={`p-4 rounded-full transition-all ${isRecording ? 'bg-red-500 animate-pulse text-white' : 'bg-blue-100 text-blue-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7V4m0 0H8m4 0h4m-4 8a3 3 0 013-3v-2a3 3 0 00-3-3H9a3 3 0 00-3 3v2a3 3 0 013 3z" />
              </svg>
            </button>
            <div className="flex-1 h-12">
              {isRecording && analyser ? (
                <AudioWaveform analyser={analyser} />
              ) : (
                <div className="flex items-center h-full">
                   <p className="text-sm font-medium text-slate-700">
                    {isTranscribing ? 'Transcribing note...' : audioData.url ? 'Voice note captured' : 'Tap to record a voice note'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section>
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">3. Location</label>
          <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm text-slate-800 font-medium truncate">
                {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Fetching location...'}
              </p>
              <p className="text-xs text-slate-400">Captured automatically via GPS</p>
            </div>
          </div>
        </section>

        {/* Note Section */}
        <section>
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">4. Description</label>
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Describe the issue or record a voice note..."
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={4}
          />
        </section>

        {/* Submit Action */}
        <div className="pt-4 pb-12">
          <button 
            disabled={!photo || isSubmitting || isTranscribing}
            onClick={handleSubmit}
            className={`w-full py-4 rounded-3xl text-white font-poppins font-semibold text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center ${
              !photo || isSubmitting || isTranscribing ? 'bg-slate-300 shadow-none cursor-not-allowed' : 'bg-blue-600 shadow-blue-200 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Submit Report'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportScreen;
