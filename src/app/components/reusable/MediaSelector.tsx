import { CachedImage } from "@georstat/react-native-image-cache"
import React, { useState } from "react"
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
  ViewProps
} from "react-native"
import {
  launchImageLibrary,
  launchCamera,
  Asset,
  ImagePickerResponse
} from "react-native-image-picker"
import { IconButton } from "react-native-paper"
import { useTheme } from "../../providers/Theme"
import InlineContainer from "./InlineView"

export default function MediaSelector({
  assets,
  deletedAssets,
  style,
  ...props
}: { assets: Asset[]; deletedAssets?: Asset[] } & ViewProps) {
  const [assetsState, setAssetsState] = useState(assets)
  const theme = useTheme()

  function onImageDelete(imgNum: number) {
    deletedAssets?.push(assets[imgNum])
    setAssetsState((prevAssets) =>
      prevAssets.filter((_, index) => imgNum != index)
    )
    assets.splice(imgNum, 1)
  }

  function onCameraExit(response: ImagePickerResponse) {
    console.log("Asset: ", response.assets)
    if (response.assets !== undefined) {
      setAssetsState((prevAssets) => [...prevAssets, ...response.assets!])
      assets.push(...response.assets)
    }
  }

  return (
    <View style={[{ marginTop: theme.margins.s }, style]} {...props}>
      <InlineContainer>
        <IconButton
          size={30}
          icon="file-upload"
          onPress={() => {
            launchImageLibrary({
              mediaType: "mixed",
              videoQuality: "high",
              selectionLimit: 5,
              quality: 0.2
            }).then(onCameraExit)
          }}
          style={{
            borderRadius: 5,
            backgroundColor: theme.colors.primary
          }}
        />
        <IconButton
          size={30}
          icon="video"
          onPress={() => {
            launchCamera({
              mediaType: "video",
              videoQuality: "low"
            }).then(onCameraExit)
          }}
          style={{
            borderRadius: 5,
            backgroundColor: theme.colors.primary
          }}
        />
        <IconButton
          size={30}
          icon="video-image"
          onPress={() => {
            launchCamera({
              mediaType: "photo",
              quality: 0.2
            }).then(onCameraExit)
          }}
          style={{
            borderRadius: 5,
            backgroundColor: theme.colors.primary
          }}
        />
      </InlineContainer>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={{ marginTop: theme.margins.s }}
        contentContainerStyle={{
          paddingHorizontal: theme.margins.m
        }}
      >
        {assetsState.map((asset, index) => (
          <TouchableOpacity
            key={index}
            onLongPress={() => {
              Alert.alert("Delete Image", "Delete the specified image?", [
                { text: "Yes", onPress: () => onImageDelete(index) },
                { text: "No" }
              ])
            }}
          >
            <>
              <CachedImage
                key={asset.uri!}
                noCache={asset.uri?.startsWith("file")}
                resizeMode={"cover"}
                style={{
                  width: 100,
                  height: 100,
                  marginRight: theme.margins.s
                }}
                source={asset.uri!}
              />
            </>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
