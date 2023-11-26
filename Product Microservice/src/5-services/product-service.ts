import axios from "axios";
import { IProductModel, ProductModel } from "../2-models/product-model";
import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";


// Get all products from database: 
function getAllProducts(): Promise<IProductModel[]> {
    return ProductModel.find().exec();
}

// //Get one product that user choose from database: - notice : _id in mongo db is string
async function getOneProduct(_id: string): Promise<IProductModel>{
    const product = await ProductModel.findById( { _id }).exec();
    if(!product) throw new ResourceNotFoundError(_id);
    return product;
}

// Add product
async function addProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return product.save();
}

// Update product
// { returnOriginal: false } --> Don't return the original product, but the updated one.
async function updateProduct(product: IProductModel): Promise<IProductModel> {

    //first in add / update / delete - must be validation.
    const errors = product.validateSync();

    if (errors) throw new ValidationError(errors.message);
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec();
    if (!updatedProduct) throw new ResourceNotFoundError(product._id);
    return updatedProduct;
}

// // Delete product
// async function deleteProduct(_id: string): Promise<void> {

//     const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
//     if (!deletedProduct) throw new ResourceNotFoundError(_id);

//     await axios.post("http://localhost:4002/api/history", { product:  deletedProduct });

// }

// Delete product
async function deleteProduct(_id: string): Promise<void> {
    const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
    console.log(deletedProduct);
    console.log(deletedProduct._id);
    console.log(deletedProduct.name);

    if (!deletedProduct) throw new ResourceNotFoundError(_id);
    axios.post("http://localhost:4002/api/history", deletedProduct.toObject());
    
}


export default {
    
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct,
   
};

