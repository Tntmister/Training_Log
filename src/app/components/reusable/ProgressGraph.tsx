import React from "react"
import { StyleSheet, View } from "react-native"
import { Circle } from "react-native-svg"
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts"
import { useTheme } from "../../providers/Theme"
export default function ProgressGraph({ data }: { data: number[] }) {
  const theme = useTheme()
  //const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

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
  /*const Decorator = ({ x, y, data }:{x:number, y:number, data: number[]}) => {
    return data.map((value, index) => (
        <Circle
            key={ index }
            cx={ x(index) }
            cy={ y(value) }
            r={ 4 }
            stroke={ theme.colors.primary }
            fill={ theme.colors.text }
        />
    ))
}*/
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
          formatLabel={(value, index) => index}
          contentInset={styles.xContentInset}
          svg={axesSvg}
          numberOfTicks={Math.min(15, data.length)}
        />
      </View>
    </View>
  )
}
