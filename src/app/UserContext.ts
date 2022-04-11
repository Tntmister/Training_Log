import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { createContext } from "react"

const UserContext = createContext<FirebaseAuthTypes.User | null>(null)

export default UserContext
