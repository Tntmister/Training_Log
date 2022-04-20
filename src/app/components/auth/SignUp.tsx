import React, { useState, useContext } from "react"
import { StyleSheet, ToastAndroid, View } from "react-native"
import { Checkbox, Text } from "react-native-paper"
import { ThemeContext } from "../../App"
import { register } from "../../lib/firebase"
import { AuthButton, AuthTextInput } from "./AuthReusable"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [checkedTOS, setCheckedTOS] = useState(false)
  const theme = useContext(ThemeContext)

  function onSubmit() {
    if (password !== password2)
      return ToastAndroid.show("Passwords do not match!", ToastAndroid.SHORT)
    if (!checkedTOS)
      return ToastAndroid.show(
        "You must agree to the Terms of Use",
        ToastAndroid.SHORT
      )
    register(email, password, username)
  }

  return (
    <View
      style={{ ...styles.rootView, backgroundColor: theme.colors.background }}
    >
      <AuthTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <AuthTextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <AuthTextInput
        value={password2}
        onChangeText={setPassword2}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <AuthTextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <View>
        <Checkbox
          status={checkedTOS ? "checked" : "unchecked"}
          onPress={() => {
            setCheckedTOS(!checkedTOS)
          }}
        />
        <Text>I agree to the Terms of Use</Text>
      </View>

      <AuthButton
        onPress={onSubmit}
        title="Sign Up"
        backgroundColor={theme.colors.main}
        textColor={theme.colors.white}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
  }
})
