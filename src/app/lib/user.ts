import firestore from "@react-native-firebase/firestore"

interface IUser {
  username: string;
  bio: string;
  profileURL: string | null;
  creationTime: number;
}

export class User implements IUser {
  username: string;
  bio: string;
  profileURL: string | null;
  creationTime: number;

  constructor(user: IUser) {
    this.username = user.username
    this.bio = user.bio
    this.profileURL = user.profileURL
    this.creationTime = user.creationTime
  }
}

export function getProfileURL(uid: string, onFinish: (url: string) => void) {
  firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((documentSnapshot) => onFinish(documentSnapshot.get("profileURL")))
}

export function subscribeUser(
  uid: string,
  onUpdate: (documentSnapshot: User) => void
) {
  return firestore()
    .collection("users")
    .doc(uid)
    .onSnapshot((documentSnapshot) =>
      onUpdate(new User(documentSnapshot.data() as IUser))
    )
}
