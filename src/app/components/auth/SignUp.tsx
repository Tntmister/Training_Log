import React, { useContext, useRef, useState } from "react"
import { StyleSheet, ToastAndroid, View } from "react-native"
import { Checkbox } from "react-native-paper"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../providers/Theme"
import { register } from "../../lib/firebase/auth"
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
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)

  function onSubmit() {
    if (password !== password2)
      return ToastAndroid.show(
        STRS.auth.passwordsDoNotMatch,
        ToastAndroid.SHORT
      )
    if (!checkedTOS)
      return ToastAndroid.show(STRS.auth.mustAgrreToTerms, ToastAndroid.SHORT)
    register(email, password, username)
  }
  const styles = useRef(
    StyleSheet.create({
      container: {
        alignItems: "center",
        backgroundColor: theme.colors.background
      },
      tosContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: theme.margins.s
      },
      input: {
        width: "80%",
        marginTop: theme.margins.s
      },
      terms: {
        ...theme.text.body_s
      }
    })
  ).current

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder={STRS.auth.username}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder={STRS.auth.email}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder={STRS.auth.password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={password2}
        onChangeText={setPassword2}
        placeholder={STRS.auth.confirmPassword}
        secureTextEntry={true}
      />
      <View style={styles.tosContainer}>
        <Checkbox
          status={checkedTOS ? "checked" : "unchecked"}
          onPress={() => {
            setCheckedTOS(!checkedTOS)
          }}
        />
        <Text style={styles.terms}>{STRS.auth.termsAgreement}</Text>
      </View>

      <Button style={styles.input} onPress={onSubmit}>
        {STRS.auth.signUp}
      </Button>
    </View>
  )
}
