import { firebase } from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"
import { Asset } from "react-native-image-picker"
import { TrainingModel, TrainingSession } from "../types/train"
import { TrainingModelDoc } from "../../components/screens/Train/Models/ModelList"

export async function saveModel(
  uID: string,
  model: TrainingModel,
  deletedImages: Asset[],
  id?: string
) {
  const collectionReference = firestore()
    .collection("users")
    .doc(uID)
    .collection("models")
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
  await collectionReference.doc(id).update(model)
}

export function deleteModel(uID: string, id: string) {
  firestore()
    .collection("users")
    .doc(uID)
    .collection("models")
    .doc(id)
    .delete()
  storage()
    .ref(`/users/${uID}/models/${id}`)
    .listAll()
    .then((list) => list.items.forEach((ref) => ref.delete()))
}

export function deleteSession(uID: string, id: string) {
  firestore()
    .collection("users")
    .doc(uID)
    .collection("sessions")
    .doc(id)
    .delete()
  storage()
    .ref(`/users/${uID}/sessions/${id}`)
    .listAll()
    .then((list) => list.items.forEach((ref) => ref.delete()))
}

export function getModels(
  uid: string,
  onLoad: (models: TrainingModelDoc[]) => void
): () => void {
  return firestore()
    .collection("users")
    .doc(uid)
    .collection("models")
    .onSnapshot((querySnapshot) => {
      const models: TrainingModelDoc[] = []
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
  onLoad: (sessions: TrainingModelDoc[]) => void
): () => void {
  return firestore()
    .collection("users")
    .doc(uid)
    .collection("sessions")
    .onSnapshot((querySnapshot) => {
      const sessions: TrainingModelDoc[] = []
      querySnapshot.forEach((documentSnapshot) => {
        if (Object.keys(documentSnapshot.data()).length != 0) {
          sessions.push({
            model: documentSnapshot.data() as TrainingModel,
            id: documentSnapshot.id
          })
        }
      })
      onLoad(sessions)
    })
}

export async function finishSession(
  uid: string,
  session: TrainingSession,
  share: boolean
) {
  const userDoc = firestore().collection("users").doc(uid)
  firestore().runTransaction(async (t) => {
    t.set(userDoc.collection("sessions").doc(), session)
    if (share) {
      t.set(firestore().collection("posts").doc(), session)
      t.update(userDoc, { posts: firebase.firestore.FieldValue.increment(1) })
    }
  })
}
