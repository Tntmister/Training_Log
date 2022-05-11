import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import { Appbar } from "react-native-paper"
import { images } from "../../../lib/extra"
import { useTheme } from "../../../providers/Theme"
import { UserContext } from "../../../providers/User"
import { Button } from "../../reusable/Button"
import InlineContainer from "../../reusable/InlineView"
import { Text } from "../../reusable/Text"
import { TextInput } from "../../reusable/TextInput"
import { VariableHeightTextInput } from "../../reusable/VariableHeightTextInput"
import { RootStackParamUserNav } from "./UserNav"

export default function EditProfile({
  navigation
}: StackScreenProps<RootStackParamUserNav, "Profile">) {
  const user = useContext(UserContext)!
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
      borderRadius: 15,
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

  const [name, setName] = useState(user!.displayName)
  const [email, setEmail] = useState(user!.email)
  const [bio, setBio] = useState("")
  function saveChanges() {
    if (validName(name) && validEmail(email)) {
      navigation.navigate("Profile", { uid: user.uid })
    }
  }
  function handleChangeName(name: string) {
    setName(name)
  }
  function handleChangeEmail(email: string) {
    setEmail(email)
  }
  function handleChangeBio(bio: string) {
    setBio(bio)
  }
  //TODO: selecionar imagem galeria e dar crop com react-native-image-crop-picker
  console.log(name, email, bio)
  return (
    <View style={styles.container}>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title={"Profile Edition"} />
      </Appbar>
      <InlineContainer style={styles.imgContainer}>
        <Image source={images.User} style={styles.img} />
      </InlineContainer>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder={user!.displayName ? user!.displayName : ""}
          style={styles.input}
          value={name ? name : ""}
          onChangeText={handleChangeName}
        />
        <Text style={styles.label}>Email Adress</Text>
        <TextInput
          placeholder={user!.email ? user!.email : ""}
          style={styles.input}
          value={email ? email : ""}
          onChangeText={handleChangeEmail}
        />
        <Text style={styles.label}>Bio</Text>
        <VariableHeightTextInput
          placeholder={"Your bio"}
          style={styles.input}
          value={bio}
          onChangeText={handleChangeBio}
        ></VariableHeightTextInput>
      </View>

      <Button style={styles.save} onPress={saveChanges}>
        Save Changes
      </Button>
    </View>
  )
}

function validName(name: string | null): boolean {
  console.log("Validating name -> " + name)
  return true
}

function validEmail(email: string | null): boolean {
  console.log("Validating email -> " + email)
  return true
}
