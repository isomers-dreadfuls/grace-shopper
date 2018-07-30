import React from 'react'
import {Accordion, Icon, Rating, Form, Button} from 'semantic-ui-react'

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      activeIndex: 0
    }
  }
  handleClick = (event, titleProps) => {
    const {index} = titleProps
    const {activeIndex} = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({activeIndex: newIndex})
  }
  render() {
    return (
      <React.Fragment>
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
                value={0}
                onChange={this.props.priceSelect}
                checked={this.props.priceRange[0]}
              />
              <Form.Field
                label="$15 - $25"
                control="input"
                type="checkbox"
                value={1}
                onChange={this.props.priceSelect}
                checked={this.props.priceRange[1]}
              />
              <Form.Field
                label="$25 - $50"
                control="input"
                type="checkbox"
                value={2}
                onChange={this.props.priceSelect}
                checked={this.props.priceRange[2]}
              />
              <Form.Field
                label="$50 - $100"
                control="input"
                type="checkbox"
                value={3}
                onChange={this.props.priceSelect}
                checked={this.props.priceRange[3]}
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
              onRate={this.props.onRate}
              name="rating"
              rating={this.props.rating}
              maxRating={5}
              clearable
            />
          </Accordion.Content>
        </Accordion>
        <Button onClick={this.props.clearFilters}>Clear Filters</Button>
      </React.Fragment>
    )
  }
}

export default Sidebar
