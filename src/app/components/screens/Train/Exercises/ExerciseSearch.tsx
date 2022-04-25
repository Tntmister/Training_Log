import React, { SetStateAction, useEffect, useMemo, useState } from "react"
import { Button } from "../../../reusable/Button"
import DropDown from "react-native-paper-dropdown"
import { Menu, Searchbar } from "react-native-paper"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import {
  categories as categoryList,
  muscles as muscleList,
  equipments as equipmentList,
  getExercises
} from "../../../../lib/exercises"
import { useTheme } from "../../../../providers/Theme"
import { View } from "react-native"
import { exercises } from "../../../../assets/exercises"

export default function ExerciseSearch({
  setListOfExs
}: {
  setListOfExs: React.Dispatch<SetStateAction<typeof exercises | undefined>>;
}) {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  const [categoryVisible, setCatVisible] = useState(false)
  const [muscleVisible, setMuscleVisible] = useState(false)
  const [equipmentVisible, setEquipmentVisible] = useState(false)
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [muscle, setMuscle] = useState<string | undefined>(undefined)
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
    <>
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
    </>
  )
}
