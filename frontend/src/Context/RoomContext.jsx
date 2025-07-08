import { createContext, useContext, useEffect, useState } from "react";
  
  const RoomContext = createContext();
  
  export const RoomProvider = ({ children }) => {
    const [room, setRoom] = useState()
    const [loading, setLoading] = useState(true)

   const loadData = async ()=>{
    try {
        const respons = await fetch('http://localhost:5000/room', {credentials:"include"});
        const hasil = await respons.json()
        console.log(hasil)
        if(respons.ok){
            setRoom(hasil)
        }
    } catch (error) {
           console.error(error)
    }finally{
        setLoading(false)
    }
  }
  useEffect(()=>{loadData()},[])
    return (
      <RoomContext.Provider value={{room, loading }}>
        {children}
      </RoomContext.Provider>
    );
  };
  
  
  export const useRoomContext = () => useContext(RoomContext);