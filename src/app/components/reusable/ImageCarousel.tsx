/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { View, Dimensions } from "react-native"
import Dots from "react-native-dots-pagination"
import PagerView from "react-native-pager-view"
import { useTheme } from "../../providers/Theme"
import { CachedImage } from "@georstat/react-native-image-cache"
import Loading from "./Loading"

export default function ImageCarousel({
  URLs,
  style,
  ...props
}: { URLs: string[] } & React.ComponentProps<typeof View>) {
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
        {URLs.map((url, index) => {
          return (
            <CachedImage
              loadingImageComponent={Loading}
              key={index}
              style={{
                width: 400,
                height: 400
              }}
              source={url}
            />
          )
        })}
      </PagerView>
      {URLs.length > 1 && (
        <Dots
          activeColor={theme.colors.primary}
          length={URLs.length}
          active={activeImage}
        />
      )}
    </View>
  )
}
