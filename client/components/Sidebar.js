import React from 'react'
import {connect} from 'react-redux'
import {Accordion, Icon, Rating, Form} from 'semantic-ui-react'

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
          <Form.Group grouped>
            <Form.Field
              label="Small"
              control="input"
              type="checkbox"
              defaultChecked
            />
            <Form.Field
              label="Medium"
              control="input"
              type="checkbox"
              defaultChecked
            />
            <Form.Field
              label="Large"
              control="input"
              type="checkbox"
              defaultChecked
            />
          </Form.Group>
        </Accordion.Content>

        <Accordion.Title
          active={this.state.activeIndex === 2}
          index={2}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Price
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 2}>
          <Form.Group grouped>
            <Form.Field
              label="$0 - $15"
              control="input"
              type="checkbox"
              defaultChecked
            />
            <Form.Field
              label="$15 - $25"
              control="input"
              type="checkbox"
              defaultChecked
            />
            <Form.Field
              label="$25 - $50"
              control="input"
              type="checkbox"
              defaultChecked
            />
            <Form.Field
              label="$50 - $100"
              control="input"
              type="checkbox"
              defaultChecked
            />
          </Form.Group>
        </Accordion.Content>

        <Accordion.Title
          active={this.state.activeIndex === 3}
          index={3}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Rating
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 3}>
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
