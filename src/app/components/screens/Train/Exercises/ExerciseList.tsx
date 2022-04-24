import React, { useEffect, useMemo, useState } from "react"
import { View, FlatList } from "react-native"
import {
  categories as categoryList,
  muscles as muscleList,
  equipments as equipmentList,
  getExercises
} from "../../../../lib/exercises"
import Loading from "../../../reusable/Loading"
import { Menu, Searchbar } from "react-native-paper"
import { useTheme } from "../../../../providers/Theme"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "./ExerciseNav"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import ExerciseDescriptor from "./ExerciseDescriptor"
import { Text } from "../../../reusable/Text"
import { exercises } from "../../../../assets/exercises"
import { Button } from "../../../reusable/Button"
import DropDown from "react-native-paper-dropdown"

export default function ExerciseList({
  navigation
}: StackScreenProps<RootStackParamList, "ExerciseList">) {
  const theme = useTheme()

  const [searchQuery, setSearchQuery] = useState("")
  const [listOfExs, setListOfExs] = useState<typeof exercises | undefined>(
    undefined
  )

  const [categoryVisible, setCatVisible] = useState(false)
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [muscleVisible, setMuscleVisible] = useState(false)
  const [muscle, setMuscle] = useState<string | undefined>(undefined)
  const [equipmentVisible, setEquipmentVisible] = useState(false)
  const [equipments, setEquipments] = useState("")
  const [categoryItems, musclesItems, equipmentItems] = useMemo(
    () => [
      categoryList.map((value) => {
        return (
          <Menu.Item
            onPress={() => {
              setCategory(value)
              setCatVisible(false)
            }}
            title={value}
            key={value}
          />
        )
      }),
      muscleList.map((value) => {
        return (
          <Menu.Item
            onPress={() => {
              setMuscle(value)
              setMuscleVisible(false)
            }}
            title={value}
            key={value}
          />
        )
      }),
      equipmentList.map((value) => {
        return { label: value, value: value }
      })
    ],
    []
  )

  useEffect(() => {
    setListOfExs(undefined)
    const timeout = setTimeout(() => {
      setListOfExs(getExercises(searchQuery, category, muscle, equipments))
    }, 100)
    return () => clearTimeout(timeout)
  }, [searchQuery, category, muscle, equipments])

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
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{
          width: "95%",
          height: 40,
          borderRadius: 10,
          backgroundColor: theme.colors.surface
        }}
        selectionColor={theme.colors.primary}
        inputStyle={{ fontSize: RFValue(18), paddingVertical: 0 }}
      />
      <View
        style={{
          width: "95%",
          flexDirection: "row",
          justifyContent: "space-around"
        }}
      >
        <Menu
          visible={categoryVisible}
          onDismiss={() => setCatVisible(false)}
          anchor={<Button onPress={() => setCatVisible(true)}>Category</Button>}
        >
          <Menu.Item
            onPress={() => {
              setCategory(undefined)
              setCatVisible(false)
            }}
            title="Any"
          />
          {categoryItems}
        </Menu>
        <Menu
          visible={muscleVisible}
          onDismiss={() => setMuscleVisible(false)}
          anchor={
            <Button onPress={() => setMuscleVisible(true)}>
              Primary Muscle
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setMuscle(undefined)
              setMuscleVisible(false)
            }}
            title="Any"
          />
          {musclesItems}
        </Menu>
        <DropDown
          dropDownContainerHeight={RFPercentage(60)}
          label="Equipment"
          mode="outlined"
          visible={equipmentVisible}
          showDropDown={() => setEquipmentVisible(true)}
          onDismiss={() => setEquipmentVisible(false)}
          value={equipments}
          setValue={setEquipments}
          list={equipmentItems}
          multiSelect
        />
      </View>
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
