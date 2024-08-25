// src/assets/products/aiProducts.js
export const aiProducts = [
  {
    id: 1,
    name: '讯飞写作',
    description: '科大讯飞平台的讯飞写作AI',
    imgSrc: require('@/assets/images/aiproducts/Xunfei.png'),
    routeName: 'ProductDetail',
    link: 'https://huixie.iflyrec.com/',
  },
  {
    id: 2,
    name: '树图',
    description: 'TreeMind树图-新一代思维导图',
    imgSrc: require('@/assets/images/aiproducts/TreeMind.png'),
    routeName: 'ProductDetail',
    link: 'https://shutu.cn/',
  },
  {
    id: 3,
    name: 'kimi.ai',
    description: 'Moonshot的kimi模型',
    imgSrc: require('@/assets/images/aiproducts/Kimi.png'),
    routeName: 'ProductDetail',
    link: 'https://kimi.moonshot.cn/',
  },
  // 添加更多产品信息
];

export function getProductById(id) {
  return aiProducts.find((product) => product.id === parseInt(id));
}
