
const Register = () => {
  return (
    <div className='flex h-screen w-screen justify-center items-center'>
        <form action="" className='flex flex-col w-1/3 h-1/2 rounded-2xl shadow-xl px-12 py-6 gap-6'>
            <h2 className='text-center text-2xl'>Register</h2>
            <div className='flex gap-4'>
                <div className='flex flex-col'>
                    <label>Nama :</label>
                    <input type="text" placeholder='Masukkan nama' className='focus:outline-none border-[0.5px] p-1 rounded-lg'/>
                </div>
                <div className='flex flex-col'>
                    <label>Password :</label>
                    <input type="password" placeholder='Masukkan password' className='focus:outline-none border-[0.5px] p-1 rounded-lg'/>
                </div>
            </div>
            <div className='flex gap-4'>
                <div className='flex flex-col'>
                    <label>Email :</label>
                    <input type="text" placeholder='exp kucing@unud.ac.id' className='focus:outline-none border-[0.5px] p-1 rounded-lg'/>
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
    </div>
  )
}

export default Register
