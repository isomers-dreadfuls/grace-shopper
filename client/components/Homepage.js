import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts, getAllProducts} from '../store/product'
import {ProductCard} from './index'
import {Image} from 'semantic-ui-react'

class Homepage extends React.Component {
  async componentDidMount() {
    await this.props.fetchAllProducts()
  }
  componentWillUnmount() {
    this.props.clearProducts()
  }
  render() {
    const newProducts = this.props.newProducts
    return (
      <React.Fragment>
        <div id="home-page-banner-container">
          <img src="img/banner1.png" alt="banner image 1" />
          <Link to="/products" id="home-page-banner-button">
            Shop All Sweaters <i className="fas fa-arrow-right" />
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
        <div id="home-page-press-container">
          <h3>Featured In</h3>
          <Image.Group size="small">
            <Image
              src="img/techcrunch.png"
              as="a"
              href="https://techcrunch.com/"
              target="_blank"
              alt="Tech Crunch logo"
            />
            <Image
              src="img/elle.svg"
              as="a"
              href="https://www.elle.com/"
              target="_blank"
              alt="Elle logo"
            />
            <Image
              src="img/gq.png"
              as="a"
              href="https://www.gq.com/"
              target="_blank"
              alt="GQ logo"
            />
            <Image
              src="img/vogue.svg"
              as="a"
              href="https://www.vogue.com/"
              target="_blank"
              alt="Vogue logo"
            />
          </Image.Group>
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
    },
    clearProducts: () => {
      dispatch(getAllProducts([]))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
