import { StackNavigationProp } from "@react-navigation/stack"
import React, { useContext } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "../../../providers/Theme"
import { UserContext } from "../../../providers/User"
import { Text } from "../../reusable/Text"
import { TrainingModelDoc } from "../Train/Models/ModelList"
import { RootStackParamHistoryNav } from "./HistoryNav"

export default function SessionDescriptor({
  session,
  navigation
}: {
  session: TrainingModelDoc;
  navigation: StackNavigationProp<RootStackParamHistoryNav, "SessionList">;
}) {
  const user = useContext(UserContext)
  const theme = useTheme()
  return (
    <TouchableOpacity
      onPress={() => {
        /* não esta a funcionar*/
        navigation.navigate("Session", { session: session })
      }}
      style={{
        backgroundColor: theme.colors.backdrop,
        marginBottom: theme.margins.s,
        alignSelf: "center",
        paddingLeft: theme.paddings.l,
        paddingBottom: theme.paddings.l,
        paddingTop: theme.paddings.l,
        width: "95%",
        borderRadius: 10,
        elevation: 6
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flexGrow: 1, fontSize: RFValue(18) }}>
          {session.model.name}
        </Text>
      </View>
      <View>
        <>
          {session.model.exercises.map((ex, key) => (
            <Text style={{ fontSize: RFValue(14) }} key={key}>
              {ex.sets.length} x {ex.name}
            </Text>
          ))}
        </>
        <Image
          style={{
            borderRadius: 10,
            width: 80,
            height: 80,
            marginLeft: "auto",
            marginRight: theme.margins.m
          }}
          source={{ uri: session.model.mediaContent[0]?.uri }}
        />
      </View>
    </TouchableOpacity>
  )
}
