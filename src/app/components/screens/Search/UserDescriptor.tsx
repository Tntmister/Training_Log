import { CachedImage } from "@georstat/react-native-image-cache"
import React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { images } from "../../../lib/extra"
import { User } from "../../../lib/types/user"
import { useTheme } from "../../../providers/Theme"
import InlineView from "../../reusable/InlineView"
import { Text } from "../../reusable/Text"

function UserDescriptor({
  uid,
  user,
  onUserPress
}: {
  uid: string;
  user: User;
  onUserPress: (user: string) => void;
}) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      elevation: 6,
      width: "95%",
      alignSelf: "center",
      marginTop: theme.margins.s,
      borderRadius: 10,
      backgroundColor: theme.colors.backdrop,
      padding: theme.paddings.m
    },
    img: {
      height: 80,
      width: undefined,
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 10,
      overflow: "hidden"
    },
    inline: {
      width: "100%",
      justifyContent: "flex-start",
      marginTop: theme.margins.s,
      marginHorizontal: theme.margins.m
    }
  })
  return (
    <TouchableOpacity style={styles.container} onPress={() => onUserPress(uid)}>
      <InlineView>
        {user?.profileURL ? (
          <CachedImage source={user.profileURL} style={styles.img} />
        ) : (
          <Image
            source={images.User}
            style={[styles.img, { tintColor: theme.colors.text }]}
          />
        )}
        <View
          style={{
            flexGrow: 1,
            height: "100%",
            paddingLeft: theme.paddings.m
          }}
        >
          <Text style={theme.text.header}>{user.username}</Text>
          <Text style={theme.text.body_m}>{user.bio}</Text>
        </View>
      </InlineView>
    </TouchableOpacity>
  )
}

export default React.memo(UserDescriptor)
