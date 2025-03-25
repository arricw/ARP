Page({
  data: {
    product: {}
  },

  onLoad(options) {
    const productId = options.id;
    const product = this.getProductById(productId);
    this.setData({ product });
  },

  getProductById(id) {
    // 这里可以从服务器或本地数据中获取商品详情
    // 示例数据：
    const products = [
      {
        id: 1,
        name: "有机西红柿",
        image: "/images/products/tomato.jpg",
        price: 12.8,
        sales: 2345,
        category: "蔬菜",
        description: "产自云南有机农场，自然成熟，无农药残留。",
        seller: {
          name: "张三",
          contact: "13800138000"
        },
        reviews: [
          {
            id: 1,
            author: "李四",
            date: "2024-01-01",
            content: "这个西红柿很新鲜，口感很好！"
          },
          {
            id: 2,
            author: "王五",
            date: "2024-01-05",
            content: "非常满意这次购物，会回购！"
          }
        ]
      },
      {
        id: 2,
        name: "海南芒果",
        image: "/images/products/mango.jpg",
        price: 25.0,
        sales: 1567,
        category: "水果",
        description: "海南三亚贵妃芒，果肉厚实，香甜多汁。",
        seller: {
          name: "赵六",
          contact: "13900139000"
        },
        reviews: [
          {
            id: 1,
            author: "孙七",
            date: "2024-02-10",
            content: "芒果很甜，个头也很大！"
          }
        ]
      }
    ];
    return products.find(p => p.id === parseInt(id));
  },

  // 加入购物车方法
  addToCart() {
    const product = this.data.product;
    let cart = wx.getStorageSync('cart') || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      // 如果商品已在购物车，增加数量
      cart[existingProductIndex].quantity++;
    } else {
      // 如果商品不在购物车，添加商品并设置数量为 1
      product.quantity = 1;
      cart.push(product);
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    });
  }
});