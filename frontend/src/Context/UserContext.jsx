import { createContext, useContext, useEffect, useState } from "react";
  
  const UserContext = createContext();
  
  export const UserProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

   const loadData = async ()=>{
    try {
        const respons = await fetch('http://localhost:5000/user', {credentials:"include"});
        const hasil = await respons.json()
        console.log(hasil)
        if(respons.ok){
            setUser(hasil)
        }
    } catch (error) {
           console.error(error)
    }finally{
        setLoading(false)
    }
  }
  useEffect(()=>{loadData()},[])
    return (
      <UserContext.Provider value={{user, loading }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  
  export const useUserContext = () => useContext(UserContext);