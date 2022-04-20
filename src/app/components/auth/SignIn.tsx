import React, { useContext, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ThemeContext } from "../../App"
import { login, loginGoogle, logout, resetPassword } from "../../lib/firebase"
import { UserContext } from "../../providers/User"
import { AuthButton, AuthTextInput } from "./AuthReusable"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const theme = useContext(ThemeContext)
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
      <AuthButton
        onPress={onForgotPassword}
        title="Forgot Password?"
        backgroundColor={theme.colors.none}
        textColor={theme.colors.main}
      />
      <AuthButton
        onPress={onSubmit}
        title="Sign In"
        backgroundColor={theme.colors.main}
        textColor={theme.colors.white}
      />
      <View
        style={{
          marginTop: 20,
          marginBottom: 10,
          width: "90%",
          borderTopColor: theme.colors.main,
          borderTopWidth: 1
        }}
      >
        <Text
          style={{
            color: theme.colors.main,
            textAlign: "center",
            fontSize: 16,
            paddingTop: 4
          }}
        >
          Or Sign In With
        </Text>
      </View>
      <AuthButton
        onPress={loginGoogle}
        title="Sign In With Google"
        backgroundColor={theme.colors.white}
        textColor={theme.colors.black}
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
