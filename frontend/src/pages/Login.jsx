import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function SmartClassLogin() {
const navigate = useNavigate()
 const [form, setForm] = useState({
          email: "",
          password: "",
      })
  
    const [message, setMessage] = useState({pesan:"", tipe: ""});

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
      const respons = await fetch('http://localhost:5000/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify(form)
      });

      const hasil = await respons.json()
      console.log(respons)
      
      if(respons.ok){
          setTimeout(() => {
            navigate(hasil.redirectUrl)
          }, 1000);


            setForm({
                username:"",
                password: "",
            });
            setMessage({pesan: hasil.message, tipe: "success"})

      }else{
           setMessage({pesan: hasil.message, tipe:"failed"})
      }

    } catch (error) {
      setMessage({pesan: error, tipe: "failed"})
    }
  }

  return (
    <div className="min-h-screen flex">
  {/* Left side - Login Form */}
  <div className="flex-1 flex items-center justify-center bg-gray-50 px-8">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-teal-300 mb-2 font-roboto">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-sm">
          Enter your email and password to sign in
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {!(message.pesan == "")&&!(message.tipe == "") && (
          <div className={`border  ${message.tipe =="success"? "bg-green-200 border-green-200": "bg-red-200 border-red-200"}px-4 py-3 rounded-lg text-sm`}>
            <p className="flex justify-center">{message.pesan}</p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
            required
            value={form.email}
            onChange={(e) => {
              setForm((restOf) => ({ ...restOf, email: e.target.value }));
              if (message.pesan) setMessage({ message: "", tipe: "" });
            }}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Your password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
            required
            onChange={(e) => {
              setForm((restOf) => ({ ...restOf, password: e.target.value }));
              if (message.pesan) setMessage({ message: "", tipe: "" });
            }}
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-teal-400 hover:bg-teal-500 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 active:scale-95"
        >
          SIGN IN
        </button>
      </form>
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
            <h2 className="text-6xl font-light mb-4 drop-shadow-lg font-roboto">Smart Class</h2>
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