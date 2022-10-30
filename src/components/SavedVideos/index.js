import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {AiFillFire} from 'react-icons/ai'

import TrendingVideoCard from '../TrendingVideoCard'

import VideosContext from '../../context/VideosContext'

import Header from '../Header'

import SideBar from '../SideBar'

import {
  SavedVideosContainer,
  VideosContainer,
  TrendingHeadContainer,
  TrendingLogo,
  TrendingHead,
  ProductsLoaderContainer,
  HomeStickyContainer,
  HomeSideContainer,
  HomeContainer,
  Image,
  NotFoundContainer,
  Heading,
  Description,
} from './styledComponents'

class SavedVideos extends Component {
  renderSavedVideos = () => (
    <VideosContext.Consumer>
      {value => {
        const {savedVideos, isDarkTheme} = value

        const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'

        const textColor = isDarkTheme ? '#f9f9f9' : '#181818'

        const isVideosAvailable = savedVideos.length === 0

        return isVideosAvailable ? (
          <NotFoundContainer bgColor={bgColor}>
            <Image
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <Heading className="cart-empty-heading" textColor={textColor}>
              No saved videos found
            </Heading>
            <Description textColor={textColor}>
              You can save your videos while watching them.
            </Description>
          </NotFoundContainer>
        ) : (
          <SavedVideosContainer bgColor={bgColor}>
            <TrendingHeadContainer bgColor={bgColor}>
              <TrendingLogo>
                <AiFillFire />
              </TrendingLogo>
              <TrendingHead color={textColor}>Saved Videos</TrendingHead>
            </TrendingHeadContainer>

            <VideosContainer bgColor={bgColor}>
              {savedVideos.map(each => (
                <TrendingVideoCard key={each.id} details={each} />
              ))}
            </VideosContainer>
          </SavedVideosContainer>
        )
      }}
    </VideosContext.Consumer>
  )

  renderLoadingView = () => (
    <ProductsLoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </ProductsLoaderContainer>
  )

  render() {
    return (
      <VideosContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'

          return (
            <div data-testid="savedVideos">
              <Header />
              <HomeContainer data-testid="home" bgColor={bgColor}>
                <HomeStickyContainer>
                  <SideBar />
                </HomeStickyContainer>
                <HomeSideContainer bgColor={bgColor}>
                  {this.renderSavedVideos()}
                </HomeSideContainer>
              </HomeContainer>
            </div>
          )
        }}
      </VideosContext.Consumer>
    )
  }
}

export default SavedVideos
