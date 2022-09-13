const fetchItem = async (produto) => {
  try {
    const url = `https://api.mercadolibre.com/items/${produto}`;
    const response = await fetch(url);
    const data = await response.json();
    return data; 
  } catch (error) {
    return 'You must provide an url';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
