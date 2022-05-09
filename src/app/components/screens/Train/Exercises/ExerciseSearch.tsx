import React, { SetStateAction, useCallback, useEffect, useState } from "react"
import { Button } from "../../../reusable/Button"
import DropDown from "react-native-paper-dropdown"
import { Menu, Searchbar } from "react-native-paper"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import {
  categories as categoryList,
  muscles as muscleList,
  equipments as equipmentList,
  searchExercises,
  initExercises,
  exercises
} from "../../../../lib/exercises"
import { useTheme } from "../../../../providers/Theme"
import { View, ViewStyle } from "react-native"
import { Exercise } from "../../../../../dataDefinition/data"

export default function ExerciseSearch({
  setExercises,
  setLoading
}: {
  setExercises: React.Dispatch<SetStateAction<Exercise[]>>;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  // visibilidade dos menus
  const [categoryVisible, setCatVisible] = useState(false)
  const [muscleVisible, setMuscleVisible] = useState(false)
  const [equipmentVisible, setEquipmentVisible] = useState(false)

  // filtros selecionados
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [muscle, setMuscle] = useState<string | undefined>(undefined)
  const [equipments, setEquipments] = useState("")

  const categorySet = useCallback(
    () =>
      categoryList.map((value) => (
        <Menu.Item
          onPress={() => {
            setCategory(value)
            setCatVisible(false)
          }}
          title={value}
          key={value}
        />
      )),
    [categoryList]
  )
  const muscleSet = useCallback(
    () =>
      muscleList.map((value) => (
        <Menu.Item
          onPress={() => {
            setMuscle(value)
            setMuscleVisible(false)
          }}
          title={value}
          key={value}
        />
      )),
    [muscleList]
  )
  const equipmentSet = useCallback(
    () => equipmentList.map((value) => ({ label: value, value: value })),
    [equipmentList]
  )

  const [init, setInit] = useState(true)
  useEffect(() => {
    const initEx = async () => {
      await initExercises()
      setInit(false)
      setExercises(exercises)
      setLoading(false)
    }
    initEx()
  }, [])
  useEffect(() => {
    if (!init) {
      setLoading(true)
      const timeout = setTimeout(() => {
        setExercises(
          searchExercises(searchQuery, category, muscle, equipments)
        )
        setLoading(false)
      }, 200)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [searchQuery, category, muscle, equipments])

  const filterButtonStyle: ViewStyle = {
    width: "100%",
    borderColor: theme.colors.placeholder,
    borderWidth: 1
  }

  return (
    <View
      style={{
        marginTop: theme.margins.s,
        alignItems: "center",
        alignSelf: "center",
        width: "95%"
      }}
    >
      <Searchbar
        placeholder="Search Exercises"
        placeholderTextColor={theme.colors.placeholder}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{
          height: RFValue(36),
          borderRadius: 10
        }}
        selectionColor={theme.colors.primary}
        inputStyle={[theme.text.body_l, { padding: 0 }]}
      />
      <View
        style={{
          height: 80,
          flexDirection: "row",
          marginTop: theme.margins.s
        }}
      >
        <View style={{ width: "40%", justifyContent: "space-between" }}>
          <Menu
            visible={categoryVisible}
            onDismiss={() => setCatVisible(false)}
            anchor={
              <Button
                mode="outlined"
                style={filterButtonStyle}
                labelStyle={theme.text.body_s}
                onPress={() => setCatVisible(true)}
              >
                {category === undefined ? "Category: Any" : category}
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                setCategory(undefined)
                setCatVisible(false)
              }}
              title="Any"
            />
            {categorySet()}
          </Menu>
          <Menu
            visible={muscleVisible}
            onDismiss={() => setMuscleVisible(false)}
            anchor={
              <Button
                mode="outlined"
                style={filterButtonStyle}
                labelStyle={theme.text.body_s}
                onPress={() => setMuscleVisible(true)}
              >
                {muscle === undefined ? "Muscle: Any" : muscle}
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
            {muscleSet()}
          </Menu>
        </View>
        <View
          style={{
            height: 80,
            marginHorizontal: theme.margins.s,
            flexGrow: 1
          }}
        >
          {
            <DropDown
              inputProps={{
                style: { height: 80 - theme.margins.m }
              }}
              dropDownContainerHeight={RFPercentage(50)}
              label="Equipment"
              mode="outlined"
              visible={equipmentVisible}
              showDropDown={() => setEquipmentVisible(true)}
              onDismiss={() => setEquipmentVisible(false)}
              value={equipments}
              dropDownItemTextStyle={theme.text.body_m}
              setValue={setEquipments}
              list={equipmentSet()}
              multiSelect
            />
          }
        </View>
      </View>
    </View>
  )
}
