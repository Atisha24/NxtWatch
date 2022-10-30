import {
  GamingCardContainer,
  ThumbnailImage,
  GamingCardBottomContainer,
  GamingDetailsContainer,
  GamingDetailsText,
  NavLink,
} from './styledComponents'

const GamingVideoCard = props => {
  const {details} = props
  const {title, id, thumbnailUrl, viewCount} = details

  return (
    <NavLink to={`videos/${id}`}>
      <GamingCardContainer>
        <ThumbnailImage src={thumbnailUrl} alt="video thumbnail" />
        <GamingCardBottomContainer>
          <GamingDetailsContainer>
            <GamingDetailsText>{title}</GamingDetailsText>
            <GamingDetailsText>{viewCount}</GamingDetailsText>
          </GamingDetailsContainer>
        </GamingCardBottomContainer>
      </GamingCardContainer>
    </NavLink>
  )
}

export default GamingVideoCard
