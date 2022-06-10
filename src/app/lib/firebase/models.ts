import { firebase } from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"
import { Asset } from "react-native-image-picker"
import { TrainingModel, TrainingSession } from "../types/train"
import { Post } from "../types/user"

export async function saveModel(
  model: TrainingModel,
  deletedImages: Asset[],
  id?: string
) {
  const uID = firebase.auth().currentUser!.uid
  const collectionReference = firestore().collection(`users/${uID}/models`)
  if (id === undefined) {
    id = (await collectionReference.add({})).id
  } else {
    for (const { fileName } of deletedImages) {
      await storage().ref(`users/${uID}/models/${id}/${fileName}`).delete()
    }
  }
  for (const asset of model.mediaContent) {
    if (!asset.uri?.startsWith("http")) {
      const ref = storage().ref(`users/${uID}/models/${id}/${asset.fileName}`)
      await ref.putFile(asset.uri!)
      asset.uri = await ref.getDownloadURL()
    }
  }
  await collectionReference
    .doc(id)
    .update(model)
    .then(() => console.log("a"))
}

export async function deleteModel(id: string) {
  const uID = firebase.auth().currentUser!.uid
  await firestore().doc(`users/${uID}/models/${id}`).delete()
  storage()
    .ref(`/users/${uID}/models/${id}`)
    .listAll()
    .then((list) => list.items.forEach((ref) => ref.delete()))
}

export async function deleteSession(id: string) {
  const uID = firebase.auth().currentUser!.uid
  await firestore().doc(`users/${uID}/sessions/${id}`).delete()
  storage()
    .ref(`/users/${uID}/sessions/${id}`)
    .listAll()
    .then((list) => list.items.forEach((ref) => ref.delete()))
}

export function getModels(
  uid: string,
  onLoad: (models: { model: TrainingModel; id: string }[]) => void
): () => void {
  return firestore()
    .collection(`users/${uid}/models`)
    .onSnapshot((querySnapshot) => {
      const models: { model: TrainingModel; id: string }[] = []
      querySnapshot.forEach((documentSnapshot) => {
        if (Object.keys(documentSnapshot.data()).length != 0) {
          models.push({
            model: documentSnapshot.data() as TrainingModel,
            id: documentSnapshot.id
          })
        }
      })
      onLoad(models)
    })
}
export function getSessions(
  uid: string,
  onLoad: (sessions: { session: TrainingSession; id: string }[]) => void
): () => void {
  return firestore()
    .collection("users")
    .doc(uid)
    .collection("sessions")
    .onSnapshot((querySnapshot) => {
      const sessions: { session: TrainingSession; id: string }[] = []
      querySnapshot.forEach((documentSnapshot) => {
        if (Object.keys(documentSnapshot.data()).length != 0) {
          sessions.push({
            session: documentSnapshot.data() as TrainingSession,
            id: documentSnapshot.id
          })
        }
      })
      onLoad(sessions)
    })
}

export async function finishSession(
  session: TrainingSession,
  share?: { comment: string }
) {
  const uid = firebase.auth().currentUser!.uid
  const userDoc = firestore().collection("users").doc(uid)
  firestore().runTransaction(async (t) => {
    t.set(userDoc.collection("sessions").doc(), session)
    if (share) {
      t.set(firestore().collection("posts").doc(), {
        authorComment: share.comment,
        author: uid,
        post: session,
        likes: 0
      } as Post)
      t.update(userDoc, { posts: firebase.firestore.FieldValue.increment(1) })
    }
  })
}

export async function shareModel(
  model: TrainingModel,
  share: { comment: string }
) {
  const uid = firebase.auth().currentUser!.uid
  const userDoc = firestore().doc(`users/${uid}`)
  firestore().runTransaction(async (t) => {
    t.set(firestore().collection("posts").doc(), {
      authorComment: share.comment,
      author: uid,
      post: model,
      likes: 0
    } as Post)
    t.update(userDoc, { posts: firebase.firestore.FieldValue.increment(1) })
  })
}
