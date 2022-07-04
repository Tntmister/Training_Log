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
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      const user = (
        await firestore().doc(`users/${firebaseUser?.uid}`).get()
      ).data() as User
      if (user.bannedUntil == -1) {
        ToastAndroid.show(STRS.auth.permenentlyBanned, ToastAndroid.LONG)
      } else if (user.bannedUntil > Date.now() || user.bannedUntil == -1) {
        ToastAndroid.show(
          STRS.auth.bannedUntil(
            new Date(user.bannedUntil).toLocaleDateString()
          ),
          ToastAndroid.LONG
        )
      } else {
        setUser(firebaseUser)
        if (firebaseUser && !firebaseUser.emailVerified) {
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
    })

    return unsubscribe
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
