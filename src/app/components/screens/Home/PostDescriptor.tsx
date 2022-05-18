import React from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import { TrainingModel, TrainingSession } from "../../../lib/types/train"
import { useTheme } from "../../../providers/Theme"
import { Text } from "../../reusable/Text"

function PostDescriptor({
  post,
  onModelPress,
  onSessionPress
}: {
  post: TrainingSession | TrainingModel;
  onModelPress: (model: TrainingModel) => void;
  onSessionPress: (session: TrainingSession) => void;
}) {
  const theme = useTheme()
  const session = "model" in post
  return (
    <TouchableOpacity
      onPress={session ? () => onSessionPress(post) : () => onModelPress(post)}
      style={{
        paddingVertical: theme.paddings.l,
        paddingHorizontal: theme.paddings.s,
        alignContent: "center",
        width: "95%",
        alignSelf: "center"
      }}
    >
      <Text>
        {session ? "Session" : "Model"} - {post.name}
      </Text>
    </TouchableOpacity>
  )
}

export default React.memo(PostDescriptor)
