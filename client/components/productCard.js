import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class ProductCard extends React.Component {
  async componentDidMount() {
    await this.fetchAllProducts()
  }
  render() {
    return (
      <React.Fragment>
        <div />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
