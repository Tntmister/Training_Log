import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts"
import { useTheme } from "../../providers/Theme"
export default function ProgressGraph({ data }: { data: number[] }) {
  const theme = useTheme()
  const [numSamples, setNumSamples] = useState(0)
  const [greaterThan15, setGreaterThan15] = useState(false)

  useEffect(() => {
    setNumSamples(data.length)
  }, [])
  useEffect(() => {
    setGreaterThan15(numSamples > 15)
  }, [numSamples])

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
  return (
    <View style={styles.container}>
      <YAxis
        data={data}
        style={styles.y}
        contentInset={verticalContentInset}
        svg={axesSvg}
      />
      <View style={styles.subcontainer}>
        <LineChart
          style={{ flex: 1 }}
          data={data}
          contentInset={verticalContentInset}
          svg={{ stroke: theme.colors.primary }}
        >
          <Grid />
        </LineChart>
        <XAxis
          style={styles.x}
          data={data}
          formatLabel={(value, index) => {
            if (greaterThan15) {
              if (index % 2 == 0) return index
              return ""
            } else return index
          }}
          contentInset={styles.xContentInset}
          svg={axesSvg}
          numberOfTicks={Math.min(15, numSamples)}
        />
      </View>
    </View>
  )
}
