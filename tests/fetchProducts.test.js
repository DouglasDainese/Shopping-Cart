require('../mocks/fetchSimulator');
// const { expect } = require('chai');
const { expect, test } = require('@jest/globals');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts',  () => {

  test('fetchProducts é uma função', () =>{
    expect(typeof fetchProducts).toBe('function');
  });
  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  test(`ao chamar a função fetchProducts com o argumento 'computador' a função fetch utiliza o endpoint correto`, async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  test('o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  })
  test('ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  })
});
