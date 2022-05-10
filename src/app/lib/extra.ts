export const images = {
  User: require("../assets/icons/user/user(-xxxhdpi).png"),
  History: require("../assets/icons/history/history(-xxxhdpi).png"),
  Home: require("../assets/icons/home/home(-xxxhdpi).png"),
  Search: require("../assets/icons/search/search(-xxxhdpi).png"),
  Train: require("../assets/icons/train/train(-xxxhdpi).png"),
  Camera: require("../assets/icons/camera/camera(-xxxhdpi).png"),
  Checked: require("../assets/icons/checked/checked(-xxxhdpi).png"),
  Trash: require("../assets/icons/trash/trash(-xxxhdpi).png"),
  Logo: require("../assets/logo/logo1.png")
}

export function getDate(timestamp: string | undefined): string {
  if (timestamp === undefined) return "Invalid Date"
  const date = new Date(timestamp)
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  const month =
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
