import { CachedImage } from "@georstat/react-native-image-cache"
import React, { useContext, useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, View } from "react-native"
import { images } from "../../../lib/extra"
import { Comment as CommentType, User } from "../../../lib/types/user"
import { useTheme } from "../../../providers/Theme"
import InlineView from "../../reusable/InlineView"
import { VariableHeightTextInput } from "../../reusable/VariableHeightTextInput"
import { Button } from "../../reusable/Button"
import { Text } from "../../reusable/Text"
import { getCommentReplies, postComment } from "../../../lib/firebase/models"
import { UserContext } from "../../../providers/User"
import { IconButton } from "react-native-paper"
import { getUser } from "../../../lib/firebase/user"
import Reply from "./Reply"

export default function Comment({
  postId,
  commentDoc
}: {
  postId: string;
  commentDoc: { id: string; comment: CommentType };
}) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    card: {
      marginTop: theme.margins.m,
      borderRadius: 20,
      elevation: 10,
      alignSelf: "center",
      backgroundColor: theme.colors.backdrop,
      width: "90%",
      padding: theme.paddings.l
    },
    comment: {
      flex: 1
    },
    commentBody: {
      flexGrow: 1,
      marginLeft: theme.margins.s
    },
    img: {
      height: theme.media.m,
      width: theme.media.m,
      borderColor: theme.colors.primary,
      borderWidth: theme.borders.borderWidth_s,
      borderRadius: theme.borders.borderRadius_m,
      overflow: "hidden",
      marginTop: theme.margins.s
    }
  })
  const user = useContext(UserContext)!

  const [replyBody, setReplyBody] = useState("")
  const [viewReplies, setViewReplies] = useState(false)

  const [author, setAuthor] = useState<User>()
  useEffect(() => {
    getUser(commentDoc.comment.author).then((user) => setAuthor(user))
  }, [])

  const [repliesDocs, setRepliesDocs] = useState<
  { id: string; comment: CommentType }[]
  >([])
  useEffect(() => {
    getCommentReplies(postId, commentDoc.id).then(setRepliesDocs)
  }, [])
  return (
    <View style={styles.card}>
      <Text style={[theme.text.subHeader]}>{author?.username}</Text>
      <InlineView style={styles.comment}>
        {author?.profileURL ? (
          <CachedImage source={author.profileURL} style={styles.img} />
        ) : (
          <Image
            source={images.User}
            style={[styles.img, { tintColor: theme.colors.text }]}
          />
        )}
        <Text style={styles.commentBody}>{commentDoc.comment.body}</Text>
        <IconButton
          onPress={() => setViewReplies((view) => !view)}
          icon={viewReplies ? "chevron-up" : "chevron-down"}
        />
      </InlineView>
      {viewReplies && (
        <>
          <FlatList
            data={repliesDocs}
            renderItem={({ item }) => <Reply comment={item.comment} />}
          />
          <InlineView>
            <VariableHeightTextInput
              value={replyBody}
              onChangeText={setReplyBody}
            />
            <Button
              onPress={() =>
                postComment(user.uid, postId, replyBody, commentDoc.id).then(
                  (replyDoc) => {
                    setRepliesDocs((docs) => [
                      ...docs,
                      { ...replyDoc, profileURL: user.photoURL }
                    ])
                  }
                )
              }
            >
              Reply
            </Button>
          </InlineView>
        </>
      )}
    </View>
  )
}
