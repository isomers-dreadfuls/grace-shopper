import React from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts, getAllProducts} from '../store/product'
import {ProductCard, Sidebar} from './index'
import {Grid} from 'semantic-ui-react'

class AllProductsPage extends React.Component {
  async componentDidMount() {
    await this.props.fetchAllProducts()
  }
  componentWillUnmount() {
    this.props.clearProducts()
  }
  render() {
    return (
      <React.Fragment>
        <Grid columns={2}>
          <Grid.Column width={3}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={12}>
            <div className="ui four cards">
              {this.props.allProducts.map(product => {
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
