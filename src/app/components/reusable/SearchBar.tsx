import React from "react"
import { Searchbar } from "react-native-paper"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query)

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  )
}
