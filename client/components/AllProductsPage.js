import React from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts, getAllProducts, setSearch} from '../store/product'
import {ProductCard, Sidebar} from './index'
import {Grid} from 'semantic-ui-react'

const defaultState = {
  priceRange: [1, 1, 1, 1],
  sizeRange: [0, 0, 0],
  rating: 0
}

class AllProductsPage extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.onRate = this.onRate.bind(this)
    this.priceSelect = this.priceSelect.bind(this)
    this.sizeSelect = this.sizeSelect.bind(this)
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
  sizeSelect(event) {
    let newState = this.state.sizeRange.slice(0)
    newState[event.target.value] = 1 - newState[event.target.value]
    this.setState({sizeRange: newState})
  }
  componentDidMount() {
    if (this.state.search) {
      this.props.fetchAllProducts(this.state.search)
    } else {
      this.props.fetchAllProducts()
    }
  }
  componentWillUnmount() {
    this.props.clearSearch()
    this.props.clearProducts()
  }
  clearFilters() {
    this.setState(defaultState)
  }
  filterRating(arr) {
    return arr.filter(item => {
      const ratingArray = item.reviews || []
      const averageRating =
        ratingArray.reduce((sum, elem) => {
          return sum + elem.rating
        }, 0) / ratingArray.length
      return this.state.rating > 0 ? averageRating >= this.state.rating : true
    })
  }
  filterPrice(arr) {
    return arr.filter(item => {
      const price = Number(item.price)
      const ranges = [[0, 15], [15, 25], [25, 50], [50, 100]]
      for (let i = 0; i < ranges.length; i++) {
        if (
          ranges[i][0] <= price &&
          price < ranges[i][1] &&
          this.state.priceRange[i]
        ) {
          return item
        }
      }
    })
  }
  filterSize(arr) {
    return arr.filter(item => {
      const sizes = item.inventories.map(elem => elem.size)
      const filterSizes = ['Small', 'Medium', 'Large']
      const match = filterSizes.every(
        (elem, index) =>
          this.state.sizeRange[index] ? sizes.includes(elem) : true
      )
      if (match) {
        return item
      }
    })
  }
  render() {
    const productsList = this.filterSize(
      this.filterPrice(this.filterRating(this.props.allProducts))
    )
    return (
      <React.Fragment>
        <center style={{margin: '20px'}}>
          {this.props.search ? (
            <h3>
              Showing {this.props.allProducts.length} related to "{
                this.props.search
              }"
            </h3>
          ) : (
            <h3>All Products</h3>
          )}
        </center>
        <Grid columns={2}>
          <Grid.Column width={3}>
            <Sidebar
              clearFilters={this.clearFilters}
              onRate={this.onRate}
              rating={this.state.rating}
              priceSelect={this.priceSelect}
              priceRange={this.state.priceRange}
              sizeSelect={this.sizeSelect}
              sizeRange={this.state.sizeRange}
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
    allProducts: state.product.allProducts || [],
    search: state.product.search
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => {
      dispatch(fetchAllProducts())
    },
    clearProducts: () => {
      dispatch(getAllProducts([]))
    },
    clearSearch: () => {
      dispatch(setSearch(''))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage)
