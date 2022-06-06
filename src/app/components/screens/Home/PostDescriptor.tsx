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
  onPostPress
}: {
  post: Post;
  postId: string;
  onUserPress: (user: string) => void;
  onPostPress: (postId: string, post: Post) => void;
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
      height: theme.media.xs,
      width: theme.media.xs,
      //borderWidth: theme.borders.borderWidth_s,
      //borderColor: theme.colors.primary,
      borderRadius: theme.borders.borderRadius_m,
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
  const content = post.post
  console.log(content)
  const session = "model" in content
  const [userAuthor, setUserAuthor] = useState<User | undefined>(undefined)
  const [likes, setLikes] = useState(post.likes)
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    getUser(post.author).then((user) => setUserAuthor(user))
    getPostLiked(user.uid, postId).then((liked) => setLiked(liked))
  }, [])

  function onLikePress() {
    setLikes((prevLikes) => prevLikes + (liked ? -1 : 1))
    setLiked((state) => !state)
    toggleLikePost(user.uid, postId)
  }

  return (
    <TouchableOpacity
      onPress={onPostPress.bind(null, postId, post)}
      style={styles.container}
    >
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
        <Text style={[theme.text.body_l, { marginLeft: theme.margins.m }]}>
          {userAuthor?.username}
        </Text>
      </InlineView>
      {userAuthor && (
        <Text style={styles.actionText}>
          {`${
            session
              ? content.name == ""
                ? STRS.home.completedATS
                : STRS.home.completedTheTS
              : STRS.home.sharedTM
          }`}
        </Text>
      )}
      {session ? (
        <SessionDescriptor sessionId={postId} session={content} onPost={true} />
      ) : (
        <ModelDescriptor model={content} modelId={postId} onPost={true} />
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
          onPress={user.uid != post.author ? onLikePress : undefined}
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
