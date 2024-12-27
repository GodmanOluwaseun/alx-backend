#!/usr/bin/env node
// Stock management program
import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const listProducts = [
  { id: 1, name: "Suitcase 250", price: 50, stock: 4 },
  { id: 2, name: "Suitcase 450", price: 100, stock: 10 },
  { id: 3, name: "Suitcase 650", price: 350, stock: 2 },
  { id: 4, name: "Suitcase 1050", price: 550, stock: 5 }
];

function getItemById(id) {
  const product = listProducts.find(item => item.Id === id);
  return product;
};

const app = express();
app.use(express.json);

const client = createClient();

app.get('/list_products', (req, res) => {
  const formattedProducts = listProducts.map((product) => ({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock
  }));
  return res.json(formattedProducts);
});

/**
 * It will set in Redis the stock for the key item.ITEM_ID
 * @param {int} itemId 
 * @param {string} stock 
 */
function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
};

const getAsync = promisify(client.get).bind(client);
/**
 * It will return the reserved stock for a specific item
 * @param {int} itemId
 * @returns {promise<string>} Reserved stock.
 */
async function getCurrentReservedStockById(itemId) {
  const itemStock = await getAsync(`item.${itemId}`);
  return itemStock;
};

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    res.json({ status: "Product not found" });
  }
  const reservedStock = parseInt(await getCurrentReservedStockById(itemId), 10) ||  0;
  const currentStock = product.stock - reservedStock;

  return res.json({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
    currentQuantity: Math.max(currentStock,  0)
  });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    res.json({ status: "Product not found"});
  }

  const reservedStock = parseInt(await getCurrentReservedStockById(itemId), 10) || 0;
  const currentStock  = product.stock - reservedStock;

  if (currentStock <= 0) {
    res.json({ status: "Not enough stock available", itemId: product.id });
  }

  reserveStockById(itemId, reservedStock + 1);
  return res.json({
    status : "Reservation confirmed",
    itemId: product.id
  });
});

app.listen(1245);