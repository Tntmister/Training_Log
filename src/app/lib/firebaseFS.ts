import firestore from "@react-native-firebase/firestore"
import { TrainingModel } from "../../dataDefinition/data"

export async function createUserDoc(username: string) {
  firestore().collection("users").doc(username).set({
    models: []
  })
}

export async function saveModel(username: string, model: TrainingModel) {
  firestore().collection("users").doc(username).collection("models").add(model)
}
