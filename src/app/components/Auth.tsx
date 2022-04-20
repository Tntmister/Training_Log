import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View
} from "react-native"
import { Checkbox, Text } from "react-native-paper"
import {
  login,
  loginGoogle,
  logout,
  register,
  resetPassword
} from "../lib/firebase"
import { UserContext } from "../User"
import { ThemeContext } from "./App"

export default function Auth() {
  const Tab = createMaterialTopTabNavigator()
  const theme = useContext(ThemeContext)
  const barWidth = Dimensions.get("window").width * 0.8

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Image
        style={{
          width: "100%",
          height: "25%",
          marginTop: 20
        }}
        resizeMode="contain"
        source={require("../assets/logo/logo1.png")}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            marginHorizontal: "10%",
            elevation: 0
          },
          tabBarLabelStyle: {
            fontSize: 30
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.main,
            width: barWidth * 0.4,
            left: barWidth * 0.05
          },
          tabBarActiveTintColor: theme.colors.white,
          tabBarInactiveTintColor: theme.colors.white,
          tabBarPressOpacity: 1,
          tabBarPressColor: theme.colors.background
        }}
      >
        <Tab.Screen component={SignIn} name="Sign In" />
        <Tab.Screen component={SignUp} name="Sign Up" />
      </Tab.Navigator>
    </View>
  )
}

function SignIn() {
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

function SignUp() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [checkedTOS, setCheckedTOS] = useState(false)
  const theme = useContext(ThemeContext)

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
      <View>
        <Checkbox
          status={checkedTOS ? "checked" : "unchecked"}
          onPress={() => {
            setCheckedTOS(!checkedTOS)
          }}
        />
        <Text>I agree to the Terms of Use</Text>
      </View>

      <AuthButton
        onPress={onSubmit}
        title="Sign Up"
        backgroundColor={theme.colors.main}
        textColor={theme.colors.white}
      />
    </View>
  )
}

interface ITextInput {
  onChangeText: Dispatch<SetStateAction<string>>;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

function AuthTextInput(props: ITextInput) {
  const theme = React.useContext(ThemeContext)

  return (
    <TextInput
      style={{
        fontSize: 20,
        textAlignVertical: "bottom",
        paddingTop: 10,
        color: theme.colors.white,
        paddingHorizontal: 20,
        borderBottomColor: theme.colors.main,
        borderBottomWidth: 2,
        width: "80%"
      }}
      placeholderTextColor={theme.colors.white}
      onChangeText={props.onChangeText}
      value={props.value}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
    />
  )
}

interface IAuthButton {
  title: string;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
}

function AuthButton(props: IAuthButton) {
  const theme = useContext(ThemeContext)

  return (
    <Pressable
      onPress={props.onPress}
      style={{
        width: "80%",
        backgroundColor: props.backgroundColor,
        borderRadius: 50,
        paddingVertical: 10,
        marginTop: 10
      }}
    >
      <Text
        style={{
          color: props.textColor,
          fontSize: props.backgroundColor == theme.colors.none ? 16 : 24,
          fontFamily: "Lato-Regular",
          textAlignVertical: "top",
          textAlign: "center"
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
  }
})
