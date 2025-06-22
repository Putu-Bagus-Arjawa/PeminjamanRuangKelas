import React, { useState } from 'react';

export default function SmartClassLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulasi validasi login
    const validEmail = 'user@example.com';
    const validPassword = 'password123';
    
    if (email !== validEmail || password !== validPassword) {
      setError('Username atau password salah. Silakan coba lagi.');
      return;
    }
    
    // Jika login berhasil
    setError('');
    console.log('Login berhasil:', { email, password, rememberMe });
    alert('Login berhasil!');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-teal-300 mb-2" style={{fontFamily: 'Roboto, sans-serif'}}>Welcome Back</h1>
            <p className="text-gray-500 text-sm" style={{fontFamily: 'Roboto, sans-serif'}}>Enter your email and password to sign in</p>
          </div>

          <div className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(''); // Clear error when user starts typing
                }}
                placeholder="Your email address"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(''); // Clear error when user starts typing
                }}
                placeholder="Your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    rememberMe ? 'bg-teal-400' : 'bg-gray-300'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                      rememberMe ? 'translate-x-6' : 'translate-x-0.5'
                    } translate-y-0.5`}></div>
                  </div>
                </div>
                <span className="ml-3 text-sm text-gray-600">Remember me</span>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-teal-400 hover:bg-teal-500 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 active:scale-95"
            >
              SIGN IN
            </button>


            </div>
        </div>
      </div>

      {/* Right side - Gradient Background */}
      <div className="flex-1 bg-gradient-to-br from-teal-300 via-teal-400 to-emerald-400 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white bg-opacity-15 rounded-full blur-lg"></div>
          <div className="absolute bottom-32 left-16 w-40 h-40 bg-white bg-opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-white bg-opacity-20 rounded-full blur-md"></div>
        </div>
        
        {/* Main content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-6xl font-light mb-4 drop-shadow-lg">Smart Class</h2>
            <div className="w-24 h-1 bg-white bg-opacity-30 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Additional decorative lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-full h-px bg-white bg-opacity-20 transform -rotate-12"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-white bg-opacity-15 transform rotate-12"></div>
        </div>
      </div>
    </div>
  );
}