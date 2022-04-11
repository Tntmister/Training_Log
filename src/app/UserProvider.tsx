import React, { ReactNode, useEffect, useState } from "react"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import UserContext from "./UserContext"

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
    })

    return unsubscribe
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
