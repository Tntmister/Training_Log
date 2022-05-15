import { firebase } from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"

export type User = {
  username: string;
  bio: string;
  profileURL: string | null;
  creationTime: number;
  followers: number;
  following: number;
  posts: number;
};

export type Follow = {
  dateFollowed: number;
  id: string;
  mutual: boolean;
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
  return firestore()
    .collection("users")
    .doc(uid)
    .onSnapshot((documentSnapshot) =>
      onUpdate(documentSnapshot.data() as User)
    )
}

export async function followUser(self_uid: string, user_uid: string) {
  const now = Date.now()

  const selfDoc = firestore().collection("users").doc(self_uid)
  const userDoc = firestore().collection("users").doc(user_uid)

  const mutual = await selfDoc
    .collection("followers")
    .where("id", "==", user_uid)
    .get()
    .then((query) => !query.empty)

  firestore()
    .runTransaction(async (t) => {
      t.set(selfDoc.collection("following").doc(user_uid), {
        dateFollowed: now,
        id: user_uid,
        mutual: mutual
      } as Follow)
      t.update(selfDoc, {
        following: firebase.firestore.FieldValue.increment(1)
      })
      t.set(userDoc.collection("followers").doc(self_uid), {
        dateFollowed: now,
        id: self_uid,
        mutual: mutual
      } as Follow)
      t.update(userDoc, {
        followers: firebase.firestore.FieldValue.increment(1)
      })
      if (mutual)
        t.update(selfDoc.collection("followers").doc(user_uid), {
          mutual: mutual
        } as Partial<Follow>)
    })
    .catch((resason) => console.log(resason))
}

export async function unfollowUser(self_uid: string, user_uid: string) {
  const selfDoc = firestore().collection("users").doc(self_uid)
  const userDoc = firestore().collection("users").doc(user_uid)

  const mutual = await selfDoc
    .collection("followers")
    .where("id", "==", user_uid)
    .get()
    .then((query) => !query.empty)

  firestore().runTransaction(async (t) => {
    t.delete(selfDoc.collection("following").doc(user_uid))
    t.update(selfDoc, {
      following: firebase.firestore.FieldValue.increment(-1)
    })

    t.delete(userDoc.collection("followers").doc(self_uid))
    t.update(userDoc, {
      followers: firebase.firestore.FieldValue.increment(-1)
    })
    if (mutual)
      t.update(selfDoc.collection("followers").doc(user_uid), {
        mutual: !mutual
      } as Partial<Follow>)
  })
}

export function subscribeFollowing(
  uid: string,
  uid_self: string,
  onUpdate: (follow?: Follow) => void
) {
  return firestore()
    .collection("users")
    .doc(uid)
    .collection("followers")
    .where("id", "==", uid_self)
    .onSnapshot((query) => {
      onUpdate(query.empty ? undefined : (query.docs[0].data() as Follow))
    })
}
