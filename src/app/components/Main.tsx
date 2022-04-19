import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { UserProvider } from "../User"
import App from "./App"
import { ThemeProvider } from "../styles/Theme"

export default function Main() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </UserProvider>
    </ThemeProvider>
  )
}
