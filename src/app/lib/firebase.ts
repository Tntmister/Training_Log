import auth from "@react-native-firebase/auth"
import { FirebaseError } from "@firebase/util"
import { ToastAndroid } from "react-native"

export async function login(email: string, password: string) {
  if (email != "" && password != "") {
    try {
      await auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      switch ((error as FirebaseError).code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          ToastAndroid.show("Invalid Credentials!", ToastAndroid.SHORT)
          break
        case "auth/invalid-email":
          ToastAndroid.show("Invalid Email!", ToastAndroid.SHORT)
          break
        default:
          console.log(error)
          ToastAndroid.show("Unknown Error", ToastAndroid.LONG)
          break
      }
    }
  }
}

export async function register(
  email: string,
  password: string,
  username: string
) {
  if (email != "" && password != "" && username != "") {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user.sendEmailVerification()
          result.user.updateProfile({
            displayName: username
          })
        })
    } catch (error) {
      console.log(error)
    }
  }
}

export async function logout() {
  await auth().signOut()
}
