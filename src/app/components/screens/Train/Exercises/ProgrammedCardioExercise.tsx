import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import {
  CardioSetType,
  CardioSet as Set,
  Exercise
} from "../../../../../dataDefinition/data"
import { Theme } from "../../../../providers/Theme"
import { Button } from "../../../reusable/Button"
import InlineContainer from "../../../reusable/InlineContainer"
import { Text } from "../../../reusable/Text"
import CardioSet from "./Sets/CardioSet"

export default function ProgrammedCardioExercise({
  theme,
  exNum,
  exercise,
  onSetChange
}: {
  theme: Theme;
  exNum: number;
  exercise: Exercise;
  onSetChange: (exNum: number, sets: CardioSetType[]) => void;
}) {
  const [sets, setSets] = useState<CardioSetType[]>([])

  useEffect(() => {
    setSets(exercise.sets as CardioSetType[])
  }, [])

  useEffect(() => {
    onSetChange(exNum, sets)
    /* console.log(`(PRE) SETS EXERCICIO ${exNum} -> ${JSON.stringify(sets)} `) */
  }, [sets])

  function onWeightChange(setIndex: number, weight: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, weight: weight } : set
      )
    })
  }

  function onDistanceChange(setIndex: number, dist: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, distance: dist } : set
      )
    })
  }

  function onDurationChange(setIndex: number, dur: string) {
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

  const setElements = (exercise.sets as CardioSetType[]).map((set, index) => (
    <CardioSet
      theme={theme}
      model={true}
      setNum={index}
      key={index}
      weight={set.weight}
      duration={set.duration}
      distance={set.distance}
      onChangeWeight={onWeightChange}
      onChangeDistance={onDistanceChange}
      onChangeDuration={onDurationChange}
      onDeletePress={deleteSet}
    />
  ))
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
            ...styles.distance,
            ...styles.subtitle,
            color: theme.colors.primary
          }}
        >
          Distance
        </Text>
        <Text
          style={{
            ...styles.time,
            ...styles.subtitle,
            color: theme.colors.primary
          }}
        >
          Duration
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
  distance: {
    //backgroundColor: "green",
    width: "25%"
  },
  time: {
    //backgroundColor: "purple",
    width: "25%"
  },
  del: {
    //backgroundColor: "green",
    width: "15%"
  }
})
