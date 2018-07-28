import React from 'react'
import {connect} from 'react-redux'
import {Accordion, Icon, Rating} from 'semantic-ui-react'

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      activeIndex: 0,
      rating: 1
    }
  }
  handleClick = (e, titleProps) => {
    const {index} = titleProps
    const {activeIndex} = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({activeIndex: newIndex})
  }
  render() {
    return (
      <Accordion styled>
        <Accordion.Title
          active={this.state.activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Size
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 1}>
          <p>Small</p>
          <p>Medium</p>
          <p>Large</p>
        </Accordion.Content>

        <Accordion.Title
          active={this.state.activeIndex === 2}
          index={2}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Rating
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 2}>
          <p>Minimum Rating</p>
          <Rating
            icon="star"
            onRate={(event, {rating}) => {
              this.setState({rating})
            }}
            name="rating"
            defaultRating={this.state.rating}
            maxRating={5}
          />
        </Accordion.Content>

        <Accordion.Title
          active={this.state.activeIndex === 3}
          index={3}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Price
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 3}>
          <p>$0 - $15</p>
          <p>$15 - $25</p>
          <p>$25 - $50</p>
          <p>$50 - $100</p>
        </Accordion.Content>
      </Accordion>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
