import firestore from "@react-native-firebase/firestore"
import BackgroundFetch from "react-native-background-fetch"
import { Comment } from "../types/user"
import notifee, { AuthorizationStatus } from "@notifee/react-native"
import { StringFormat } from "@firebase/storage"

export async function deletePost(postId: string) {
  return firestore().doc(`posts/${postId}`).delete()
}

export async function postComment(
  author: string,
  postId: string,
  body: string,
  parentComment: string | null
): Promise<{ id: string; comment: Comment }> {
  return new Promise((resolve) => {
    const comment: Comment = {
      author: author,
      body: body,
      date: Date.now(),
      parentID: parentComment,
      childIDs: []
    }
    firestore()
      .collection(`posts/${postId}/comments`)
      .add(comment)
      .then((documentReference) =>
        resolve({ id: documentReference.id, comment: comment })
      )
  })
}

export async function getRootComments(postId: string) {
  return getCommentReplies(postId, null)
}

export async function getCommentReplies(
  postId: string,
  commentId: string | null
) {
  return (
    await firestore()
      .collection(`posts/${postId}/comments`)
      .orderBy("date", "desc")
      .where("parentID", "==", commentId)
      .get()
  ).docs.map((doc) => ({
    id: doc.id,
    comment: doc.data() as Comment
  }))
}

export async function initBackgroundFetch(
  followingChunks: string[][],
  newest: number
) {
  notifee.requestPermission().then((value) => {
    if (value.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      if (followingChunks.length > 1) {
        BackgroundFetch.configure(
          {
            minimumFetchInterval: 15,
            requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY
          },
          async (taskId) => {
            let numPosts = 0
            for (const followingChunk of followingChunks) {
              numPosts += (
                await firestore()
                  .collection("posts")
                  .where("author", "in", followingChunk)
                  .orderBy("post.date", "desc")
                  .endBefore(newest)
                  .limit(10)
                  .get()
              ).size
              if (numPosts >= 10) break
            }
            if (numPosts > 0) {
              notifee.displayNotification({
                title: "New Training Posts From From Users You Follow!",
                body: `You have ${
                  numPosts > 10 ? "10+" : numPosts
                } new unseen posts from users you follow!`,
                android: {
                  channelId: await notifee.createChannel({
                    id: "default",
                    name: "New Posts"
                  })
                }
              })
            }
            BackgroundFetch.finish(taskId)
          },
          (taskId) => {
            console.warn(`background-fetch timeout: ${taskId}`)
            BackgroundFetch.finish(taskId)
          }
        )
      }
    }
  })
}

export async function reportPost(postId: string, reason: string) {
  //todo
}
