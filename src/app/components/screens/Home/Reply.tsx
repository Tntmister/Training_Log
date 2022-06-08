import { CachedImage } from "@georstat/react-native-image-cache"
import React, { useEffect, useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import { images } from "../../../lib/extra"
import { getUser } from "../../../lib/firebase/user"
import { Comment, User } from "../../../lib/types/user"
import { useTheme } from "../../../providers/Theme"
import InlineView from "../../reusable/InlineView"
import { Text } from "../../reusable/Text"

export default function Reply({ comment }: { comment: Comment }) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    img: {
      height: theme.media.s,
      width: theme.media.s,
      borderColor: theme.colors.primary,
      borderWidth: theme.borders.borderWidth_s,
      borderRadius: theme.borders.borderRadius_m,
      overflow: "hidden",
      marginTop: theme.margins.s
    },
    card: {
      marginTop: theme.margins.s,
      padding: theme.paddings.m,
      width: "90%",
      borderColor: theme.colors.background,
      borderWidth: theme.borders.borderWidth_s,
      alignSelf: "flex-end",
      borderRadius: theme.borders.borderRadius_m
    },
    comment: {
      flex: 1
    },
    commentBody: {
      flexGrow: 1,
      marginLeft: theme.margins.s
    }
  })
  const [author, setAuthor] = useState<User>()
  useEffect(() => {
    getUser(comment.author).then(setAuthor)
  }, [])

  return (
    <View style={styles.card}>
      <Text style={[theme.text.body_l]}>{author?.username}</Text>
      <InlineView style={styles.comment}>
        {author?.profileURL ? (
          <CachedImage source={author.profileURL} style={styles.img} />
        ) : (
          <Image
            source={images.User}
            style={[styles.img, { tintColor: theme.colors.text }]}
          />
        )}
        <Text style={styles.commentBody}>{comment.body}</Text>
      </InlineView>
    </View>
  )
}
