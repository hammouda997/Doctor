import {Router} from "express";

import productController from "../controllers/product-controller";

const products = Router();

products.get("/all", productController.getAllProducts);

products.patch("/", productController.create);

export default products;
