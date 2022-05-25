import { CachedImage } from "@georstat/react-native-image-cache"
import React, { useContext, useEffect, useState } from "react"
import { Image, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native"
import { IconButton } from "react-native-paper"
import { images } from "../../../lib/extra"
import {
  getPostLiked,
  getUser,
  toggleLikePost
} from "../../../lib/firebase/user"
import { TrainingModel, TrainingSession } from "../../../lib/types/train"
import { Post, User } from "../../../lib/types/user"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../providers/Theme"
import { UserContext } from "../../../providers/User"
import InlineView from "../../reusable/InlineView"
import { Text } from "../../reusable/Text"
import SessionDescriptor from "../History/SessionDescriptor"
import ModelDescriptor from "../Train/Models/ModelDescriptor"

function PostDescriptor({
  post,
  postId,
  onUserPress,
  onModelPress,
  onSessionPress
}: {
  post: Post;
  postId: string;
  onUserPress: (user: string) => void;
  onModelPress: (model: TrainingModel) => void;
  onSessionPress: (session: TrainingSession) => void;
}) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const user = useContext(UserContext)!
  const styles = StyleSheet.create({
    container: {
      elevation: 6,
      width: "95%",
      //height: 300,
      alignSelf: "center",
      marginTop: theme.margins.s,
      borderRadius: theme.borders.borderRadius_m,
      backgroundColor: theme.colors.backdrop,
      padding: theme.paddings.m
    },
    img: {
      height: 60,
      width: 60,
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
    },
    actionText: {
      marginVertical: theme.margins.s,
      marginHorizontal: theme.margins.m
    }
  })
  const activity = post.post
  const session = "model" in activity
  const [userAuthor, setUserAuthor] = useState<User | undefined>(undefined)
  useEffect(() => {
    getUser(post.author).then((user) => setUserAuthor(user))
  }, [post.author])

  const [likes, setLikes] = useState(post.likes)
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    getPostLiked(user.uid, postId).then((liked) => setLiked(liked))
  }, [])

  //console.log("POST ->", post.post.name, "| author ->", post.author)
  return (
    <TouchableOpacity
      onPress={
        session ? () => onSessionPress(activity) : () => onModelPress(activity)
      }
      style={styles.container}
    >
      {/* TODO: converter isto de forma a colocar no theme.strings */}
      <InlineView style={styles.inline}>
        <TouchableOpacity onPress={() => onUserPress(post.author)}>
          {userAuthor?.profileURL ? (
            <CachedImage source={userAuthor.profileURL} style={styles.img} />
          ) : (
            <Image
              source={images.User}
              style={[styles.img, { tintColor: theme.colors.text }]}
            />
          )}
        </TouchableOpacity>
        <Text style={[theme.text.header, { marginLeft: theme.margins.m }]}>
          {userAuthor?.username}
        </Text>
      </InlineView>
      {userAuthor && (
        <Text style={styles.actionText}>
          {`${
            session
              ? activity.name == ""
                ? STRS.home.completedATS
                : STRS.home.completedTheTS
              : STRS.home.sharedTM
          }`}
        </Text>
      )}
      {session ? (
        <SessionDescriptor
          sessionId={postId}
          onSessionPress={() => {
            console.log(activity)
            onSessionPress(activity)
          }}
          session={activity}
        />
      ) : (
        <ModelDescriptor
          model={activity}
          onModelPress={() => onModelPress(activity)}
          modelId={postId}
        />
      )}
      <InlineView style={{ paddingHorizontal: theme.paddings.l }}>
        <Text
          style={{
            flexGrow: 1,
            height: "100%"
          }}
        >
          {post.authorComment}
        </Text>
        <IconButton
          onPress={() => {
            setLikes((prevLikes) => prevLikes + (liked ? -1 : 1))
            setLiked((state) => !state)
            toggleLikePost(user.uid, postId)
          }}
          style={{
            backgroundColor: liked
              ? theme.colors.primary
              : theme.colors.backdrop
          }}
          icon={"heart"}
        />
        <Text>{likes}</Text>
      </InlineView>
    </TouchableOpacity>
  )
}

export default React.memo(PostDescriptor)
