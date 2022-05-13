import React, { useContext, useEffect, useState } from "react"
import { FlatList, StyleSheet } from "react-native"
import { useTheme } from "../../../../providers/Theme"
import { Text } from "../../../reusable/Text"
import { TrainingModel } from "../../../../../dataDefinition/data"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamListModelNav } from "./ModelNav"
import { UserContext } from "../../../../providers/User"
import { getModels } from "../../../../lib/firebaseFS"
import Loading from "../../../reusable/Loading"
import ModelDescriptor from "./ModelDescriptor"

export type TrainingModelDoc = {
  model: TrainingModel;
  id: string;
};

export default function ModelList({
  navigation
}: StackScreenProps<RootStackParamListModelNav, "ModelList">) {
  const theme = useTheme()
  const user = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [models, setModels] = useState<TrainingModelDoc[]>([])

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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={models}
          initialNumToRender={8}
          renderItem={({ item, index }) => (
            <ModelDescriptor
              model={item}
              navigation={navigation}
              theme={theme}
              key={index}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>You have no Training Models!</Text>
          }
          style={styles.list}
        />
      )}
    </>
  )
}
