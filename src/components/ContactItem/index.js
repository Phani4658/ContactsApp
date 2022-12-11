import './index.css'

const ContactItem = props => {
  const {contactDetails, toggleIsFavorite, deleteContact} = props
  const {name, mobileNo, isFavorite, id} = contactDetails

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }
  const onClickDeleteIcon = () => {
    deleteContact(id)
  }
  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/star-filled-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/star-outline-img.png'

  return (
    <li className="table-row">
      <div className="table-cell name-column">
        <p>{name}</p>
      </div>
      <hr className="separator" />
      <div className="table-cell mobile-no-column">
        <p className="mobile-no-value">{mobileNo}</p>
        <div className="icons-container">
          <button
            type="button"
            className="favorite-icon-container"
            onClick={onClickDeleteIcon}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="NSy2Hd cdByRd RTiFqe undefined"
            >
              <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z" />
              <path d="M9 8h2v9H9zm4 0h2v9h-2z" />
            </svg>
          </button>
          <button
            type="button"
            className="favorite-icon-container"
            onClick={onClickFavoriteIcon}
          >
            <img src={starImgUrl} className="favorite-icon" alt="star" />
          </button>
        </div>
      </div>
    </li>
  )
}

export default ContactItem
