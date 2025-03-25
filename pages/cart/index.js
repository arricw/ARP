Page({
  data: {
    cartList: [],
    totalPrice: 0,
    totalQuantity: 0 // 之前代码有计算但未在 data 里定义，这里补上
  },

  onLoad() {
    this.loadCartData();
  },

  onShow() {
    // 每次页面显示时重新加载购物车数据
    this.loadCartData();
  },

  // 加载购物车数据（示例）
  loadCartData() {
    const cart = wx.getStorageSync('cart') || [];
    this.setData({ cartList: cart }, () => {
      this.calculateTotal();
    });
  },

  // 删除商品
  deleteItem(e) {
    const id = e.currentTarget.dataset.id;
    const cartList = this.data.cartList.filter(item => item.id !== id);
    wx.setStorageSync('cart', cartList);
    this.setData({ cartList }, () => {
      this.calculateTotal();
    });
  },

  // 调整数量
  changeQuantity(id, delta) {
    const cartList = this.data.cartList.map(item => {
      if (item.id === id) {
        const quantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity };
      }
      return item;
    });
    wx.setStorageSync('cart', cartList);
    this.setData({ cartList }, () => {
      this.calculateTotal();
    });
  },

  increaseQuantity(e) {
    this.changeQuantity(e.currentTarget.dataset.id, 1);
  },

  decreaseQuantity(e) {
    this.changeQuantity(e.currentTarget.dataset.id, -1);
  },

  // 计算总价和商品总数量
  calculateTotal() {
    let total = 0;
    let totalQuantity = 0;
    this.data.cartList.forEach(item => {
      total += item.price * item.quantity;
      totalQuantity += item.quantity;
    });
    this.setData({
      totalPrice: total.toFixed(2),
      totalQuantity: totalQuantity
    });
  },
  // 查看商品详情
  viewProductDetail(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({ 
      url: `/pages/product/detail?id=${productId}`
    });
  }
});