import React from 'react'

const VideosContext = React.createContext({
  isDarkTheme: false,
  onChangeTheme: () => {},
  activeTabItem: () => {},
  activeTab: '',
  savedVideos: [],
  addToSaveVideos: () => {},
  removeSaveVideos: () => {},
})

export default VideosContext
