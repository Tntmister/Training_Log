import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import {
  StretchingSetClass,
  Exercise
} from "../../../../../dataDefinition/data"
import { useTheme } from "../../../../providers/Theme"
import InlineContainer from "../../../reusable/InlineView"
import { Text } from "../../../reusable/Text"
import { modelModes } from "../Models/Model"
import StretchingSet from "./Sets/StretchingSet"

export default function ProgrammedStretchingExercise({
  exNum,
  exercise,
  mode,
  onSetChange
}: {
  exNum: number;
  exercise: Exercise;
  onSetChange: (exNum: number, sets: StretchingSetClass[]) => void;
  mode: modelModes;
}) {
  const theme = useTheme()
  const [sets, setSets] = useState<StretchingSetClass[]>([])

  useEffect(() => {
    setSets(exercise.sets as StretchingSetClass[])
  }, [])

  useEffect(() => {
    onSetChange(exNum, sets)
    /* console.log(`(PRE) SETS EXERCICIO ${exNum} -> ${JSON.stringify(sets)} `) */
  }, [sets])

  function onSetCheckBox(setIndex: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, done: !set.done } : set
      )
    })
  }

  function onWeightChange(setIndex: number, weight: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, weight: weight } : set
      )
    })
  }

  function onChangeWDuration(setIndex: number, dur: string) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, wantedDuration: dur } : set
      )
    })
  }

  function onChangeDuration(setIndex: number, dur: string) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, duration: dur } : set
      )
    })
  }

  function deleteSet(setIndex: number) {
    setSets((prevSets) => {
      return prevSets.filter((set, index) => index != setIndex)
    })
  }
  function addSet() {
    setSets((prevSets) => [...prevSets, new StretchingSetClass()])
  }

  const setElements = (exercise.sets as StretchingSetClass[]).map(
    (set, index) => (
      <StretchingSet
        mode={mode}
        setNum={index}
        key={index}
        done={set.done}
        weight={set.weight}
        wantedDuration={set.wantedDuration}
        duration={set.duration}
        onChangeWeight={onWeightChange}
        onChangeWDuration={onChangeWDuration}
        onChangeDuration={onChangeDuration}
        onDeletePress={deleteSet}
        onSetCheckbox={onSetCheckBox}
      />
    )
  )
  return (
    <>
      <InlineContainer
        style={{ ...styles.subtitleContainer, marginTop: theme.margins.xs }}
      >
        <Text
          style={{
            ...styles.setNum,
            ...styles.subtitle,
            color: theme.colors.text
          }}
        >
          Set
        </Text>
        <Text
          style={{
            ...styles.weight,
            ...styles.subtitle,
            color: theme.colors.text
          }}
        >
          Weight
        </Text>
        <Text
          style={{
            ...styles.goalTime,
            ...styles.subtitle,
            color: theme.colors.text
          }}
        >
          Goal Time
        </Text>
        <Text
          style={{
            ...styles.time,
            ...styles.subtitle,
            color: theme.colors.text
          }}
        >
          Time
        </Text>
        <View
          style={{
            ...styles.del,
            ...styles.subtitle
          }}
        />
      </InlineContainer>

      {setElements}

      {mode == modelModes.Edit && (
        <IconButton
          color={theme.colors.primary}
          size={30}
          style={{
            width: "100%",
            alignSelf: "center"
          }}
          onPress={addSet}
          icon={"plus"}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  subtitleContainer: {
    justifyContent: "space-between"
  },
  subtitle: {
    textAlign: "center",
    fontSize: RFValue(18)
  },
  setNum: {
    //backgroundColor: "green",
    width: "10%"
  },
  weight: {
    //backgroundColor: "purple",
    width: "20%"
  },
  goalTime: {
    //backgroundColor: "green",
    width: "30%"
  },
  time: {
    //backgroundColor: "purple",
    width: "20%"
  },
  del: {
    //backgroundColor: "green",
    width: "15%"
  }
})
