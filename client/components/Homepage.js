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
      <React.Fragment id="home-page-container">
        <div id="home-page-banner-container">
          <img src="img/banner.png" alt="banner image" />
          <Link to="/products" id="home-page-banner-button">
            Shop All Sweaters
          </Link>
        </div>
        <div id="home-page-new-products-container">
          <h3>New Sweaters</h3>
          <div id="home-page-new-products" className="ui five cards">
            {newProducts.map(product => {
              return <ProductCard key={product.id} product={product} />
            })}
          </div>
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
