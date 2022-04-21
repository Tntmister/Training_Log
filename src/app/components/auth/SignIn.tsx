import React, { useContext, useState } from "react"
import { Text, View } from "react-native"
import { TextInput } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { login, loginGoogle, logout, resetPassword } from "../../lib/firebase"
import { useTheme } from "../../providers/Theme"
import { UserContext } from "../../providers/User"
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
        alignItems: "center",
        paddingTop: theme.paddings.s,
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
      >
        Forgot Password?
      </AuthButton>
      <AuthButton mode="contained" onPress={onSubmit}>
        Sign In
      </AuthButton>
      <View
        style={{
          marginTop: theme.margins.l,
          width: "90%",
          borderTopColor: theme.colors.primary,
          borderTopWidth: 1
        }}
      >
        <Text
          style={{
            color: theme.colors.primary,
            textAlign: "center",
            paddingTop: theme.paddings.m,
            fontSize: RFValue(12),
            fontFamily: "Lato"
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
