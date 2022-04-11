import React, { useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import Nav from "./components/Nav"
import Auth from "./components/Auth"
import UserContext from "./UserContext"
import { UserProvider } from "./UserProvider"

function Main() {
  const user = useContext(UserContext)
  return (
    <UserProvider>
      {user ? (
        <NavigationContainer>
          <Nav />
        </NavigationContainer>
      ) : (
        <Auth />
      )}
    </UserProvider>
  )
}

export default Main
