import React, { createContext, ReactNode, useEffect, useState } from "react"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { Alert } from "react-native"

export const UserContext = createContext<FirebaseAuthTypes.User | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser && !firebaseUser.emailVerified) {
        Alert.alert(
          "Confirm Account",
          "A confirmation email address has been sent to your email.",
          [
            {
              text: "Resend email",
              onPress: () => firebaseUser.sendEmailVerification()
            },
            {
              text: "Ok"
            }
          ]
        )
      }
    })

    return unsubscribe
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
