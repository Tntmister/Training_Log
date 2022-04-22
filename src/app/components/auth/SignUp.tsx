import React, { useState } from "react"
import { ToastAndroid, View } from "react-native"
import { Checkbox } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { register } from "../../lib/firebase"
import { useTheme } from "../../providers/Theme"
import { Text } from "../reusable/Text"
import { AuthButton, AuthTextInput } from "./AuthReusable"

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
      style={{
        alignItems: "center",
        paddingTop: theme.paddings.m,
        backgroundColor: theme.colors.background
      }}
    >
      <AuthTextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: theme.margins.m
        }}
      >
        <Checkbox
          status={checkedTOS ? "checked" : "unchecked"}
          onPress={() => {
            setCheckedTOS(!checkedTOS)
          }}
        />
        <Text
          style={{
            fontSize: RFValue(14)
          }}
        >
          I agree to the Terms of Use
        </Text>
      </View>

      <AuthButton onPress={onSubmit}>Sign Up</AuthButton>
    </View>
  )
}
