import React from 'react'
import {connect} from 'react-redux'
import {CartSummary} from './index'
import {Grid} from 'semantic-ui-react'
import {fetchAllOrders} from '../store/order'

class OrdersPage extends React.Component {
  async componentDidMount() {
    await this.props.fetchAllOrders(this.props.match.params.id)
  }
  render() {
    return (
      <div id="orders-page-container">
        <React.Fragment>
          <h3>Orders</h3>
          <Grid>
            {this.props.orders.map(order => (
              <Grid.Row key={order.id}>
                <Grid.Column width={2}>
                  <h4>Order ID: {order.id}</h4>
                </Grid.Column>
                <Grid.Column width={2}>
                  <h5>Total: ${order.price.toFixed(2)}</h5>
                </Grid.Column>
                <Grid.Column width={4}>
                  <h5>Status: {order.orderStatus}</h5>
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>
          {/* <CartSummary /> */}
        </React.Fragment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order || []
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllOrders: id => dispatch(fetchAllOrders(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage)
