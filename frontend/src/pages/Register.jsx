import { useState } from "react";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
    })

    const [message, setMessage] = useState({pesan:"", tipe: ""});

    const handleSubmit  = async(e)=>{
            e.preventDefault()
            setMessage({message: "", tipe:""})

            try {
            const respons = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
             });

             const hasil = await respons.json()
             console.log(hasil)

             if(respons.ok){
                 setForm({
                    name: "",
                    email: "",
                    password: "",
                    role: "USER"
                });
                setMessage({pesan: hasil.message, tipe: "success"})
             }else{
                setMessage({pesan: hasil.message, tipe: "failed"})
             }
            } catch (error) {
                setMessage({pesan: error, tipe: "failed"})
            }
    }
    return (
    <div className='flex h-screen w-screen justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col w-1/3 h-1/2 rounded-2xl shadow-xl px-12 py-6 gap-6'>
            <h2 className='text-center text-2xl'>Register</h2>
            <div className='flex gap-4'>
                <div className='flex flex-col'>
                    <label>Nama :</label>
                    <input 
                        type="text" 
                        placeholder='Masukkan nama' 
                        className='focus:outline-none border-[0.5px] p-1 rounded-lg'
                        value={form.name}
                        onChange={(e)=>{
                            setForm(restOf=> ({...restOf, name: e.target.value }))
                             if (message.message) setMessage({message:"", type: ""})
                        }}
                    />
                </div>
                <div className='flex flex-col'>
                    <label>Password :</label>
                    <input 
                        type="password" 
                        placeholder='Masukkan password' className='focus:outline-none border-[0.5px] p-1 rounded-lg'
                        value={form.password}
                        onChange={(e)=>{
                            setForm(restOf=> ({...restOf, password: e.target.value }))
                             if (message.message) setMessage({message:"", type: ""})
                        }}
                    />
                </div>
            </div>
            <div className='flex gap-4'>
                <div className='flex flex-col'>
                    <label>Email :</label>
                    <input 
                        type="text" 
                        placeholder='exp kucing@unud.ac.id' className='focus:outline-none border-[0.5px] p-1 rounded-lg'
                        value={form.email}
                        onChange={(e)=>{
                            setForm(restOf=> ({...restOf, email: e.target.value }))
                             if (message.message) setMessage({message:"", type: ""})
                        }}
                    />
                </div>
                <div className='flex flex-col'>
                    <label>Role :</label>
                    <select name="" id="" className='focus:outline-none border-[0.5px] p-1 rounded-lg'>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
            </div>
            <button type="submit" className='rounded-2xl text-[#fff] px-4 py-2 bg-[#20d6cd] hover:bg-[#bef3e6] hover:text-black'>Submit</button>
        </form>
        {!(message.pesan == "")&&!(message.tipe == "") && (
          <div className={`border  ${message.tipe =="success"? "bg-green-200 border-green-300": "bg-red-200 border-red-300"} px-8 py-4 rounded-lg text-sm absolute right-4 bottom-8 shadow-lg text-blue-950`}>
            <p className="flex justify-center">{message.pesan}</p>
          </div>
        )}
    </div>
  )
}

export default Register
