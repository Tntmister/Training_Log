import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { Comment as CommentType } from "../../../lib/types/user"
import { RootStackParamPostNav } from "./Post"
import { VariableHeightTextInput } from "../../reusable/VariableHeightTextInput"
import InlineView from "../../reusable/InlineView"
import { Button } from "../../reusable/Button"
import { getRootComments, postComment } from "../../../lib/firebase/posts"
import { UserContext } from "../../../providers/User"
import { FlatList, StyleSheet } from "react-native"
import Comment from "./Comment"
import { useTheme } from "../../../providers/Theme"

export default function PostComments({
  route
}: StackScreenProps<RootStackParamPostNav, "PostComments">) {
  const user = useContext(UserContext)!
  const theme = useTheme()
  const postId = route.params.postId
  const styles = StyleSheet.create({
    commentInputContainer: {
      width: "90%",
      alignSelf: "center"
    },
    commmentInput: {
      marginRight: theme.margins.m,
      flexGrow: 1
    }
  })

  const [commentDocs, setCommentDocs] = useState<
  { id: string; comment: CommentType }[]
  >([])
  useEffect(() => {
    getRootComments(postId).then(setCommentDocs)
  }, [])

  const [commentBody, setCommentBody] = useState("")

  return (
    <>
      <InlineView style={styles.commentInputContainer}>
        <VariableHeightTextInput
          placeholder="Reply..."
          onChangeText={setCommentBody}
          value={commentBody}
          style={styles.commmentInput}
        />
        <Button
          onPress={() =>
            postComment(postId, commentBody, null).then((commentDoc) => {
              setCommentDocs((docs) => [
                { ...commentDoc, profileURL: user.photoURL },
                ...docs
              ])
            })
          }
          disabled={commentBody.length < 2}
        >
          Comment
        </Button>
      </InlineView>
      <FlatList
        data={commentDocs}
        renderItem={({ item }) => (
          <Comment commentDoc={item} postId={postId} key={item.id} />
        )}
      />
    </>
  )
}
