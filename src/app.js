import express, { json } from 'express';
import morgan from 'morgan';
import path from 'path';

//import routes
import productRoutes from './routes/products.routes';

//Initialization
const app = express();

//MiddleWares and public files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(json());

// Routes
app.use('/products', productRoutes);

export default app;