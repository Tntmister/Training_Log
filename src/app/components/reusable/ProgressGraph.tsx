import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts"
import { getDaysBetween, getTodayDate } from "../../lib/extra"
import { useTheme } from "../../providers/Theme"
export default function ProgressGraph({
  data
}: {
  data: {
    date: number;
    ONE_RM: number;
  }[];
}) {
  const theme = useTheme()
  const [numSamples, setNumSamples] = useState(0)
  const [greaterThan15, setGreaterThan15] = useState(false)
  const [today, setToday] = useState("")
  const [datesArr, setDatesArr] = useState<number[]>([])
  const [dataArr, setDataArr] = useState<number[]>([])

  useEffect(() => {
    setNumSamples(data.length)
    setGreaterThan15(data.length > 15)
    setToday(getTodayDate())
    setDatesArr(
      data
        .map((record) => {
          const date = new Date(record.date).toISOString().slice(0, 10)
          return getDaysBetween(getTodayDate(), date)
        })
        .reverse()
    )
    setDataArr(data.map((record) => record.ONE_RM).reverse())
    console.log("inside useEffect")
  }, [data])

  const axesSvg = { fontSize: 10, fill: theme.colors.text }
  const verticalContentInset = { top: 10, bottom: 10 }
  const xAxisHeight = 10

  const styles = StyleSheet.create({
    container: {
      height: 250,
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
    }
  })

  console.log("PG -> ", datesArr)
  console.log("PG -> ", dataArr)
  return (
    <View style={styles.container}>
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
            /*if (greaterThan15) {
              if (index % 2 == 0) return value
              return ""
            } else return value*/
            return index
          }}
          contentInset={styles.xContentInset}
          svg={axesSvg}
          numberOfTicks={Math.min(15, numSamples)}
        />
      </View>
    </View>
  )
}
