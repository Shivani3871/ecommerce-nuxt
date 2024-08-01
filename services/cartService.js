import Cookies from 'js-cookie'

const CART_COOKIE_KEY = 'cart'

export function getCart() {
    const cart = Cookies.get(CART_COOKIE_KEY)
    return cart ? JSON.parse(cart) : []
}

export function addToCart(product) {

    const cart = getCart()
    const existingProductIndex = cart.findIndex(item => item.id === product.id)

    if (existingProductIndex > -1) {
        cart[existingProductIndex].cart_quantity = (cart[existingProductIndex].cart_quantity || 1) + 1
    } else {
        cart.push({ ...product, cart_quantity: product?.minimumOrderQuantity || 1 })
    }

    Cookies.set(CART_COOKIE_KEY, JSON.stringify(cart), { expires: 7 }) // Cookie expires in 7 days
}

export function removeFromCart(productId) {
    const cart = getCart()
    const updatedCart = cart.filter(item => item.id !== productId)
    Cookies.set(CART_COOKIE_KEY, JSON.stringify(updatedCart), { expires: 7 })
}

export function updateCartQuantity(itemId, quantity) {
    const cart = getCart()
    const item = cart.find(item => item.id === itemId)
    
    if (item) {
      item.cart_quantity = quantity
      Cookies.set(CART_COOKIE_KEY, JSON.stringify(cart))
    }
  }