import "react-native-gesture-handler"
import { CacheManager } from "@georstat/react-native-image-cache"
import { Dirs } from "react-native-file-access"
import React from "react"
import { UserProvider } from "./providers/User"
import App from "./App"
import { PaperNavigationProvider } from "./providers/Theme"

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images/`,
  blurRadius: 15,
  cacheLimit: 0,
  sourceAnimationDuration: 0,
  thumbnailAnimationDuration: 0
}

export default function Main() {
  return (
    <UserProvider>
      <PaperNavigationProvider>
        <App />
      </PaperNavigationProvider>
    </UserProvider>
  )
}
