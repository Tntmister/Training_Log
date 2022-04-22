import React from "react"
import { ScrollView } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "../../../providers/Theme"
import { Button } from "../../reusable/Button"
import { Text } from "../../reusable/Text"

export default function ModelList() {
  const theme = useTheme()
  //const [listOfModels, setListofModels] = useState([])

  /*const [searchQuery, setSearchQuery] = useState("")
  const [listOfExs, setListOfExs] = useState(
    getExercises(searchQuery, onExClick)
  )
  const [selectedExercise, setSelectedExercise] = React.useState("")

  function onExClick(exName: string) {
    setSelectedExercise(exName)
  }
  getExercises(searchQuery, onExClick)
  
  console.log("SELECTED EXRCISE -> " + selectedExercise)*/
  return (
    <>
      <Button
        style={{ marginBottom: theme.margins.m }}
        onPress={() => console.log("Creating a new Training Model")}
      >
        Create a new Training Model
      </Button>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: theme.colors.backdrop
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Testes do ScrollView */}
        {Array.from(Array(20).keys()).map((value, key) => {
          return (
            <Text
              style={{
                fontSize: RFValue(14),
                marginTop: 4,
                height: 40,
                textAlign: "center",
                textAlignVertical: "center"
              }}
              key={key}
            >
              {value}
            </Text>
          )
        })}
        {/*{listOfModels}*/}
      </ScrollView>
    </>
  )
}
