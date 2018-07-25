import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/product'

class Homepage extends React.Component {
  async componentDidMount() {
    await this.fetchAllProducts()
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <Link to="/products">Go To All Products</Link>
        </div>
        <div>
          <h3>New Products</h3>
          <Link to="">Product 1</Link>
          <Link to="">Product 2</Link>
          <Link to="">Product 3</Link>
          <Link to="">Product 4</Link>
          <Link to="">Product 5</Link>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  let allProducts = state.product.allProducts || []
  let newProducts = allProducts.sort((a, b) => a.createdAt > b.createdAt)
  return {
    newProducts: newProducts.slice(0, 5)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
