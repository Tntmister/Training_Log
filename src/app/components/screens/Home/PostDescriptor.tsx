import { CachedImage } from "@georstat/react-native-image-cache"
import React, { useEffect, useState } from "react"
import { Image, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native"
import { images } from "../../../lib/extra"
import { getUser } from "../../../lib/firebase/user"
import { TrainingModel, TrainingSession } from "../../../lib/types/train"
import { Post, User } from "../../../lib/types/user"
import { useTheme } from "../../../providers/Theme"
import InlineView from "../../reusable/InlineView"
import { Text } from "../../reusable/Text"
import SessionDescriptor from "../History/SessionDescriptor"
import ModelDescriptor from "../Train/Models/ModelDescriptor"

function PostDescriptor({
  post,
  onUserPress,
  onModelPress,
  onSessionPress
}: {
  post: Post;
  onUserPress: (user: string) => void;
  onModelPress: (model: TrainingModel) => void;
  onSessionPress: (session: TrainingSession) => void;
}) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      elevation: 6,
      width: "95%",
      height: 300,
      alignSelf: "center",
      marginTop: theme.margins.s,
      borderRadius: 10,
      backgroundColor: theme.colors.backdrop,
      padding: theme.paddings.m
    },
    img: {
      height: 60,
      width: 60,
      borderWidth: 1,
      borderColor: theme.colors.primary
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
  const [user, setUser] = useState<User | undefined>(undefined)
  useEffect(() => {
    getUser(post.author).then((user) => setUser(user))
  }, [post.author])

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
          {user?.profileURL ? (
            <CachedImage source={user.profileURL} style={styles.img} />
          ) : (
            <Image
              source={images.User}
              style={[styles.img, { tintColor: theme.colors.text }]}
            />
          )}
        </TouchableOpacity>
        <Text style={[theme.text.header, { marginLeft: theme.margins.m }]}>
          {user?.username}
        </Text>
      </InlineView>
      {user && (
        <Text style={styles.actionText}>
          {`${
            session
              ? activity.name == ""
                ? "Completed a training session"
                : "Completed the training session:"
              : "Shared the training model:"
          }`}
        </Text>
      )}
      {session ? (
        <SessionDescriptor
          sessionId={post.postId}
          onSessionPress={() => console.log("todo")}
          session={activity}
        />
      ) : (
        <ModelDescriptor
          model={activity}
          onModelPress={() => console.log("todo")}
          modelId={post.postId}
        />
      )}
    </TouchableOpacity>
  )
}

export default React.memo(PostDescriptor)
