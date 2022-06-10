import React, { useContext, useState } from "react"
import { Alert, Image, TouchableOpacity, View } from "react-native"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../providers/Theme"
import { Text } from "../../../reusable/Text"
import { RFValue } from "react-native-responsive-fontsize"
import { IconButton, Menu } from "react-native-paper"
import { modelModes } from "./Model"
import { deleteModel, shareModel } from "../../../../lib/firebase/models"
import { TrainingModel } from "../../../../lib/types/train"
import prompt from "react-native-prompt-android"

function ModelDescriptor({
  model,
  modelId,
  onPost,
  onModelPress
}: {
  model: TrainingModel;
  modelId: string;
  onPost: boolean;
  onModelPress?: (
    model: TrainingModel,
    modelId: string,
    mode: modelModes
  ) => void;
}) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <TouchableOpacity
      onPress={onModelPress?.bind(null, model, modelId, modelModes.View)}
      style={{
        backgroundColor: theme.colors.backdrop,
        marginBottom: theme.margins.s,
        alignSelf: "center",
        paddingLeft: theme.paddings.l,
        paddingBottom: theme.paddings.l,
        width: "95%",
        borderRadius: 10,
        elevation: 6
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flexGrow: 1, fontSize: RFValue(18) }}>{model.name}</Text>
        {!onPost && (
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                onPress={() => setMenuVisible(true)}
                icon={"dots-vertical"}
              />
            }
          >
            <Menu.Item
              title={STRS.edit}
              onPress={() => {
                onModelPress!(model, modelId, modelModes.Edit),
                setMenuVisible(false)
              }}
            />
            <Menu.Item
              onPress={() =>
                Alert.alert(
                  STRS.train.models.deleteModel,
                  `${STRS.delete} "${model.name}"?`,
                  [
                    {
                      text: STRS.yes,
                      onPress: async () => {
                        await deleteModel(modelId)
                        setMenuVisible(false)
                      }
                    },
                    { text: STRS.no, onPress: () => setMenuVisible(false) }
                  ]
                )
              }
              title={STRS.train.models.deleteModel}
            />
            <Menu.Item
              onPress={() =>
                Alert.alert(
                  STRS.train.models.shareModel,
                  `${STRS.share} "${model.name}"?`,
                  [
                    {
                      text: STRS.yes,
                      onPress: async () => {
                        prompt(
                          STRS.train.models.shareModel,
                          STRS.train.confirmShare,
                          [
                            { text: STRS.cancel, style: "cancel" },
                            {
                              text: STRS.no,
                              onPress: () => {
                                setMenuVisible(false)
                              }
                            },
                            {
                              text: STRS.yes,
                              onPress: (comment) => {
                                console.log(comment)
                                shareModel(model, {
                                  comment: comment
                                })
                                setMenuVisible(false)
                              }
                            }
                          ],
                          { placeholder: STRS.comment }
                        )
                        setMenuVisible(false)
                      }
                    },
                    { text: STRS.no, onPress: () => setMenuVisible(false) }
                  ]
                )
              }
              title={STRS.train.models.shareModel}
            />
          </Menu>
        )}
      </View>
      <View>
        <>
          {model.exercises.map((ex, key) => (
            <Text style={{ fontSize: RFValue(14) }} key={key}>
              {ex.sets.length} {STRS.train.exercises.times} {ex.name}
            </Text>
          ))}
        </>
        <Image
          style={{
            borderRadius: 10,
            width: 80,
            height: 80,
            marginLeft: "auto",
            marginRight: theme.margins.m
          }}
          source={{ uri: model.mediaContent[0]?.uri }}
        />
      </View>
    </TouchableOpacity>
  )
}
export default React.memo(ModelDescriptor)
