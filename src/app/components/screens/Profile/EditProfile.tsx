import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Appbar } from "react-native-paper"
import { images } from "../../../lib/extra"
import { saveUserDetails } from "../../../lib/firebase/user"
import { User } from "../../../lib/types/user"
import { useTheme } from "../../../providers/Theme"
import { Button } from "../../reusable/Button"
import ImageCropPicker, {
  Image as ImageResponse
} from "react-native-image-crop-picker"
import { Text } from "../../reusable/Text"
import { TextInput } from "../../reusable/TextInput"
import { VariableHeightTextInput } from "../../reusable/VariableHeightTextInput"
import { RootStackParamUserNav } from "./ProfileNav"
import { CachedImage } from "@georstat/react-native-image-cache"
import { UserContext } from "../../../providers/User"

export default function EditProfile({
  navigation,
  route
}: StackScreenProps<RootStackParamUserNav, "EditProfile">) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      alignItems: "center"
    },
    imgContainer: {
      //backgroundColor: "green",
      marginTop: theme.margins.l
    },
    img: {
      height: 120,
      width: 120,
      borderWidth: 2,
      borderColor: theme.colors.primary
    },
    form: {
      marginTop: theme.margins.l,
      //backgroundColor: "purple",
      width: "95%",
      justifyContent: "center"
    },
    label: {
      marginTop: theme.margins.m,
      paddingLeft: theme.margins.s
    },
    input: {
      marginTop: theme.margins.xs
    },
    save: {
      marginVertical: theme.margins.l
    }
  })
  const user = route.params.user
  const [userChanges, setUserChanges] = useState({ ...user } as User)
  const uid = useContext(UserContext)!.uid

  function saveChanges() {
    saveUserDetails(
      uid,
      // cria objeto com apenas campos alterados entre alteracoes feitas e user atual
      Object.fromEntries(
        Object.entries(userChanges).filter(
          (value) =>
            !Object.entries(user).some((oldValue) => value[1] == oldValue[1])
        )
      )
    )
    navigation.navigate("Profile")
  }
  function onNameChange(name: string) {
    setUserChanges((prevChanges) => ({ ...prevChanges, username: name }))
  }
  function onBioChange(bio: string) {
    setUserChanges((prevChanges) => ({ ...prevChanges, bio: bio }))
  }
  function onGalleryExit(image: ImageResponse) {
    setUserChanges((prevChanges) => ({
      ...prevChanges,
      profileURL: image.path
    }))
  }
  function clearProfileURL() {
    setUserChanges((prevChanges) => ({ ...prevChanges, profileURL: null }))
  }

  return (
    <View style={styles.container}>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title={"Profile Edition"} />
      </Appbar>
      <TouchableOpacity
        onLongPress={() =>
          ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            compressImageMaxHeight: 300,
            compressImageMaxWidth: 300,
            cropping: true,
            mediaType: "photo"
          }).then(onGalleryExit, (reason) => console.log(reason))
        }
        style={styles.imgContainer}
      >
        {userChanges.profileURL ? (
          <CachedImage
            noCache={userChanges.profileURL.startsWith("file")}
            source={userChanges.profileURL}
            style={styles.img}
          />
        ) : (
          <Image
            source={images.User}
            style={[styles.img, { tintColor: theme.colors.text }]}
          />
        )}
      </TouchableOpacity>
      <Button style={styles.save} onPress={clearProfileURL}>
        Clear Profile Picture
      </Button>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder={user.username}
          style={styles.input}
          value={userChanges.username}
          onChangeText={onNameChange}
        />
        <Text style={styles.label}>Bio</Text>
        <VariableHeightTextInput
          placeholder={"Your bio"}
          style={styles.input}
          value={userChanges.bio}
          onChangeText={onBioChange}
        ></VariableHeightTextInput>
      </View>
      <Button style={styles.save} onPress={saveChanges}>
        Save Changes
      </Button>
    </View>
  )
}
