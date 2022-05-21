import { CachedImage } from "@georstat/react-native-image-cache"
import React, { useContext, useState } from "react"
import {
  Alert,
  ScrollView,
  StyleSheet,
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
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../providers/Theme"
import InlineView from "./InlineView"

export default function MediaSelector({
  assets,
  deletedAssets,
  style,
  ...props
}: { assets: Asset[]; deletedAssets?: Asset[] } & ViewProps) {
  const [assetsState, setAssetsState] = useState(assets)
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const styles = StyleSheet.create({
    btn: {
      borderRadius: theme.borders.borderRadius_s,
      backgroundColor: theme.colors.primary
    },
    img: {
      width: theme.media.l,
      height: theme.media.l,
      marginRight: theme.margins.s
    }
  })
  function onImageDelete(imgNum: number) {
    Alert.alert(STRS.deleteImage, STRS.confirmDeleteImage, [
      {
        text: STRS.yes,
        onPress: () => {
          deletedAssets?.push(assets[imgNum])
          setAssetsState((prevAssets) =>
            prevAssets.filter((_, index) => imgNum != index)
          )
          assets.splice(imgNum, 1)
        }
      },
      { text: STRS.no }
    ])
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
      <InlineView>
        <IconButton
          size={theme.icons.s}
          icon="file-upload"
          onPress={() => {
            launchImageLibrary({
              mediaType: "mixed",
              videoQuality: "high",
              selectionLimit: 5,
              quality: 0.2
            }).then(onCameraExit)
          }}
          style={styles.btn}
        />
        <IconButton
          size={theme.icons.s}
          icon="video"
          onPress={() => {
            launchCamera({
              mediaType: "video",
              videoQuality: "low"
            }).then(onCameraExit)
          }}
          style={styles.btn}
        />
        <IconButton
          size={theme.icons.s}
          icon="video-image"
          onPress={() => {
            launchCamera({
              mediaType: "photo",
              quality: 0.2
            }).then(onCameraExit)
          }}
          style={styles.btn}
        />
      </InlineView>
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
            onLongPress={() => onImageDelete(index)}
          >
            <>
              <CachedImage
                key={asset.uri!}
                noCache={asset.uri?.startsWith("file")}
                resizeMode={"cover"}
                style={styles.img}
                source={asset.uri!}
              />
            </>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
