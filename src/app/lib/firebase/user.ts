import { firebase } from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"
import { User, Follow } from "../types/user"

export async function saveUserDetails(uid: string, user: Partial<User>) {
  const profileRef = storage().ref(`users/${uid}/profile`)
  if (user.profileURL) {
    await profileRef.putFile(user.profileURL)
    user.profileURL = await profileRef.getDownloadURL()
  } else profileRef.delete()
  firestore().collection("users").doc(uid).set(user, { merge: true })
}

export function getProfileURL(uid: string) {
  return firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((documentSnapshot) => documentSnapshot.get("profileURL") as string)
}

export function subscribeUser(uid: string, onUpdate: (user: User) => void) {
  firestore()
    .collection("users")
    .doc(uid)
    .onSnapshot((documentSnapshot) =>
      onUpdate(documentSnapshot.data() as User)
    )
}

export function getUser(uid: string) {
  return firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((documentSnapshot) => documentSnapshot.data() as User)
}

export async function followUser(self_uid: string, user_uid: string) {
  const now = Date.now()

  const selfDoc = firestore().collection("users").doc(self_uid)
  const userDoc = firestore().collection("users").doc(user_uid)

  const user_following = await userDoc
    .collection("following")
    .where("id", "==", user_uid)
    .get()
    .then((query) => !query.empty)

  firestore()
    .runTransaction(async (t) => {
      t.set(selfDoc.collection("following").doc(user_uid), {
        dateFollowed: now,
        id: user_uid,
        mutual: user_following
      } as Follow)
      t.update(selfDoc, {
        following: firebase.firestore.FieldValue.increment(1)
      })
      t.update(userDoc, {
        followers: firebase.firestore.FieldValue.increment(1)
      })
      if (user_following) {
        t.update(userDoc.collection("following").doc(self_uid), {
          mutual: true
        } as Partial<Follow>)
      }
    })
    .catch((resason) => console.log(resason))
}

export async function unfollowUser(self_uid: string, user_uid: string) {
  const selfDoc = firestore().collection("users").doc(self_uid)
  const userDoc = firestore().collection("users").doc(user_uid)

  const user_following = await userDoc
    .collection("following")
    .where("id", "==", user_uid)
    .get()
    .then((query) => !query.empty)

  firestore().runTransaction(async (t) => {
    t.delete(selfDoc.collection("following").doc(user_uid))
    t.update(selfDoc, {
      following: firebase.firestore.FieldValue.increment(-1)
    })
    t.update(userDoc, {
      followers: firebase.firestore.FieldValue.increment(-1)
    })
    if (user_following) {
      t.update(userDoc.collection("following").doc(self_uid), {
        mutual: false
      } as Partial<Follow>)
    }
  })
}

export function subscribeFollowing(
  uid: string,
  uid_self: string,
  onUpdate: (follow?: Follow) => void
) {
  return firestore()
    .collection("users")
    .doc(uid_self)
    .collection("following")
    .where("id", "==", uid)
    .onSnapshot((query) => {
      onUpdate(query.empty ? undefined : (query.docs[0].data() as Follow))
    })
}

export async function toggleLikePost(uid: string, postId: string) {
  const post = firestore().doc(`posts/${postId}`)
  const liked = await post
    .collection("likes")
    .where("id", "==", uid)
    .get()
    .then((querySnapshot) => !querySnapshot.empty)
  firestore().runTransaction(async (t) => {
    t.update(post, {
      likes: firebase.firestore.FieldValue.increment(liked ? -1 : 1)
    })
    if (liked) t.delete(post.collection("likes").doc(uid))
    else
      t.set(post.collection("likes").doc(uid), {
        date: Date.now(),
        id: uid
      })
  })
}

export function getPostLiked(uid: string, postId: string) {
  return firestore()
    .collection(`posts/${postId}/likes`)
    .where("id", "==", uid)
    .get()
    .then((querySnapshot) => !querySnapshot.empty)
}
