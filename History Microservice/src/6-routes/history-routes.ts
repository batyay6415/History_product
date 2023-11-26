import express, { Request, Response, NextFunction } from "express";
import historyService from "../5-services/history-service";


const router = express.Router();//Capital R

// GET http://localhost:4002/api/history
router.get("/api/history", async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const history = await historyService.getAllHistoryProduct();
        response.json(history);
    }
    catch(err: any) {
        next(err);
    }
});

// POST http://localhost:4002/api/history
router.post("/api/history", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const deleted = request.body
        await historyService.saveHistory(deleted);
        response.sendStatus(200);

    }
    catch(err: any) {
        next(err);
    }
});


export default router;
