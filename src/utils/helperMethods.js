import shortid from 'shortid';

export const trimValues = (data) => {
  const trim = (obj) => (
    Object.entries(obj).reduce((trimmed, [key, value]) => {
      if(typeof value === 'string') value = value.trim() 
      if(value) trimmed[key] = value
      return trimmed
    }, {})
  )
  if(Array.isArray(data)) return data.map((obj) => trim(obj))
  return trim(data)    
}

export const getIdFromUrlKey = (urlKey) => {
  const urlKeySplit = urlKey.split('-');
  return urlKeySplit[urlKeySplit.length - 1]
}

export const truncateText = (text, length) => {
  return `${text.slice(0, length)}${text.length > length ? '...' : ''}`
}

export const normalizeProductData = (data) => {
  const normalize = (product) => product.productDetails.map((item) => {
    const productClone = {...product}
    delete productClone.productDetails
    return {...item, ...productClone}
  })
  if(Array.isArray(data)) return data.map((item) => normalize(item))
  return normalize(data)
}

export const  normalizeCartProductData = (data) => {
  const productData = {...data, ...data.product}
  delete productData.product
  return productData;
}

export const priceRange = (data) => {
  if(data.length === 1) return {price : `${data[0].priceInNaira}`, discounted: `${data[0].discountedPriceInNaira}`}
  const prices = data.map((elem) => elem.priceInNaira ).sort()
  const discountedPrices = data.map((elem) => elem.discountedPriceInNaira).sort()
  return { price: `${prices[0]} - ${prices[prices.length - 1]}`,
   discounted: `${discountedPrices[0]} - ${discountedPrices[discountedPrices.length - 1]}`
  }
}

export const variations = (data) => {
  if(data.length === 1) return;
  // const variations = data.map((item) => item.color )

}

export const priceInNaira = (price) => {
  const priceInString = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `\u20A6${priceInString}`
}

export const optionsArrayFromNum = (num) => {
  return Array.from({length: num}, (elem, index) => (
    { name: index + 1, value: index + 1, id: shortid.generate() }     
  ))
}