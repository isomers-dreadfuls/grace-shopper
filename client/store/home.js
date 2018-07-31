const CLEAR_HP_PROMO = 'CLEAR_HP_PROMO'

const initialState = true

// this route is for disabling the homepage promo
export const clearHomePromo = () => ({
  type: CLEAR_HP_PROMO
})

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_HP_PROMO:
      return false
    default:
      return state
  }
}
