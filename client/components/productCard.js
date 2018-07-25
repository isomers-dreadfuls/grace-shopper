import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class ProductCard extends React.Component {
  render() {
    console.log(this.props.product)
    return (
      <React.Fragment>
        <div>
          <Link to={`/products/${this.props.product.id}`}>
            {this.props.product.name}
          </Link>
          <h3>{this.props.product.description}</h3>
          <h3>{this.props.product.price}</h3>
        </div>
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
