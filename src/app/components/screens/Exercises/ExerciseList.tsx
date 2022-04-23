import React, { useEffect, useState } from "react"
import { View, FlatList } from "react-native"
import { getExercises } from "../../../lib/exercises"
import Loading from "../../reusable/Loading"
import { Searchbar } from "react-native-paper"
import { useTheme } from "../../../providers/Theme"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "./ExerciseNav"
import { RFValue } from "react-native-responsive-fontsize"
import ExerciseDescriptor from "./ExerciseDescriptor"
import { Exercise } from "../../../../dataDefinition/data"
import { Text } from "../../reusable/Text"

export default function ExerciseList({
  navigation
}: StackScreenProps<RootStackParamList, "ExerciseList">) {
  const theme = useTheme()

  const [searchQuery, setSearchQuery] = useState("")
  const [listOfExs, setListOfExs] = useState<Exercise[] | undefined>([])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setListOfExs(getExercises(searchQuery))
    }, 100)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  return (
    <View
      style={{
        alignItems: "center",
        width: "100%"
      }}
    >
      <Searchbar
        placeholder="Search Exercises"
        placeholderTextColor={theme.colors.placeholder}
        onChangeText={(query) => {
          setListOfExs(undefined)
          setSearchQuery(query)
        }}
        value={searchQuery}
        style={{
          width: "95%",
          marginTop: theme.margins.s,
          height: 40,
          borderRadius: 10,
          backgroundColor: theme.colors.surface
        }}
        selectionColor={theme.colors.primary}
        inputStyle={{ fontSize: RFValue(18), paddingVertical: 0 }}
      />
      {listOfExs ? (
        <FlatList
          data={listOfExs}
          renderItem={({ item }) => (
            <ExerciseDescriptor
              key={item.name}
              exercise={item}
              onPress={() =>
                navigation.navigate("Exercise", { name: item.name })
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
