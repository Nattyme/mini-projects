const priceFormatter = new Intl.NumberFormat();
const formatPrice = (value) => priceFormatter.format(value);


export default formatPrice;