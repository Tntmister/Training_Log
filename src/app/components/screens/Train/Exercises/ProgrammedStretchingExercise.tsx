import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import {
  StretchingSetType,
  StretchingSet as Set,
  Exercise
} from "../../../../../dataDefinition/data"
import { Theme } from "../../../../providers/Theme"
import { Button } from "../../../reusable/Button"
import InlineContainer from "../../../reusable/InlineContainer"
import { Text } from "../../../reusable/Text"
import StretchingSet from "./Sets/StretchingSet"

export default function ProgrammedStretchingExercise({
  theme,
  exNum,
  exercise,
  onSetChange
}: {
  theme: Theme;
  exNum: number;
  exercise: Exercise;
  onSetChange: (exNum: number, sets: StretchingSetType[]) => void;
}) {
  const [sets, setSets] = useState<StretchingSetType[]>([])

  useEffect(() => {
    setSets(exercise.sets as StretchingSetType[])
  }, [])

  useEffect(() => {
    onSetChange(exNum, sets)
    console.log(`(PRE) SETS EXERCICIO ${exNum} -> ${JSON.stringify(sets)} `)
  }, [sets])

  function handleChangeWeight(setIndex: number, weight: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, weight: weight } : set
      )
    })
  }

  function handleChangeWDuration(setIndex: number, dur: string) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, wantedDuration: dur } : set
      )
    })
  }

  function handleChangeDuration(setIndex: number, dur: string) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, duration: dur } : set
      )
    })
  }

  function deleteSet(setIndex: number) {
    setSets((prevSets) => {
      console.log(
        `DELETING SET N ${setIndex}:  ${JSON.stringify(prevSets[setIndex])}`
      )
      return prevSets.filter((set, index) => index != setIndex)
    })
  }
  function addSet() {
    setSets((prevSets) => [...prevSets, new Set()])
  }

  const setElements = (exercise.sets as StretchingSetType[]).map(
    (set, index) => (
      <StretchingSet
        theme={theme}
        model={true}
        setNum={index}
        key={index}
        weight={set.weight}
        wantedDuration={set.wantedDuration}
        duration={set.duration}
        onChangeWeight={handleChangeWeight}
        onChangeWDuration={handleChangeWDuration}
        onChangeDuration={handleChangeDuration}
        onDeletePress={deleteSet}
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
            color: theme.colors.primary
          }}
        >
          Set
        </Text>
        <Text
          style={{
            ...styles.weight,
            ...styles.subtitle,
            color: theme.colors.primary
          }}
        >
          Weight
        </Text>
        <Text
          style={{
            ...styles.goalTime,
            ...styles.subtitle,
            color: theme.colors.primary
          }}
        >
          Goal Time
        </Text>
        <Text
          style={{
            ...styles.time,
            ...styles.subtitle,
            color: theme.colors.primary
          }}
        >
          Time
        </Text>
        <Text
          style={{
            ...styles.del,
            ...styles.subtitle,
            color: theme.colors.primary
          }}
        >
          {""}
        </Text>
      </InlineContainer>

      {setElements}

      <Button
        style={{
          marginTop: theme.margins.m,
          marginBottom: theme.margins.s
        }}
        onPress={addSet}
      >
        Add Set
      </Button>
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
