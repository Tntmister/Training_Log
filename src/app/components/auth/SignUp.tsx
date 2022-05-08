import React, { useRef, useState } from "react"
import { StyleSheet, ToastAndroid, View } from "react-native"
import { Checkbox } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { register } from "../../lib/firebaseAuth"
import { useTheme } from "../../providers/Theme"
import { Button } from "../reusable/Button"
import { Text } from "../reusable/Text"
import { TextInput } from "../reusable/TextInput"

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
  const styles = useRef(
    StyleSheet.create({
      container: {
        alignItems: "center",
        paddingTop: theme.paddings.m,
        backgroundColor: theme.colors.background
      },
      tosContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: theme.margins.s
      },
      input: {
        width: "80%"
      }
    })
  ).current
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={password2}
        onChangeText={setPassword2}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <View style={styles.tosContainer}>
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

      <Button style={styles.input} onPress={onSubmit}>
        Sign Up
      </Button>
    </View>
  )
}
