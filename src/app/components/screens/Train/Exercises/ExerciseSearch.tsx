import React, {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react"
import { Button } from "../../../reusable/Button"
import DropDown from "react-native-paper-dropdown"
import { Menu, Searchbar } from "react-native-paper"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import {
  categories as categoryList,
  muscles as muscleList,
  equipments as equipmentList,
  searchExercises
} from "../../../../lib/firebase/exercises"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../providers/Theme"
import { StyleSheet, View, ViewStyle } from "react-native"
import { Exercise } from "../../../../lib/types/train"
import { exercises } from "../../../../assets/exercises/exercises_en"
import { categoryIcons } from "../../../../lib/firebase/exercises"

export default function ExerciseSearch({
  setExercises,
  setLoading
}: {
  setExercises: React.Dispatch<SetStateAction<Exercise[]>>;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
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
      categoryList.map((value) => {
        return (
          <Menu.Item
            onPress={() => {
              setCategory(value)
              setCatVisible(false)
            }}
            icon={categoryIcons[value as keyof typeof categoryIcons]}
            title={value}
            key={value}
            titleStyle={{ color: useTheme().colors.text }}
            contentStyle={{ marginHorizontal: 0 }}
          />
        )
      }),
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
          titleStyle={{ color: useTheme().colors.text }}
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
    setInit(false)
    setExercises(exercises)
    setLoading(false)
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
    marginHorizontal: theme.margins.s,
    width: "100%",
    marginTop: 0,
    borderColor: theme.colors.placeholder,
    borderWidth: theme.borders.borderWidth_s
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: theme.margins.s,
      alignItems: "center"
    },
    search: {
      width: "95%",
      height: 40,
      borderRadius: 10,
      backgroundColor: theme.colors.surface
    },
    searchInput: {
      ...theme.text.body_l,
      paddingVertical: 0
    },
    btnContainer: {
      width: "95%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    btnLeftContainer: {
      marginTop: theme.margins.s,
      flexBasis: 0,
      flexGrow: 1
    },
    category: {
      ...filterButtonStyle
    },
    muscle: {
      ...filterButtonStyle,
      marginTop: theme.margins.s
    },
    btnLabel: {
      ...theme.text.body_s,
      marginHorizontal: 0,
      color: theme.colors.text
    },
    dropDownContainer: {
      marginHorizontal: theme.margins.s,
      flexGrow: 1,
      flexBasis: 0
    }
  })

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={STRS.train.exercises.searchExercises}
        placeholderTextColor={theme.colors.placeholder}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
        selectionColor={theme.colors.primary}
        inputStyle={styles.searchInput}
      />
      <View style={styles.btnContainer}>
        <View style={styles.btnLeftContainer}>
          <Menu
            visible={categoryVisible}
            onDismiss={() => setCatVisible(false)}
            anchor={
              <Button
                mode="outlined"
                style={styles.category}
                labelStyle={styles.btnLabel}
                onPress={() => setCatVisible(true)}
              >
                {category === undefined
                  ? `${STRS.train.exercises.category}: ${STRS.train.exercises.any}`
                  : category}
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                setCategory(undefined)
                setCatVisible(false)
              }}
              title={STRS.train.exercises.any}
            />
            {
              categorySet()
              //console.log(categorySet())
            }
          </Menu>
          <Menu
            visible={muscleVisible}
            onDismiss={() => setMuscleVisible(false)}
            anchor={
              <Button
                mode="outlined"
                style={styles.muscle}
                labelStyle={styles.btnLabel}
                onPress={() => setMuscleVisible(true)}
              >
                {muscle === undefined
                  ? `${STRS.train.exercises.muscle}: ${STRS.train.exercises.any}`
                  : muscle}
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                setMuscle(undefined)
                setMuscleVisible(false)
              }}
              title={STRS.train.exercises.any}
            />
            {muscleSet()}
          </Menu>
        </View>
        <View style={styles.dropDownContainer}>
          {
            <DropDown
              inputProps={{
                style: { height: RFValue(86), paddingTop: 0 }
              }}
              dropDownContainerHeight={RFPercentage(50)}
              label={STRS.train.exercises.equipment}
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
