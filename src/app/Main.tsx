import "react-native-gesture-handler"
import React from "react"
import { UserProvider } from "./providers/User"
import App from "./App"
import { PaperNavigationProvider } from "./providers/Theme"

export default function Main() {
  return (
    <UserProvider>
      <PaperNavigationProvider>
        <App />
      </PaperNavigationProvider>
    </UserProvider>
  )
}
