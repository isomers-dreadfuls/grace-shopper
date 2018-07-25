import React from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/product'
import {ProductCard} from './index'

class AllProductsPage extends React.Component {
  async componentDidMount() {
    await this.props.fetchAllProducts()
  }
  render() {
    return (
      <React.Fragment>
        {this.props.allProducts.map(product => {
          return <ProductCard key={product.id} product={product} />
        })}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.product.allProducts || []
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => {
      dispatch(fetchAllProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage)
