import ServiceBase from 'ServiceBase'

class Service extends ServiceBase {
	constructor() {
		super()
		this.$$prefix = ''
		this.$$path = {
			getToken    : '/user/get-wx-token',
			wechatSignUp: '/user/wechat/sign/up',
			wechatSignIn: '/user/wechat/sign/in',
			decryptData : '/user/wechat/decrypt/data',
			signIn      : '/user/sign/in',
			signOut     : '/user/sign/out',
			banner      : '/banner', 
			classify    : '/classify', 
			goods       : '/goods', 
			search      : '/goods/search/all', 
			cart        : '/cart', 
			address     : '/address', 
			order       : '/order', 
        }
	}

	getToken(params) {
		return this.postRequest(this.$$path.getToken, params)
	}

	wechatSignUp(params) {
		return this.postRequest(this.$$path.wechatSignUp, params)
	}

	wechatSignIn(params) {
		return this.postRequest(this.$$path.wechatSignIn, params)
	}

	wechatDecryptData(params) {
		return this.postRequest(this.$$path.decryptData, params)
	}
	
	signIn(params) {
		return this.postRequest(this.$$path.signIn, params) 
	}

	signOut() {
		return this.postRequest(this.$$path.signOut) 
	}

	getBanners(params) {
		return this.getRequest(this.$$path.banner, params)
	}

	search(params) {
		return this.getRequest(this.$$path.search, params)
	}

	getGoods(params) {
		return this.getRequest(this.$$path.goods, params)
	}

	getClassify(params) {
		return this.getRequest(this.$$path.classify, params)
	}

	getDetail(id) {
		return this.getRequest(`${this.$$path.goods}/${id}`)
	}

	getCartByUser() {
		return this.getRequest(this.$$path.cart)
	}

	addCartByUser(goods) {
		return this.postRequest(this.$$path.cart, {
			goods: goods, 
		})
	}

	putCartByUser(id, params) {
		return this.putRequest(`${this.$$path.cart}/${id}`, params)
	}

	delCartByUser(id) {
		return this.deleteRequest(`${this.$$path.cart}/${id}`)
	}

	clearCartByUser() {
		return this.postRequest(`${this.$$path.cart}/clear`)
	}

	getAddressList(params) {
		return this.getRequest(this.$$path.address, params)
	}

	getAddressDetail(id) {
		return this.getRequest(`${this.$$path.address}/${id}`)
	}

	postAddress(params) {
		return this.postRequest(this.$$path.address, params)
	}

	putAddress(id, params) {
		return this.putRequest(`${this.$$path.address}/${id}`, params)
	}

	deleteAddress(id, params) {
		return this.deleteRequest(`${this.$$path.address}/${id}`)
	}

	getDefalutAddress() {
		return this.getRequest(`${this.$$path.address}/default`)
	}

	setDefalutAddress(id) {
		return this.postRequest(`${this.$$path.address}/default/${id}`)
	}

	getOrderList(params) {
		return this.getRequest(this.$$path.order, params)
	}

	getOrderDetail(id) {
		return this.getRequest(`${this.$$path.order}/${id}`)
	}

	postOrder(params) {
		return this.postRequest(this.$$path.order, params)
	}

	putOrder(id, params) {
		return this.putRequest(`${this.$$path.order}/${id}`, params)
	}

	deleteOrder(id, params) {
		return this.deleteRequest(`${this.$$path.order}/${id}`)
	}
}

export default Service