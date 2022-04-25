import React, { memo, useState } from "react"
import { View, FlatList } from "react-native"
import Loading from "../../../reusable/Loading"
import { useTheme } from "../../../../providers/Theme"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "./ExerciseNav"
import ExerciseDescriptor from "./ExerciseDescriptor"
import { Text } from "../../../reusable/Text"
import { exercises } from "../../../../assets/exercises"
import ExerciseSearch from "./ExerciseSearch"

export default function ExerciseList({
  navigation
}: StackScreenProps<RootStackParamList, "ExerciseList">) {
  const theme = useTheme()

  const [listOfExs, setListOfExs] = useState<typeof exercises | undefined>(
    undefined
  )

  return (
    <View
      style={{
        alignItems: "center",
        width: "100%"
      }}
    >
      <ExerciseSearch setListOfExs={setListOfExs} />
      {listOfExs ? (
        <FlatList
          data={listOfExs}
          renderItem={({ item, index }) => (
            <ExerciseDescriptor
              key={index}
              exercise={item}
              onPress={() =>
                navigation.navigate("Exercise", { exercise: item })
              }
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
      ) : (
        <Loading color={theme.colors.primary} marginVertical={50} />
      )}
    </View>
  )
}
