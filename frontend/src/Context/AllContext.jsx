import React from 'react'
import { AuthProvider } from './AuthContext'
import { UserProvider } from './UserContext'
import { RoomProvider } from './RoomContext'

const AllContext = ({children}) => {
  return (
    <AuthProvider>
      <UserProvider>
        <RoomProvider>
            {children}
        </RoomProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default AllContext
