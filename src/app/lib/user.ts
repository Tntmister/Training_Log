import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"

export type User = {
  username: string;
  bio: string;
  profileURL: string | null;
  creationTime: number;
};

export async function saveUserDetails(uid: string, user: Partial<User>) {
  const profileRef = storage().ref(`users/${uid}/profile`)
  if (user.profileURL) {
    await profileRef.putFile(user.profileURL)
    user.profileURL = await profileRef.getDownloadURL()
  } else profileRef.delete()
  firestore().collection("users").doc(uid).set(user, { merge: true })
}

export function getProfileURL(uid: string, onFinish: (url: string) => void) {
  firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((documentSnapshot) => onFinish(documentSnapshot.get("profileURL")))
}

export function subscribeUser(uid: string, onUpdate: (user: User) => void) {
  firestore()
    .collection("users")
    .doc(uid)
    .onSnapshot((documentSnapshot) =>
      onUpdate(documentSnapshot.data() as User)
    )
}
