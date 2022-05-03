import React, { useState } from "react"
import { View, FlatList } from "react-native"
import Loading from "../../../reusable/Loading"
import { useTheme } from "../../../../providers/Theme"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "./ExerciseNav"
import ExerciseDescriptor from "./ExerciseDescriptor"
import { Text } from "../../../reusable/Text"
import ExerciseSearch from "./ExerciseSearch"
import { Exercise } from "../../../../../dataDefinition/data"

export default function ExerciseList({
  navigation
}: StackScreenProps<RootStackParamList, "ExerciseList">) {
  const theme = useTheme()

  const [loading, setLoading] = useState(true)
  const [exercises, setExercises] = useState<Exercise[]>([])

  return (
    <View
      style={{
        marginTop: theme.margins.s,
        alignItems: "center",
        width: "100%"
      }}
    >
      <ExerciseSearch setExercises={setExercises} setLoading={setLoading} />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={exercises}
          initialNumToRender={8}
          renderItem={({ item, index }) => (
            <ExerciseDescriptor
              key={index}
              theme={theme}
              exercise={item}
              navigation={navigation}
              onPress={() =>
                navigation.navigate("Exercise", { exercise: item })
              }
              checked={undefined}
            />
          )}
          getItemLayout={(data, index) => ({
            length: 70,
            offset: 70 * index,
            index
          })}
          ListEmptyComponent={<Text>No Exercises found!</Text>}
          style={{
            marginTop: theme.margins.s,
            width: "100%"
          }}
          contentContainerStyle={{
            flexDirection: "column",
            alignItems: "center"
          }}
          showsVerticalScrollIndicator={true}
        />
      )}
    </View>
  )
}
