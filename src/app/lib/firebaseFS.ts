import firestore from "@react-native-firebase/firestore"
import { TrainingModel } from "../../dataDefinition/data"

export async function createUserDoc(uID: string) {
  firestore().collection("users").doc(uID).set({
    models: []
  })
}

export async function saveModel(uID: string, model: TrainingModel) {
  firestore().collection("users").doc(uID).collection("models").add(model)
}
