import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts"
import { getDaysBetween, getTodayDate } from "../../lib/extra"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../providers/Theme"
import { Text } from "./Text"
export default function ProgressGraph({
  data
}: {
  data:
  | {
    date: number;
    ONE_RM: number;
  }[]
  | {
    date: number;
    pace: number;
  }[]
  | {
    date: number;
    duration: number;
  }[];
}) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const [greaterThan15, setGreaterThan15] = useState(false)
  const [datesArr, setDatesArr] = useState<number[]>([])
  const [dataArr, setDataArr] = useState<number[]>([])

  useEffect(() => {
    setGreaterThan15(data.length > 15)
    const today = getTodayDate()
    setDatesArr(
      data
        .map((record) => {
          const date = new Date(record.date).toISOString().slice(0, 10)
          return getDaysBetween(today, date)
        })
        .reverse()
    )
    setDataArr(
      data
        .map((record) =>
          record.ONE_RM == Number.POSITIVE_INFINITY ||
          record.ONE_RM == Number.NEGATIVE_INFINITY
            ? 0
            : record.ONE_RM
        )
        .reverse()
    )
  }, [data])

  const axesSvg = { fontSize: 10, fill: theme.colors.text }
  const verticalContentInset = { top: 10, bottom: 10 }
  const xAxisHeight = 10

  const styles = StyleSheet.create({
    container: {
      height: theme.graphs.height,
      padding: theme.paddings.m,
      flexDirection: "row"
    },
    subcontainer: {
      flex: 1,
      marginLeft: theme.margins.s
    },
    x: {
      marginHorizontal: -theme.margins.s,
      height: xAxisHeight
    },
    y: {
      marginBottom: xAxisHeight
    },
    xContentInset: {
      left: theme.margins.s,
      right: theme.margins.s
    },
    xLabel: {
      textAlign: "center"
    },
    yLabel: {
      transform: [{ rotate: "-90deg" }],
      textAlign: "center",
      width: theme.graphs.height
    }
  })

  console.log("PG -> ", datesArr)
  console.log("PG -> ", dataArr)

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            width: "5%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={styles.yLabel}>
            {STRS.train.exercises.estimated1RM} (unit)
          </Text>
        </View>
        <YAxis
          data={dataArr}
          style={styles.y}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={styles.subcontainer}>
          <LineChart
            style={{ flex: 1 }}
            data={dataArr}
            contentInset={verticalContentInset}
            svg={{ stroke: theme.colors.primary }}
          >
            <Grid />
          </LineChart>
          <XAxis
            style={styles.x}
            data={datesArr}
            formatLabel={(value, index) => {
              if (greaterThan15) {
                if (index % 2 == 0) return datesArr[index]
                return ""
              } else return datesArr[index]
            }}
            contentInset={styles.xContentInset}
            svg={axesSvg}
          />
        </View>
      </View>
      <Text style={styles.xLabel}>{STRS.train.exercises.daysAgo}</Text>
    </>
  )
}
