import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'

class ProductPage extends React.Component {
  componentDidMount() {
    this.props.fetchProduct()
  }
  render() {
    const singleProduct = this.props.singleProduct
    return (
      <div id="product-page-container">
        <img src={singleProduct.image} />
        <div id="product-page-info">
          <h2>{singleProduct.name}</h2>
          <h3>{singleProduct.price}</h3>
          <h4>{singleProduct.description}</h4>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct || {}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProduct: () => {
      dispatch(fetchProduct(ownProps.match.params.productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
