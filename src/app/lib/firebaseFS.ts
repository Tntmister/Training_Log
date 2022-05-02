import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"
import { TrainingModel } from "../../dataDefinition/data"
import { TrainingModelDoc } from "../components/screens/Train/Models/ModelList"

export async function createUserDoc(uID: string) {
  firestore().collection("users").doc(uID).set({
    models: []
  })
}

export async function saveModel(
  uID: string,
  model: TrainingModel,
  id?: string
) {
  const collectionReference = firestore()
    .collection("users")
    .doc(uID)
    .collection("models")
  if (id === undefined) {
    id = (await collectionReference.add({})).id
  }
  for (const [index, asset] of model.mediaContent.entries()) {
    if (!asset.uri?.startsWith("http")) {
      const ref = storage().ref(
        `users/${uID}/models/${id}/${index}.${asset.type?.split("/")[1]}`
      )
      await ref.putFile(asset.uri!)
      model.mediaContent[index].uri = await ref.getDownloadURL()
    }
  }
  await collectionReference.doc(id).update(model)
}

export async function deleteModel(uID: string, id: string, hasImages: boolean) {
  console.log(`users/${uID}/models/${id}`)
  await firestore()
    .collection("users")
    .doc(uID)
    .collection("models")
    .doc(id)
    .delete()
  if (hasImages) await storage().ref(`users/${uID}/models/${id}`)
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
