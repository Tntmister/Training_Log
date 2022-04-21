import React, { useContext, useState } from "react"
import { Text, View } from "react-native"
import { Button, useTheme } from "react-native-paper"
import { login, loginGoogle, logout, resetPassword } from "../../lib/firebase"
import { UserContext } from "../../providers/User"
import { AuthTextInput, styles } from "./AuthReusable"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const theme = useTheme()
  const user = useContext(UserContext)

  function onSubmit() {
    if (user) logout()
    login(email, password)
  }

  function onForgotPassword() {
    resetPassword(email)
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
      <Button
        style={{ marginTop: 10 }}
        onPress={onForgotPassword}
        uppercase={false}
      >
        Forgot Password?
      </Button>
      <Button
        mode="contained"
        onPress={onSubmit}
        uppercase={false}
        style={styles.button}
        labelStyle={{ color: "#FFFFFF", paddingVertical: 4 }}
      >
        Sign In
      </Button>
      <View
        style={{
          marginTop: 30,
          width: "90%",
          borderTopColor: theme.colors.primary,
          borderTopWidth: 1
        }}
      >
        <Text
          style={{
            color: theme.colors.primary,
            textAlign: "center",
            paddingTop: 8
          }}
        >
          Or Sign In With
        </Text>
      </View>
      <Button
        onPress={loginGoogle}
        style={styles.button}
        labelStyle={{ paddingVertical: 4 }}
        uppercase={false}
        color={theme.colors.text}
        mode="contained"
      >
        Sign In With Google
      </Button>
    </View>
  )
}
