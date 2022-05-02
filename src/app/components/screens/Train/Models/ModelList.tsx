import React, { useContext, useEffect, useState } from "react"
import { FlatList } from "react-native"
import { useTheme } from "../../../../providers/Theme"
import { Button } from "../../../reusable/Button"
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
  id?: string;
};

export default function ModelList({
  navigation
}: StackScreenProps<RootStackParamListModelNav, "ModelList">) {
  const theme = useTheme()
  const user = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [models, setModels] = useState<TrainingModelDoc[]>([])

  useEffect(() => {
    const subscriber = getModels(user!.uid, (models) => {
      setModels(models)
      setLoading(false)
    })
    return () => subscriber()
  }, [])

  return (
    <>
      <Button
        style={{
          marginTop: theme.margins.s,
          marginBottom: theme.margins.s
        }}
        onPress={() => navigation.navigate("CreateModel", { exercises: [] })}
      >
        Create your own Training Model
      </Button>
      {loading ? (
        <Loading color={theme.colors.primary} marginVertical={50} />
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
          ListEmptyComponent={<Text>You have no training models!</Text>}
          style={{
            marginTop: theme.margins.s,
            flex: 1
          }}
        />
      )}
    </>
  )
}
