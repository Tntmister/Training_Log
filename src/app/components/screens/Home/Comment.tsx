import { CachedImage } from "@georstat/react-native-image-cache"
import React, { useContext, useEffect, useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import { images } from "../../../lib/extra"
import { Comment } from "../../../lib/types/user"
import { useTheme } from "../../../providers/Theme"
import InlineView from "../../reusable/InlineView"
import storage from "@react-native-firebase/storage"
import { VariableHeightTextInput } from "../../reusable/VariableHeightTextInput"
import { Button } from "../../reusable/Button"
import { Text } from "../../reusable/Text"
import { postComment } from "../../../lib/firebase/models"
import { UserContext } from "../../../providers/User"

export default function Comment({
  postId,
  commentDoc
}: {
  postId: string;
  commentDoc: { id: string; comment: Comment };
}) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    img: {
      height: theme.media.l,
      width: theme.media.l,
      borderRadius: theme.borders.borderRadius_m,
      overflow: "hidden"
    }
  })
  const user = useContext(UserContext)!
  const [profileURL, setProfileURL] = useState<string>()
  useEffect(() => {
    storage()
      .ref(`users/${commentDoc.comment.author}/profile`)
      .getDownloadURL()
      .then(setProfileURL)
  }, [])

  const [replyBody, setReplyBody] = useState("")
  const [reply, setReply] = useState(false)

  return (
    <View>
      <InlineView style={{ width: "95%" }}>
        {profileURL ? (
          <CachedImage source={profileURL} style={styles.img} />
        ) : (
          <Image
            source={images.User}
            style={[styles.img, { tintColor: theme.colors.text }]}
          />
        )}
        <Text>{commentDoc.comment.body}</Text>
        {!reply && (
          <Button onPress={() => setReply(true)} mode="text">
            Reply
          </Button>
        )}
      </InlineView>
      {reply && (
        <InlineView>
          <VariableHeightTextInput
            value={replyBody}
            onChangeText={setReplyBody}
          />
          <Button
            onPress={() =>
              postComment(user.uid, postId, replyBody, commentDoc.id)
            }
          >
            Reply
          </Button>
          <Button
            onPress={() => {
              setReply(false)
              setReplyBody("")
            }}
          >
            Cancel
          </Button>
        </InlineView>
      )}
    </View>
  )
}
