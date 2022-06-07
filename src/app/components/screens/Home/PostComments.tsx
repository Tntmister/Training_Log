import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { Comment as CommentType } from "../../../lib/types/user"
import { RootStackParamPostNav } from "./Post"
import { VariableHeightTextInput } from "../../reusable/VariableHeightTextInput"
import InlineView from "../../reusable/InlineView"
import { Button } from "../../reusable/Button"
import { getRootComments, postComment } from "../../../lib/firebase/models"
import { UserContext } from "../../../providers/User"
import { FlatList } from "react-native"
import Comment from "./Comment"

export default function PostComments({
  route
}: StackScreenProps<RootStackParamPostNav, "PostComments">) {
  const user = useContext(UserContext)!
  const postId = route.params.postId

  const [commentDocs, setCommentDocs] = useState<
  { id: string; comment: CommentType }[]
  >([])
  useEffect(() => {
    getRootComments(postId).then(setCommentDocs)
  }, [])

  const [commentBody, setCommentBody] = useState("")

  return (
    <>
      <InlineView>
        <VariableHeightTextInput
          placeholder="Reply..."
          onChangeText={setCommentBody}
          value={commentBody}
        />
        <Button
          onPress={() =>
            postComment(user.uid, postId, commentBody, null).then(
              (commentDoc) => {
                setCommentDocs((docs) => [commentDoc, ...docs])
              }
            )
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
