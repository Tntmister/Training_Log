import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { FirebaseError } from "@firebase/util"
import { Alert, ToastAndroid } from "react-native"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { User } from "../types/user"
import { strings } from "../../assets/strings"

GoogleSignin.configure({
  webClientId:
    "782424571231-deej2palg0cprusaid4mjh3ir9p7lffe.apps.googleusercontent.com"
})

let STRS: strings

export function setSTRS(newSTRS: strings) {
  STRS = newSTRS
}

export async function loginGoogle() {
  const { idToken } = await GoogleSignin.signIn()
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)
  const user = await auth().signInWithCredential(googleCredential)
  if (user.additionalUserInfo?.isNewUser) initFirestore(user.user)
}

export async function getUsername(uid: string) {
  const username = await firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((documentSnapshot) => documentSnapshot.get("username")?.toString())
  return username === undefined ? "Unknown User" : username
}

export async function initFirestore(user: FirebaseAuthTypes.User) {
  firestore()
    .collection("users")
    .doc(user.uid)
    .set({
      bio: "",
      creationTime: Date.now(),
      profileURL: null,
      username: user.displayName!,
      followers: 0,
      following: 0,
      posts: 0,
      admin: false,
      bannedUntil: 0
    } as User)
}

export async function login(email: string, password: string) {
  if (email == "" || password == "")
    return ToastAndroid.show(STRS.auth.invalidCredentials, ToastAndroid.SHORT)
  try {
    await auth().signInWithEmailAndPassword(email, password)
  } catch (error) {
    switch ((error as FirebaseError).code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-email":
        ToastAndroid.show(STRS.auth.invalidCredentials, ToastAndroid.SHORT)
        break
      case "auth/network-request-failed":
        ToastAndroid.show(STRS.auth.networkError, ToastAndroid.SHORT)
        break
      default:
        console.log(error)
        ToastAndroid.show((error as FirebaseError).message, ToastAndroid.LONG)
        break
    }
  }
}

export async function register(
  email: string,
  password: string,
  username: string
) {
  if (username == "") {
    ToastAndroid.show(STRS.auth.nonEmptyUsername, ToastAndroid.SHORT)
    return
  }
  try {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.sendEmailVerification()
        result.user
          .updateProfile({
            displayName: username
          })
          .then(() => initFirestore(result.user))
      })
  } catch (error) {
    switch ((error as FirebaseError).code) {
      case "auth/weak-password":
        ToastAndroid.show(STRS.auth.weakPassword, ToastAndroid.SHORT)
        break
      case "auth/email-already-in-use":
        ToastAndroid.show(STRS.auth.invalidEmail, ToastAndroid.SHORT)
        break
      default:
        break
    }
  }
}

export async function resetPassword(email: string) {
  if (email != "") {
    try {
      await auth()
        .sendPasswordResetEmail(email)
        .then(() =>
          Alert.alert(
            STRS.auth.confirmAccountHeader,
            STRS.auth.confirmAccountContent(email),
            [{ text: STRS.ok }]
          )
        )
    } catch (error) {
      Alert.alert(
        STRS.auth.confirmAccountHeader,
        STRS.auth.confirmAccountContent(email),
        [{ text: STRS.ok }]
      )
    }
  }
}

export async function logout() {
  await auth().signOut()
}
