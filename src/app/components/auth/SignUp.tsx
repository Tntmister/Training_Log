import React, { useState } from "react"
import { ToastAndroid, View } from "react-native"
import { Button, Checkbox, Text, useTheme } from "react-native-paper"
import { register } from "../../lib/firebase"
import { AuthTextInput, styles } from "./AuthReusable"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [checkedTOS, setCheckedTOS] = useState(false)
  const theme = useTheme()

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
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
      >
        <Checkbox
          status={checkedTOS ? "checked" : "unchecked"}
          onPress={() => {
            setCheckedTOS(!checkedTOS)
          }}
        />
        <Text>I agree to the Terms of Use</Text>
      </View>

      <Button
        labelStyle={{ color: "#FFFFFF", paddingVertical: 4 }}
        style={styles.button}
        mode="contained"
        onPress={onSubmit}
      >
        Sign Up
      </Button>
    </View>
  )
}
