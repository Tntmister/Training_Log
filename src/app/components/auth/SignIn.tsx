import React, { useContext, useState } from "react"
import { StyleSheet, View } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import {
  login,
  loginGoogle,
  logout,
  resetPassword
} from "../../lib/firebaseAuth"
import { useTheme } from "../../providers/Theme"
import { UserContext } from "../../providers/User"
import { Text } from "../reusable/Text"
import { AuthButton, AuthTextInput } from "./AuthReusable"

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
      style={{
        ...styles.container,
        paddingTop: theme.paddings.m,
        backgroundColor: theme.colors.background
      }}
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
        mode="text"
        onPress={onForgotPassword}
        labelStyle={{ color: theme.colors.primary, fontSize: RFValue(12) }}
        style={{ marginTop: theme.margins.s }}
      >
        Forgot Password?
      </AuthButton>
      <AuthButton mode="contained" onPress={onSubmit}>
        Sign In
      </AuthButton>
      <View
        style={{
          ...styles.bottomContainer,
          marginTop: theme.margins.l,
          borderTopColor: theme.colors.primary
        }}
      >
        <Text
          style={{
            ...styles.bottomText,
            color: theme.colors.primary,
            paddingTop: theme.paddings.m
          }}
        >
          Or Sign In With
        </Text>
      </View>
      <AuthButton
        onPress={loginGoogle}
        color={theme.colors.text}
        style={{ marginTop: theme.margins.l }}
        labelStyle={{ color: theme.colors.surface }}
      >
        Sign In With Google
      </AuthButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  bottomContainer: {
    width: "90%",
    borderTopWidth: 1
  },
  bottomText: {
    textAlign: "center",
    fontSize: RFValue(12)
  }
})
