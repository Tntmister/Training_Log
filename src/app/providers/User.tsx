import React, { createContext, ReactNode, useEffect, useState } from "react"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { Alert, ToastAndroid } from "react-native"
import { User } from "../lib/types/user"

export const UserContext = createContext<FirebaseAuthTypes.User | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      const user = (
        await firestore().doc(`users/${firebaseUser?.uid}`).get()
      ).data() as User
      if (user.bannedUntil == -1) {
        ToastAndroid.show("You are permanently banned.", ToastAndroid.LONG)
      } else if (user.bannedUntil > Date.now() || user.bannedUntil == -1) {
        ToastAndroid.show(
          `You are banned until ${new Date(
            user.bannedUntil
          ).toLocaleDateString()}`,
          ToastAndroid.LONG
        )
      } else {
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
      }
    })

    return unsubscribe
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
