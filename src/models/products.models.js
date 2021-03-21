import Sequelize from 'sequelize';
import { sequelize } from '../config/database';

const Products = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.TEXT,
        notEmpty: true
    },
    price: {
        type: Sequelize.INTEGER
    },
    active: {
        type: Sequelize.BOOLEAN
    },
}, {
    timestamps: false
});

export default Products;

/*
email: {
    type: Sequelize.STRING,
    validate: {
        isEmail: true
    }
},

status: {
    type: Sequelize.ENUM('active', 'inactive'),
    defaultValue: 'active'
}
*/