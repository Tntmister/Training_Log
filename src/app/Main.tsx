import React, { useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import Nav from "./components/Nav"
import Auth from "./components/Auth"
import UserContext from "./UserContext"
import { UserProvider } from "./UserProvider"
import Style from "./styles/styles"

export default function Main() {
  const user = useContext(UserContext)
  return (
    <UserProvider>
      {user ? (
        <NavigationContainer>
          <Nav style={Style} />
        </NavigationContainer>
      ) : (
        <Auth />
      )}
    </UserProvider>
  )
}
