import React, { useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import Nav from "./Nav"
import Auth from "./Auth"
import UserContext from "../UserContext"
import { UserProvider } from "../UserProvider"
import Style from "../styles/styles"

export default function Main() {
  const DEBUG = true
  const user = useContext(UserContext)
  return (
    <UserProvider>
      {user || DEBUG ? (
        <NavigationContainer>
          <Nav style={Style} />
        </NavigationContainer>
      ) : (
        <Auth />
      )}
    </UserProvider>
  )
}
