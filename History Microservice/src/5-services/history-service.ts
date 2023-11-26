import { HistoryModel, IHistoryModel } from "../2-models/history-product-model";

// Get all history-products-deleted items:
async function getAllHistoryProduct(): Promise<IHistoryModel[]> {
    return HistoryModel.find().select("-createdAt -updatedAt").exec();
}


// Add new deleted product - that user delete this 
async function saveHistory(deleted: IHistoryModel): Promise<void> {
    const historyProduct = new HistoryModel({ 
        productId: deleted._id,
        name: deleted.name,
        price: deleted.price,
        stock: deleted.stock,
        categoryId: deleted.categoryId,
        
    })
    await historyProduct.save();
}

export default {
    saveHistory,
    getAllHistoryProduct,
   
};

