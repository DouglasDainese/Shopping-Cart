require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('fetchItem é uma função', () =>{
    expect(typeof fetchItem).toBe('function');
  });
  test('Execute a função fetchItem com o argumento "MLB161576052" e teste se fetch foi chamada', async () => {
    await fetchItem('MLB161576052');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  test(`ao chamar a função fetchItem com o argumento 'MLB161576052' a função fetch utiliza o endpoint correto`, async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  test('ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect(await fetchItem()).toEqual('You must provide an url');
  })
});

