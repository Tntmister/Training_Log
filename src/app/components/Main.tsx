import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { UserProvider } from "../User"
import App from "./App"

export default function Main() {
  return (
    <UserProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </UserProvider>
  )
}
