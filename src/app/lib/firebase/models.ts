import { firebase } from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"
import { Asset } from "react-native-image-picker"
import { TrainingModel, TrainingSession } from "../types/train"
import { Comment, Post } from "../types/user"

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
  await collectionReference
    .doc(id)
    .update(model)
    .then(() => console.log("a"))
}

export async function deleteModel(uID: string, id: string) {
  await firestore()
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

export async function deleteSession(uID: string, id: string) {
  await firestore()
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
  onLoad: (models: { model: TrainingModel; id: string }[]) => void
): () => void {
  return firestore()
    .collection("users")
    .doc(uid)
    .collection("models")
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
  uid: string,
  session: TrainingSession,
  share?: { comment: string }
) {
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
  uid: string,
  model: TrainingModel,
  share: { comment: string }
) {
  const userDoc = firestore().collection("users").doc(uid)
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

export async function postComment(
  author: string,
  postId: string,
  body: string,
  parentComment: string | null
): Promise<{ id: string; comment: Comment }> {
  return new Promise((resolve) => {
    const comment: Comment = {
      author: author,
      body: body,
      date: Date.now(),
      parentID: parentComment,
      childIDs: []
    }
    firestore()
      .collection(`posts/${postId}/comments`)
      .add(comment)
      .then((documentReference) =>
        resolve({ id: documentReference.id, comment: comment })
      )
  })
}

export async function getRootComments(postId: string) {
  return getCommentReplies(postId, null)
}

export async function getCommentReplies(
  postId: string,
  commentId: string | null
) {
  return (
    await firestore()
      .collection(`posts/${postId}/comments`)
      .orderBy("date", "desc")
      .where("parentID", "==", commentId)
      .get()
  ).docs.map((doc) => ({ id: doc.id, comment: doc.data() as Comment }))
}
