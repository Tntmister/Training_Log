import React from "react"
import { StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { getUsername } from "../../../lib/firebase/auth"
import { TrainingModel, TrainingSession } from "../../../lib/types/train"
import { Post } from "../../../lib/types/user"
import { useTheme } from "../../../providers/Theme"
import { Text } from "../../reusable/Text"
import SessionDescriptor from "../History/SessionDescriptor"
import ModelDescriptor from "../Train/Models/ModelDescriptor"

function PostDescriptor({
  post,
  onModelPress,
  onSessionPress
}: {
  post: Post;
  onModelPress: (model: TrainingModel) => void;
  onSessionPress: (session: TrainingSession) => void;
}) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      width: "95%",
      height: 300,
      alignSelf: "center",
      marginTop: theme.margins.s,
      borderRadius: 10,
      backgroundColor: theme.colors.backdrop,
      padding: theme.paddings.m
    }
  })
  const activity = post.post
  const session = "model" in activity
  return (
    <TouchableOpacity
      onPress={
        session ? () => onSessionPress(activity) : () => onModelPress(activity)
      }
      style={styles.container}
    >
      {/* TODO: converter isto de forma a colocar no theme.strings */}
      <Text>
        {`${getUsername(post.author)} ${
          session
            ? activity.name == ""
              ? "completed a training session"
              : `completed the training session: ${activity.name}`
            : `shared the training model: ${activity.name}`
        }`}
      </Text>
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
