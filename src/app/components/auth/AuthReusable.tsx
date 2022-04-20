import React, { Dispatch, SetStateAction, useContext } from "react"
import { Pressable } from "react-native"
import { Text, TextInput, useTheme } from "react-native-paper"
import { ThemeContext } from "../../providers/Theme"

interface ITextInput {
  onChangeText: Dispatch<SetStateAction<string>>;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

export function AuthTextInput(props: ITextInput) {
  const theme = useTheme()
  const { toggleTheme, dark } = React.useContext(ThemeContext)

  return (
    <TextInput
      style={{
        fontSize: 20,
        textAlignVertical: "bottom",
        color: theme.colors.text,
        borderBottomColor: theme.colors.primary,
        marginTop: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        width: "80%"
      }}
      onChangeText={props.onChangeText}
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor={theme.colors.text}
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

export function AuthButton(props: IAuthButton) {
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
