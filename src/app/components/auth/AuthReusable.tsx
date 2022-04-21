import React, { Dispatch, SetStateAction } from "react"
import { StyleSheet } from "react-native"
import { TextInput as PaperTextInput, useTheme } from "react-native-paper"

type ITextInput = {
  onChangeText: Dispatch<SetStateAction<string>>;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
};

export function AuthTextInput(props: ITextInput) {
  const theme = useTheme()

  return (
    <PaperTextInput
      style={{
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
      placeholderTextColor={theme.colors.placeholder}
      secureTextEntry={props.secureTextEntry}
    />
  )
}

export const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10
  },
  button: {
    width: "80%",
    borderRadius: 50,
    marginTop: 16
  }
})
