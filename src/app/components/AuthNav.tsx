import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React, { useContext, useState } from "react"
import { Button, Image, Text, TextInput, ToastAndroid } from "react-native"
import { login, register } from "../lib/firebase"
import UserContext from "../UserContext"

export default function AuthNav() {
  const Tab = createMaterialTopTabNavigator()

  return (
    <>
      <Image
        style={{
          marginTop: "1%",
          height: "40%"
        }}
        resizeMode="contain"
        source={require("../assets/logo/logo1.png")}
      />
      <Tab.Navigator>
        <Tab.Screen component={SignIn} name="SignIn" />
        <Tab.Screen component={SignUp} name="SignUp" />
      </Tab.Navigator>
    </>
  )
}

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function onSubmit() {
    login(email, password)
  }

  return (
    <>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button onPress={onSubmit} title="Sign In" />
    </>
  )
}

function SignUp() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  function onSubmit() {
    if (password === password2) {
      register(email, password, username)
    } else {
      ToastAndroid.show("Passwords do not match!", ToastAndroid.SHORT)
    }
  }

  return (
    <>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        value={password2}
        onChangeText={setPassword2}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <Button onPress={onSubmit} title="Sign Up" />
    </>
  )
}
