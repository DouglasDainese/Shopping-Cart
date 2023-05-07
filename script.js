// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

// const { fetchItem } = require("./helpers/fetchItem");

// const { fetchProducts } = require('./helpers/fetchProducts');

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
const produtosNoCarrinho = document.querySelector('.cart__items');

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail, preco }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createCustomElement('span', 'item_preco', `R$ ${preco}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;
console.log(typeof getIdFromProductItem);
/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `Produto: ${title} 
  Valor: $${price}`;
  return li;
};

const valorTotalProdutos = () => {
  const totalDisplay = document.querySelector('.total-price');
  const listaDeProdutos = document.getElementsByClassName('cart__item');
  let valorTotal = 0;
  for (let i = 0; i < listaDeProdutos.length; i += 1) {
    const produto = listaDeProdutos[i].innerText;
    const preçoProduto = parseFloat(produto.substr(produto.indexOf('$') + 1));
    valorTotal += preçoProduto;
  }
  totalDisplay.lastElementChild.innerHTML = `R$${valorTotal}`;
};

const atualizarWebStorage = () => {
  saveCartItems(produtosNoCarrinho.innerHTML);
  valorTotalProdutos();
};

const removeItemInCart = (event) => {
  const newProductInCart = document.querySelectorAll('.cart__item');
  const productRemove = event.target;
  newProductInCart.forEach((element) => {
    if (element === productRemove) {
      element.parentElement.removeChild(productRemove);
    }
  });
  atualizarWebStorage();
};
const addEscutadorInCart = () => {
  const newProductInCart = document.querySelectorAll('.cart__item');
  newProductInCart.forEach((element) => element.addEventListener('click', removeItemInCart));
  atualizarWebStorage();
};

const addItemInCart = async (event) => {
  const idProdutoEscolhido = event.target.parentNode.firstElementChild.innerText;
  const inforProduto = await fetchItem(idProdutoEscolhido);
  const produtoAdd = createCartItemElement(inforProduto);
  produtosNoCarrinho.appendChild(produtoAdd);
  addEscutadorInCart();
};

const addEscutadorDeEventos = () => {
  const produtos = document.querySelectorAll('.item__add');
  produtos.forEach((element) => {
    element.addEventListener('click', addItemInCart);
  });
};

const addElementsInPag = async (valor) => {
  const sectionParent = document.getElementsByClassName('items')[0];
  const produtos = await fetchProducts(valor);
  console.log(produtos);
  produtos.results
    .forEach((element) => {
      const produto = {
        id: element.id,
        preco: element.price,
        title: element.title,
        thumbnail: element.thumbnail,
      };
      const section = createProductItemElement(produto);
      sectionParent.appendChild(section);
    });
  addEscutadorDeEventos();
};

const limparCart = document.querySelector('.empty-cart');
limparCart.addEventListener('click', () => {
  while (produtosNoCarrinho.firstChild) {
    produtosNoCarrinho.removeChild(produtosNoCarrinho.lastChild);
  }
  atualizarWebStorage();
});

const removeLoading = () => {
  const divLoading = document.querySelector('.loading');
  return divLoading.remove();
};

window.onload = async () => {
  await addElementsInPag('computador');
  removeLoading();
  const itensSalvos = getSavedCartItems();
  produtosNoCarrinho.innerHTML = itensSalvos;
  addEscutadorInCart();
  valorTotalProdutos();
};