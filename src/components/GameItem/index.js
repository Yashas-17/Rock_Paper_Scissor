import './index.css'

const GameItem = props => {
  const {details, onClickGameitem} = props
  const {testId, imageUrl, id} = details
  const onClickImage = () => {
    onClickGameitem(id)
  }
  return (
    <div className="game-item-container">
      <button
        type="button"
        data-testid={`${testId}`}
        className="choice-button"
        onClick={onClickImage}
      >
        <img alt={id} src={imageUrl} className="choice-img" />
      </button>
    </div>
  )
}
export default GameItem
