import React, { useContext, useEffect, useState } from "react"
import {
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity
} from "react-native"
import { Post, Report, User } from "../../../lib/types/user"
import firestore from "@react-native-firebase/firestore"
import InlineView from "../../reusable/InlineView"
import { Text } from "../../reusable/Text"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../providers/Theme"
import { CachedImage } from "@georstat/react-native-image-cache"
import { images } from "../../../lib/extra"
import { getUser } from "../../../lib/firebase/user"
import { Button } from "../../reusable/Button"
import { deletePost, deleteReport } from "../../../lib/firebase/posts"
import prompt from "react-native-prompt-android"

export default function ReportDescriptor({
  id,
  onPress,
  onExpire
}: {
  id: string;
  onPress: (postId: string) => void;
  onExpire: (reportId: string) => void;
}) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const styles = StyleSheet.create({
    container: {
      marginTop: theme.margins.s,
      padding: theme.paddings.l,
      alignSelf: "center",
      width: "95%",
      backgroundColor: theme.colors.backdrop,
      borderRadius: theme.borders.borderRadius_m
    },
    img: {
      height: theme.media.s,
      width: theme.media.s,
      borderColor: theme.colors.primary,
      borderWidth: theme.borders.borderWidth_s,
      borderRadius: theme.borders.borderRadius_m,
      overflow: "hidden",
      marginHorizontal: theme.margins.xs
    },
    user: {
      marginTop: theme.margins.xs
    },
    reason: {
      alignSelf: "center",
      marginVertical: theme.margins.l
    },
    optionContainer: {
      justifyContent: "space-around"
    }
  })
  const [reportedUser, setReportedUser] = useState<User>()
  const [report, setReport] = useState<Report>()
  const [user, setUser] = useState<User>()
  const [post, setPost] = useState<Post>()

  function subscribeReport() {
    return firestore()
      .doc(`reports/${id}`)
      .onSnapshot((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setReport(documentSnapshot.data() as Report)
        } else {
          onExpire(id)
        }
      })
  }

  useEffect(() => {
    return subscribeReport()
  }, [])

  function getUsers(report: Report) {
    getUser(report.reportedUserId).then((user) => setReportedUser(user))
    getUser(report.userId).then((user) => setUser(user))
  }

  function getPost(postId: string) {
    firestore()
      .doc(`posts/${postId}`)
      .get()
      .then((doc) => setPost(doc.data() as Post))
  }

  useEffect(() => {
    if (report) {
      getUsers(report)
      getPost(report.reportedPostId)
    }
  }, [report])

  function resolveReport(del: boolean, banTime?: number) {
    if (del) {
      deletePost(report!.reportedPostId)
      firestore()
        .doc(`users/${report?.reportedUserId}`)
        .update({ bannedUntil: banTime } as Partial<User>)
    }
    deleteReport(id)
    onExpire(id)
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (report !== undefined) onPress(report.reportedPostId)
      }}
    >
      <Text style={theme.text.header}>{post?.post.name}</Text>
      <InlineView style={styles.user}>
        <Text>{STRS.admin.reportedBy(user?.username)}</Text>
        {user?.profileURL ? (
          <CachedImage source={user.profileURL} style={styles.img} />
        ) : (
          <Image
            source={images.User}
            style={[styles.img, { tintColor: theme.colors.text }]}
          />
        )}
      </InlineView>
      <InlineView style={styles.user}>
        <Text>{STRS.admin.postedBy(reportedUser?.username)}</Text>
        {reportedUser?.profileURL ? (
          <CachedImage source={reportedUser.profileURL} style={styles.img} />
        ) : (
          <Image
            source={images.User}
            style={[styles.img, { tintColor: theme.colors.text }]}
          />
        )}
      </InlineView>
      <Text style={styles.reason}>{STRS.admin.reason(report?.reason)}</Text>
      {report && (
        <InlineView style={styles.optionContainer}>
          <Text>{STRS.admin.deletePost}</Text>
          <Button
            onPress={() => {
              resolveReport(false)
            }}
          >
            No
          </Button>
          <Button
            onPress={() => {
              prompt(
                STRS.admin.deletingPost,
                STRS.admin.banPrompt(reportedUser?.username),
                [
                  { text: STRS.cancel, style: "cancel" },
                  {
                    text: STRS.no,
                    onPress: () => {
                      resolveReport(true, 0)
                    }
                  },
                  {
                    text: STRS.yes,
                    onPress: (num) => {
                      const number = parseInt(num)
                      if (number > 0) {
                        resolveReport(true, number + 1000 * 60 * 60 * 24)
                      } else {
                        ToastAndroid.show(
                          "Invalid ban duration",
                          ToastAndroid.SHORT
                        )
                      }
                    }
                  }
                ],
                { placeholder: STRS.admin.banPlaceholder }
              )
            }}
          >
            Yes
          </Button>
        </InlineView>
      )}
    </TouchableOpacity>
  )
}
