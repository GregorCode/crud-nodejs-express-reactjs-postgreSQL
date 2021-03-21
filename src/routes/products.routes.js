import { Router } from 'express';
const router = Router();
import { getAllProducts, getOneProduct, addOneProduct, updateOneProduct, deleteOneProduct } from '../controllers/products.controllers';

router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.post('/', addOneProduct);
router.put('/:id', updateOneProduct);
router.delete('/:id', deleteOneProduct);

export default router;