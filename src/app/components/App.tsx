import React, { useContext } from "react"
import Nav from "./Nav"
import AuthNav from "./AuthNav"
import { UserContext } from "../User"
import Style from "../styles/styles"

export default function App() {
  const DEBUG = false
  const user = useContext(UserContext)

  return (
    <>{user?.emailVerified || DEBUG ? <Nav style={Style} /> : <AuthNav />}</>
  )
}
