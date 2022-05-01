import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import {
  Exercise,
  WESet as Set,
  WESetType
} from "../../../../../dataDefinition/data"
import { Theme } from "../../../../providers/Theme"
import { Button } from "../../../reusable/Button"
import InlineContainer from "../../../reusable/InlineContainer"
import { Text } from "../../../reusable/Text"
import WESet from "./Sets/WESet"

export default function ProgrammedRegularExercise({
  theme,
  exNum,
  exercise,
  onSetChange
}: {
  theme: Theme;
  exNum: number;
  exercise: Exercise;
  onSetChange: (exNum: number, sets: WESetType[]) => void;
}) {
  const [sets, setSets] = useState<WESetType[]>([])

  useEffect(() => {
    setSets(exercise.sets as WESetType[])
  }, [])

  function handleChangeWeight(setIndex: number, weight: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, weight: weight } : set
      )
    })
  }

  function handleChangeRepMin(setIndex: number, newMin: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex
          ? { ...set, repRange: [newMin, set.repRange[1]] }
          : set
      )
    })
  }

  function handleChangeRepMax(setIndex: number, newMax: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex
          ? { ...set, repRange: [set.repRange[0], newMax] }
          : set
      )
    })
  }

  function addSet() {
    setSets((prevSets) => [...prevSets, new Set()])
  }

  function deleteSet(setIndex: number) {
    setSets((prevSets) => {
      /*console.log(
        `DELETING SET N ${setIndex}:  ${JSON.stringify(prevSets[setIndex])}`
      )*/
      return prevSets.filter((set, index) => index != setIndex)
    })
  }

  useEffect(() => {
    onSetChange(exNum, sets)
    //console.log(`(PRE) SETS EXERCICIO ${exNum} -> ${JSON.stringify(sets)} `)
  }, [sets])

  const setElements = (exercise.sets as WESetType[]).map((set, index) => (
    <WESet
      theme={theme}
      model={true}
      setNum={index}
      key={index}
      weight={set.weight}
      min={set.repRange[0]}
      max={set.repRange[1]}
      onChangeWeight={handleChangeWeight}
      onChangeRepMin={handleChangeRepMin}
      onChangeRepMax={handleChangeRepMax}
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
            ...styles.repRange,
            ...styles.subtitle,
            color: theme.colors.primary
          }}
        >
          Rep. Range
        </Text>
        <Text
          style={{
            ...styles.reps,
            ...styles.subtitle,
            color: theme.colors.primary
          }}
        >
          Reps
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
  repRange: {
    //backgroundColor: "green",
    width: "35%"
  },
  reps: {
    //backgroundColor: "purple",
    width: "15%"
  },
  del: {
    //backgroundColor: "green",
    width: "15%"
  }
})
