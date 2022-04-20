import React, { Dispatch, SetStateAction, useContext } from "react"
import { Pressable } from "react-native"
import { Text, TextInput } from "react-native-paper"
import { ThemeContext } from "../../App"

interface ITextInput {
  onChangeText: Dispatch<SetStateAction<string>>;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

export function AuthTextInput(props: ITextInput) {
  const theme = React.useContext(ThemeContext)

  return (
    <TextInput
      style={{
        fontSize: 20,
        textAlignVertical: "bottom",
        marginTop: 20,
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
