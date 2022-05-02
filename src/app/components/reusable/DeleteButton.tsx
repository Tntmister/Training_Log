/* eslint-disable react/prop-types */
import React from "react"
import { StyleSheet } from "react-native"
import { Button as PaperButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { images } from "../../lib/extra"
import { Button } from "../reusable/Button"

export function DeleteButton({ ...props }) {
  return (
    <Button
      style={styles.del}
      labelStyle={{
        fontSize: RFValue(26)
      }}
      icon={images.Trash}
      compact={true}
      {...props}
    >
      {}
    </Button>
  )
}

const styles = StyleSheet.create({
  del: {
    width: "15%",
    height: 40,
    marginTop: 0,
    borderRadius: 5
  }
})
