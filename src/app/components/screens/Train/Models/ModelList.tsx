import React, { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "../../../../providers/Theme"
import { Button } from "../../../reusable/Button"
import { Text } from "../../../reusable/Text"
import { TrainingModelType } from "../../../../../dataDefinition/data"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "./ModelNav"

export default function ModelList({
  navigation
}: StackScreenProps<RootStackParamList, "ModelList">) {
  const theme = useTheme()
  const [listOfModels, setListofModels] = useState(
    useState<TrainingModelType | undefined>(undefined)
  )

  useEffect(() => {
    console.log("Getting training models from db")
  }, [])

  return (
    <>
      <Button
        style={{
          marginTop: theme.margins.s,
          marginBottom: theme.margins.s
        }}
        onPress={() => navigation.navigate("CreateModel")}
      >
        Create your own Training Model
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
