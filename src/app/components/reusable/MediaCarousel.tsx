/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { View, Dimensions } from "react-native"
import Dots from "react-native-dots-pagination"
import PagerView from "react-native-pager-view"
import { useTheme } from "../../providers/Theme"
import { CachedImage } from "@georstat/react-native-image-cache"
import Loading from "./Loading"
import { Asset } from "react-native-image-picker"
import Video from "react-native-video"
import { Text } from "./Text"

export default function MediaCarousel({
  assets,
  style,
  ...props
}: { assets: Asset[] } & React.ComponentProps<typeof View>) {
  const theme = useTheme()
  const [activeImage, setActiveImage] = useState(0)
  return (
    <View
      style={{
        width: "100%",
        marginVertical: theme.margins.m,
        ...(typeof style === "object" ? style : {})
      }}
      {...props}
    >
      <PagerView
        orientation="horizontal"
        onPageScroll={(event) => {
          if (event.nativeEvent.offset === 0)
            setActiveImage(event.nativeEvent.position)
        }}
        style={{
          height: Dimensions.get("screen").width / (3 / 2)
        }}
        showPageIndicator={true}
      >
        {assets.map((asset, index) => {
          if (asset.type?.includes("image"))
            return (
              <CachedImage
                loadingImageComponent={Loading}
                key={index}
                style={{
                  width: Dimensions.get("window").width,
                  height: 400
                }}
                source={asset.uri!}
              />
            )
          else if (asset.type?.includes("video"))
            return (
              <Video
                resizeMode="contain"
                posterResizeMode="contain"
                poster={asset.uri}
                paused={activeImage != index}
                repeat={true}
                style={{
                  width: Dimensions.get("window").width,
                  height: 400
                }}
                key={index}
                source={{ uri: asset.uri, type: asset.type }}
              />
            )
          else return <Text key={index}>Error reading media.</Text>
        })}
      </PagerView>
      {assets.length > 1 && (
        <Dots
          activeColor={theme.colors.primary}
          length={assets.length}
          active={activeImage}
        />
      )}
    </View>
  )
}
