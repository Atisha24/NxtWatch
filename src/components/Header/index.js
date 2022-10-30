import {Link, withRouter} from 'react-router-dom'

import {BsMoon} from 'react-icons/bs'

import {FiSun} from 'react-icons/fi'

import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'

import './index.css'

import {
  NavHeader,
  ProfileImage,
  ContentContainer,
  LogoutButton,
  ThemeButton,
  WebsiteLogo,
  ModalContainer,
  CloseButton,
  AlignRow,
  ConfirmButton,
  ModalDesc,
  AlignColumn,
  ContentListItem,
} from './styledComponents'

import VideosContext from '../../context/VideosContext'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <VideosContext.Consumer>
      {value => {
        const {onChangeTheme, isDarkTheme} = value

        const onClickChangeTheme = () => {
          onChangeTheme()
        }

        const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
        const textColor = isDarkTheme ? '#f9f9f9' : '#181818'
        const websiteLogo = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        return (
          <NavHeader bgColor={bgColor}>
            <Link to="/">
              <WebsiteLogo src={websiteLogo} alt="website logo" />
            </Link>
            <ContentContainer>
              <ContentListItem>
                <ThemeButton color={textColor} onClick={onClickChangeTheme}>
                  {isDarkTheme ? <FiSun /> : <BsMoon />}
                </ThemeButton>
              </ContentListItem>

              <ContentListItem>
                <ProfileImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </ContentListItem>

              <ContentListItem>
                <Popup
                  modal
                  trigger={<LogoutButton type="button">Logout</LogoutButton>}
                  className="popup-content"
                >
                  {close => (
                    <ModalContainer>
                      <AlignColumn>
                        <ModalDesc>Are you sure, you want to logout?</ModalDesc>
                        <AlignRow>
                          <CloseButton type="button" onClick={() => close()}>
                            Cancel
                          </CloseButton>
                          <ConfirmButton type="button" onClick={onClickLogout}>
                            Confirm
                          </ConfirmButton>
                        </AlignRow>
                      </AlignColumn>
                    </ModalContainer>
                  )}
                </Popup>
              </ContentListItem>
            </ContentContainer>
          </NavHeader>
        )
      }}
    </VideosContext.Consumer>
  )
}

export default withRouter(Header)
