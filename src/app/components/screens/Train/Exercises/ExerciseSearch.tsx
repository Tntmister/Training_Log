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
  initExercises
} from "../../../../lib/exercises"
import { useTheme } from "../../../../providers/Theme"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Exercise } from "../../../../../dataDefinition/data"

export default function ExerciseSearch({
  setListOfExs
}: {
  setListOfExs: React.Dispatch<SetStateAction<Exercise[] | undefined>>;
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

  const [initializing, setInitializing] = useState(true)
  useEffect(() => {
    const init = async () => {
      await initExercises()
      setInitializing(false)
    }
    init()
  }, [])

  useEffect(() => {
    if (!initializing) {
      setListOfExs(undefined)
      const timeout = setTimeout(() => {
        setListOfExs(
          searchExercises(searchQuery, category, muscle, equipments)
        )
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [searchQuery, category, muscle, equipments, initializing])

  const filterButtonStyle: ViewStyle = {
    marginHorizontal: theme.margins.s,
    width: "100%",
    marginTop: 0,
    borderColor: theme.colors.placeholder,
    borderWidth: 1
  }

  const filterButtonLabelStyle: StyleProp<TextStyle> = {
    fontSize: RFValue(14)
  }

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
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View style={{ marginTop: theme.margins.s, flexBasis: 0, flexGrow: 1 }}>
          <Menu
            visible={categoryVisible}
            onDismiss={() => setCatVisible(false)}
            anchor={
              <Button
                mode="outlined"
                style={filterButtonStyle}
                labelStyle={filterButtonLabelStyle}
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
                style={{ ...filterButtonStyle, marginTop: theme.margins.s }}
                labelStyle={filterButtonLabelStyle}
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
            marginHorizontal: theme.margins.s,
            flexGrow: 1,
            flexBasis: 0
          }}
        >
          <DropDown
            inputProps={{
              style: { height: RFValue(86), paddingTop: 0 }
            }}
            dropDownContainerHeight={RFPercentage(50)}
            label="Equipment"
            mode="outlined"
            visible={equipmentVisible}
            showDropDown={() => setEquipmentVisible(true)}
            onDismiss={() => setEquipmentVisible(false)}
            value={equipments}
            setValue={setEquipments}
            list={equipmentSet()}
            multiSelect
          />
        </View>
      </View>
    </>
  )
}
