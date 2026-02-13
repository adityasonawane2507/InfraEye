
import React, { useState, useEffect, useRef } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'info' | 'otp'>('info');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+91 ',
  });
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'pending' | 'granted' | 'denied'>('pending');
  
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationStatus('granted'),
        () => setLocationStatus('denied'),
        { enableHighAccuracy: true }
      );
    } else {
      setLocationStatus('denied');
    }
  }, []);

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Prevent deleting the prefix
    if (!val.startsWith('+91 ')) {
      setFormData({ ...formData, phone: '+91 ' });
    } else {
      setFormData({ ...formData, phone: val });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-72 bg-blue-600 rounded-b-[4rem] -z-0">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
      </div>
      
      <div className="flex-1 z-10 px-8 flex flex-col pt-12">
        <div className="mb-8 text-center text-white">
          <div className="inline-block p-4 bg-white/20 rounded-3xl backdrop-blur-md mb-4 shadow-lg border border-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-poppins font-bold tracking-tight">InfraEye</h1>
          <p className="opacity-80 text-xs mt-1">Unified Infrastructure Access</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 p-8 flex-1 flex flex-col mb-6">
          {step === 'info' ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Access</h2>
              <p className="text-slate-500 text-sm mb-6">Enter your details to join the network</p>

              <form onSubmit={handleInfoSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700 text-sm"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-poppins font-semibold py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center justify-center mt-6"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'Continue'}
                </button>
              </form>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col h-full">
              <button onClick={() => setStep('info')} className="mb-4 text-slate-400 hover:text-slate-600 flex items-center text-xs font-bold uppercase">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Edit Info
              </button>
              
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Verify Phone</h2>
              <p className="text-slate-500 text-sm mb-8">Enter code sent to {formData.phone}</p>

              <div className="flex justify-between mb-8">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={otpRefs[i]}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-14 h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl text-center text-2xl font-bold text-blue-600 focus:border-blue-500 focus:bg-white outline-none transition-all"
                  />
                ))}
              </div>

              <div className="flex-1"></div>

              <button 
                onClick={handleVerify}
                disabled={otp.some(d => !d) || isLoading}
                className={`w-full py-4 rounded-2xl font-poppins font-semibold shadow-lg transition-all active:scale-95 flex items-center justify-center ${
                  otp.some(d => !d) || isLoading 
                  ? 'bg-slate-200 text-slate-400 shadow-none' 
                  : 'bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Secure Login'}
              </button>
              
              <p className="text-center text-xs text-slate-400 mt-6">
                Didn't receive code? <span className="text-blue-600 font-bold cursor-pointer">Resend</span>
              </p>
            </div>
          )}

          {/* Location Status Indicator - "Login Access" Feedback */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              locationStatus === 'granted' ? 'bg-green-50 text-green-600' : 
              locationStatus === 'denied' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${
                locationStatus === 'granted' ? 'bg-green-500 animate-pulse' : 
                locationStatus === 'denied' ? 'bg-red-500' : 'bg-slate-300'
              }`}></div>
              <span>
                {locationStatus === 'granted' ? 'Location Access Secured' : 
                 locationStatus === 'denied' ? 'Location Access Denied' : 'Calibrating Sensors...'}
              </span>
            </div>
          </div>
        </div>

        <div className="py-4 text-center text-slate-400 text-[10px] uppercase tracking-widest font-bold">
          Empowering Communities through Data
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
