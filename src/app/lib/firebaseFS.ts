import firestore from "@react-native-firebase/firestore"
import { TrainingModel } from "../../dataDefinition/data"
import { TrainingModelDoc } from "../components/screens/Train/Models/ModelList"

export async function createUserDoc(uID: string) {
  firestore().collection("users").doc(uID).set({
    models: []
  })
}

export function saveModel(uID: string, model: TrainingModel, id?: string) {
  if (id !== undefined) {
    firestore()
      .collection("users")
      .doc(uID)
      .collection("models")
      .doc(id)
      .update(model)
  } else {
    firestore().collection("users").doc(uID).collection("models").add(model)
  }
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
        models.push({
          model: documentSnapshot.data() as TrainingModel,
          id: documentSnapshot.id
        })
      })
      onLoad(models)
    })
}
