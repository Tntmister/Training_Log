import React, { useContext, useEffect, useState } from "react"
import { FlatList, StyleSheet } from "react-native"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../providers/Theme"
import { Text } from "../../../reusable/Text"
import { TrainingModel } from "../../../../lib/types/train"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamListModelNav } from "./ModelNav"
import { UserContext } from "../../../../providers/User"
import { getModels } from "../../../../lib/firebase/models"
import Loading from "../../../reusable/Loading"
import ModelDescriptor from "./ModelDescriptor"
import { modelModes } from "./Model"

export default function ModelList({
  navigation
}: StackScreenProps<RootStackParamListModelNav, "ModelList">) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const user = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [models, setModels] = useState<{ model: TrainingModel; id: string }[]>(
    []
  )

  const NUM_TO_RENDER = 8

  const styles = StyleSheet.create({
    empty: {
      alignSelf: "center",
      marginTop: theme.margins.s
    },
    list: {
      marginTop: theme.margins.s,
      flex: 1
    }
  })

  useEffect(() => {
    const subscriber = getModels(user!.uid, (models) => {
      setModels(models)
      setLoading(false)
    })
    return () => subscriber()
  }, [])

  function onModelPress(
    model: TrainingModel,
    modelId: string,
    mode: modelModes
  ) {
    navigation.navigate("Model", {
      model: model,
      id: modelId,
      mode: mode
    })
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={models}
          initialNumToRender={NUM_TO_RENDER}
          renderItem={({ item, index }) => (
            <ModelDescriptor
              model={item.model}
              modelId={item.id}
              onModelPress={onModelPress}
              onPost={false}
              key={index}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              {STRS.train.models.noTrainingModels}
            </Text>
          }
          style={styles.list}
        />
      )}
    </>
  )
}
