import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/product'
import ProductCard from './productCard'

class ProductsPage extends React.Component {
  async componentDidMount() {
    await this.fetchAllProducts()
  }
  render() {
    return (
      <React.Fragment>
        {this.props.allProducts.map(product => {
          return <ProductCard key={product.id} />
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
    fetchAllProducts: () => dispatch(fetchAllProducts)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
