import React from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts, getAllProducts} from '../store/product'
import {ProductCard, Sidebar} from './index'
import {Grid} from 'semantic-ui-react'

const defaultState = {
  priceRange: [1, 1, 1, 1],
  rating: 0
}

class AllProductsPage extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.onRate = this.onRate.bind(this)
    this.priceSelect = this.priceSelect.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
  }
  onRate(event, {rating}) {
    this.setState({rating})
  }
  priceSelect(event) {
    let newState = this.state.priceRange.slice(0)
    newState[event.target.value] = 1 - newState[event.target.value]
    this.setState({priceRange: newState})
  }
  async componentDidMount() {
    await this.props.fetchAllProducts()
  }
  componentWillUnmount() {
    this.props.clearProducts()
  }
  clearFilters() {
    this.setState(defaultState)
  }
  render() {
    const filterRating = this.props.allProducts.filter(item => {
      const ratingArray = item.reviews || []
      const averageRating =
        ratingArray.reduce((sum, elem) => {
          return sum + elem.rating
        }, 0) / ratingArray.length
      return this.state.rating > 0 ? averageRating >= this.state.rating : true
    })
    const productsList = filterRating.filter(item => {
      const price = Number(item.price)
      return item
    })
    return (
      <React.Fragment>
        <Grid columns={2}>
          <Grid.Column width={3}>
            <Sidebar
              clearFilters={this.clearFilters}
              onRate={this.onRate}
              rating={this.state.rating}
              priceSelect={this.priceSelect}
              priceRange={this.state.priceRange}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <div className="ui four cards">
              {productsList.map(product => {
                return <ProductCard key={product.id} product={product} />
              })}
            </div>
          </Grid.Column>
        </Grid>
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
    },
    clearProducts: () => {
      dispatch(getAllProducts([]))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage)
