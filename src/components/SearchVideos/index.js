import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'

import VideoCard from '../VideoCard'

import VideosContext from '../../context/VideosContext'

import {
  SearchVideosContainer,
  SearchInput,
  VideosContainer,
  ProductsLoaderContainer,
  NotFoundContainer,
  Image,
  Heading,
  Description,
  NavLink,
  Retry,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchVideos extends Component {
  state = {
    searchInput: '',
    searchValue: '',
    apiStatus: apiStatusConstants.initial,
    searchVideos: [],
  }

  componentDidMount() {
    this.getSearchedVideos()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    const {searchInput} = this.state
    this.setState({searchValue: searchInput}, this.getSearchedVideos)
  }

  onEnterClickSearch = event => {
    if (event.key === 'Enter') {
      const {searchInput} = this.state
      this.setState({searchValue: searchInput}, this.getSearchedVideos)
    }
  }

  getSearchedVideos = async () => {
    const {searchValue} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(each => ({
        id: each.id,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        publishedAt: each.published_at,
        viewCount: each.view_count,
        title: each.title,
      }))
      this.setState({
        searchVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.ok !== true) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <ProductsLoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </ProductsLoaderContainer>
  )

  renderHomeVideos = () => (
    <VideosContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {searchInput, searchVideos} = this.state

        const bgColor = isDarkTheme ? '#231f20' : '#f9f9f9'
        const isVideosAvailable = searchVideos.length === 0

        return isVideosAvailable ? (
          <div>
            <Image
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <Heading>No Search results found</Heading>
            <Description>
              Try different key words or remove search filter
            </Description>
            <Retry onClick={this.getSearchedVideos}>Retry</Retry>
          </div>
        ) : (
          <SearchVideosContainer bgColor={bgColor}>
            <div>
              <SearchInput
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onkeyDown={this.onEnterClickSearch}
              />
              <button
                type="button"
                data-testid="button"
                onClick={this.onClickSearchButton}
              >
                <AiOutlineSearch />
              </button>
            </div>
            <VideosContainer>
              {searchVideos.map(each => (
                <VideoCard key={each.id} details={each} />
              ))}
            </VideosContainer>
          </SearchVideosContainer>
        )
      }}
    </VideosContext.Consumer>
  )

  renderFailureView = () => (
    <NotFoundContainer>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <Heading>Oops! Something Went Wrong</Heading>
      <Description className="jobs-failure-description">
        We are having some trouble to complete your request.Please try again.
      </Description>
      <NavLink>
        <Retry onClick={this.getSuggestionVideos}>Retry</Retry>
      </NavLink>
    </NotFoundContainer>
  )

  renderAllVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeVideos()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderAllVideos()}</>
  }
}

export default SearchVideos
