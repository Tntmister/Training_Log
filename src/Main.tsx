import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import Nav from "./app/components/Nav"
import Style from "./app/styles/styles"

function Main() {
  return (
    <NavigationContainer>
      <Nav style={Style} />
    </NavigationContainer>
  )
}

export default Main
