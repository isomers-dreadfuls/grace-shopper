import React from 'react'
import {connect} from 'react-redux'
import {CartSummary} from './index'
import {Grid} from 'semantic-ui-react'

class OrdersPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3>Orders</h3>
        {/* <CartSummary /> */}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.user.orders
  }
}

export default connect(mapStateToProps)(OrdersPage)
