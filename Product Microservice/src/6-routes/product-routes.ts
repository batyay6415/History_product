import express, { Request, Response, NextFunction } from "express";
import searchService from "../5-services/product-service";
import productService from "../5-services/product-service";
import { ProductModel } from "../2-models/product-model";

const router = express.Router();


// GET http://localhost:4001/api/products
router.get("/api/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productService.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4001/api/products/:_id
router.get("/api/products/:_id([0-9a-fA-F]{24})", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const product = await productService.getOneProduct(_id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4001/api/products
router.post("/api/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await productService.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:4001/api/products/:_id
router.put("/api/products/:_id([0-9a-fA-F]{24})", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        const product = new ProductModel(request.body);
        const updatedProduct = await productService.updateProduct(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:4001/api/products/:id
router.delete("/api/products/:_id([0-9a-fA-F]{24})", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await productService.deleteProduct(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});



export default router;
