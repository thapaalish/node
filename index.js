import express from "express";
const app = express();

// use json file
app.use(express.json());

let productList = [
  {
    id: 1,
    name: "Rice",
    price: 3500,
    quantity: 30,
  },
  {
    id: 2,
    name: "Wheat",
    price: 1500,
    quantity: 60,
  },
  {
    id: 3,
    name: "buck wheat",
    price: 1500,
    quantity: 60,
  },
  {
    id: 4,
    name: "Maize",
    price: 1500,
    quantity: 60,
  },
];

// add product

app.post("/product/add", (req, res) => {
  const newProduct = req.body;

  productList.push(newProduct);
  //console.log(productList);
  return res.status(201).send({ message: "product is added Successfully" });
});

// get product
app.get("/product/list", (req, res) => {
  return res.status(200).send(productList);
});

// delete a product

app.delete("/product/delete/:id", (req, res) => {
  const productIdToBeDeleted = Number(req.params.id);

  const newProductList = productList.filter((item) => {
    return item.id !== productIdToBeDeleted;
  });

  productList = structuredClone(newProductList);
  return res.status(200).send("deleting");
});

// edit a product
// id
// new Value

app.put("/product/edit/:id", (req, res) => {
  console.log(req.params);
  const productIdToBeEdited = Number(req.params.id);

  const requiredProduct = productList.find((item, index, self) => {
    return item.id === productIdToBeEdited;
  });

  if (!requiredProduct) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  const newValues = req.body;

  const newProductList = productList.map((item) => {
    if (item.id === productIdToBeEdited) {
      item.name = newValues.name;
      item.price = newValues.price;
      item.quantity = newValues.quantity;

      return item;
    }

    return item;
  });

  productList = structuredClone(newProductList);

  return res.status(200).send({ message: "Product is edited successfully." });
});

const port = 4000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
