import Product from '../models/products.models';

//Obtener todos los productos
export async function getAllProducts(req, res) {
    try {
        const products = await Product.findAll({ 
            attributes: ['id', 'name', 'price', 'active'], 
            order: [ ['id', 'ASC'] ]
        });
        res.json(products);
    } catch (err) {
        console.log(err);
        res.json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}

//Obtener un producto
export async function getOneProduct(req, res) {
    const { id } = req.params;
    try {
        const product = await Product.findOne({
            attributes: ['id', 'name', 'price', 'active'],
            where: { id }
        });
        res.json(product);
    } catch (err) {
        console.log(err);
        res.json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}

export async function deleteOneProduct(req, res) {
    const { id } = req.params;
    try {
        await Product.destroy({
            where: { id }
        });
        res.json({
            message: 'Producto eliminado satisfactoriamente'
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}

export async function addOneProduct(req, res) {
    const { name, price, active } = req.body;
    try {
        await Product.create({
            name,
            price,
            active
        }, {
            fields: ['name', 'price', 'active']
        });
        res.json({
            message: 'Producto creado satisfactoriamente'
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}

export async function updateOneProduct(req, res) {
    const { id } = req.params;
    const { name, price, active } = req.body;
    try {
        //filtro por el id del producto
        const product = await Product.findOne({
            attributes: ['id', 'name', 'price', 'active'],
            where: { id }
        });

        //edito el producto filtrado
        await product.update({
            name,
            price,
            active
        }, {
            where: { id }
        });
        res.json({
            message: 'Producto actualizado satisfactoriamente'
        });

    } catch (err) {
        console.log(err);
        res.json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}