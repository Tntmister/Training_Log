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
      borderRadius: theme.borders.borderRadius_m,
      backgroundColor: theme.colors.backdrop,
      paddingVertical: theme.paddings.m,
      paddingHorizontal: theme.paddings.l
    },
    img: {
      height: theme.media.m,
      width: theme.media.m,
      borderWidth: theme.borders.borderWidth_s,
      borderColor: theme.colors.primary,
      borderRadius: theme.borders.borderRadius_m,
      overflow: "hidden"
    },
    inline: {
      width: "100%",
      justifyContent: "flex-start",
      marginTop: theme.margins.s,
      marginHorizontal: theme.margins.m
    },
    infoContainer: {
      flexGrow: 1,
      height: "100%",
      paddingLeft: theme.paddings.m
    },
    name: {
      ...theme.text.body_l
    },
    bio: {
      marginLeft: theme.margins.xs,
      marginTop: theme.margins.xs,
      ...theme.text.body_m
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
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>
      </InlineView>
    </TouchableOpacity>
  )
}

export default React.memo(UserDescriptor)
