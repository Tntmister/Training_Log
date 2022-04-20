import React from "react"
import { UserProvider } from "./providers/User"
import App from "./App"
import { PaperNavigationProvider } from "./providers/Theme"

export default function Main() {
  return (
    <PaperNavigationProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PaperNavigationProvider>
  )
}
