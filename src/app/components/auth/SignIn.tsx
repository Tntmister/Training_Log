import React, { useContext, useRef, useState } from "react"
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
import { Button } from "../reusable/Button"
import { Text } from "../reusable/Text"
import { TextInput } from "../reusable/TextInput"

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
  const styles = useRef(
    StyleSheet.create({
      container: {
        alignItems: "center"
      },
      googleTextContainer: {
        width: "90%",
        borderTopWidth: 1,
        marginTop: theme.margins.l,
        borderTopColor: theme.colors.primary
      },
      googleText: {
        textAlign: "center",
        fontSize: RFValue(12),
        paddingTop: theme.paddings.m
      },
      input: {
        width: "80%"
      }
    })
  ).current

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: theme.paddings.m,
        backgroundColor: theme.colors.background
      }}
    >
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder={theme.strings.en.auth.email}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder={theme.strings.en.auth.password}
        secureTextEntry={true}
      />
      <Button
        mode="text"
        onPress={onForgotPassword}
        labelStyle={{ color: theme.colors.primary, fontSize: RFValue(12) }}
        style={[styles.input, { marginTop: theme.margins.s }]}
      >
        Forgot Password?
      </Button>
      <Button style={styles.input} mode="contained" onPress={onSubmit}>
        Sign In
      </Button>
      <View style={styles.googleTextContainer}>
        <Text style={styles.googleText}>Or Sign In With</Text>
      </View>
      <Button
        onPress={loginGoogle}
        color={theme.colors.text}
        style={[styles.input, { marginTop: theme.margins.m }]}
        labelStyle={{ color: theme.colors.surface }}
      >
        Sign In With Google
      </Button>
    </View>
  )
}
