import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { Alert, ToastAndroid } from "react-native"
import { User } from "../lib/types/user"
import { langs, langStrings, ThemeContext, useTheme } from "./Theme"

export const UserContext = createContext<FirebaseAuthTypes.User | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)

  useEffect(() => {
    return auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = (
          await firestore().doc(`users/${firebaseUser?.uid}`).get()
        ).data() as User
        if (userDoc.bannedUntil == -1) {
          ToastAndroid.show(STRS.auth.permenentlyBanned, ToastAndroid.LONG)
        } else if (
          userDoc.bannedUntil > Date.now() ||
          userDoc.bannedUntil == -1
        ) {
          ToastAndroid.show(
            STRS.auth.bannedUntil(
              new Date(userDoc.bannedUntil).toLocaleDateString()
            ),
            ToastAndroid.LONG
          )
        } else {
          setUser(firebaseUser)
          if (!firebaseUser.emailVerified) {
            Alert.alert(
              STRS.auth.confirmAccountHeader,
              STRS.auth.confirmAccountContent(firebaseUser.email!),
              [
                {
                  text: STRS.auth.resendEmail,
                  onPress: () => firebaseUser.sendEmailVerification()
                },
                {
                  text: STRS.ok
                }
              ]
            )
          }
        }
      }
    })
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
