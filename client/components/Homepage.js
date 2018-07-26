import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/product'
import {ProductCard} from './index'

class Homepage extends React.Component {
  async componentDidMount() {
    await this.props.fetchAllProducts()
  }
  render() {
    const newProducts = this.props.newProducts
    return (
      <React.Fragment>
        <div>
          <Link to="/products">Go To All Products</Link>
        </div>
        <h3>New Products</h3>
        <div className="ui five cards">
          {newProducts.map(product => {
            return <ProductCard key={product.id} product={product} />
          })}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  let allProducts = state.product.allProducts
  let newProducts = allProducts.sort((a, b) => a.createdAt > b.createdAt)
  return {
    newProducts: newProducts.slice(0, 5)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => {
      dispatch(fetchAllProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
