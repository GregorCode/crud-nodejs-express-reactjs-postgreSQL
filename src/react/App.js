import React, { Component } from 'react';

class App extends Component {

    //inicio el formulario con un estado vacio
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            price: '',
            active: false,
            products: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClickSwitch = this.handleClickSwitch.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    //capturar los cambios hechos en las cajas de texto
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    //cambiar el estado del switch cuando se le hace click
    handleClickSwitch() {
        this.setState(state => ({
            active: !state.active
        }));
    }

    //cambiar el estado del switch cuando se quiere editar el producto
    changeStateSwitch() {
        var checkbox = document.querySelector('input[name="active"]');

        if (this.state.active == true) {
            checkbox.checked = true
        }else{
            checkbox.checked = false
        }
    }

    //evento que se dispara al abrir la pagina
    componentDidMount() {
        this.fetchProducts();
    }
    
    //busco todos los productos
    fetchProducts() {
        fetch('/products')
            .then(res => res.json())
            .then(data => {
                this.setState({products: data});
            });
    }

    //agrego producto
    addProduct(e) {
        e.preventDefault(); // para no refrescar la pagina
        //si el id no esta vacio lo que tengo que hacer es un update al producto
        if(this.state.id) {
            fetch(`/products/${this.state.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: this.state.name,
                    price: this.state.price,
                    active: this.state.active
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.M.toast({html: 'Producto editado'});
                    this.setState({id:'', name:'', price:'', active:this.state.active});
                    this.fetchProducts();
                });
        } else {
            //creo el producto
            fetch('/products', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.M.toast({html: 'Producto guardado'});
                    this.setState({id:'', name:'', price:'', active:this.state.active});
                    this.fetchProducts();
                })
                .catch(err => console.error(err));
            
        }
    }

    //edito producto
    editProduct(id) {
        fetch(`/products/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({id:data.id, name:data.name, price:data.price, active:data.active});
                this.changeStateSwitch();
            });
    }
    
    //elimino producto
    deleteProduct(id) {
        if(confirm('Estas seguro que quieres eliminar este producto?')) {
            fetch(`/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html: 'Producto Eliminado'});
                    this.setState({id:'', name:'', price:'', active:this.state.active});
                    this.fetchProducts();
                })
                .catch(err => console.error(err));
        }
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#" className="brand-logo">Node + React + PostgreSQL</a>
                        </div>
                    </div>
                </nav>
                
                <div className="container">
                    <div className="row">
                        {
                            <div className="col s5">
                                <div className="card">
                                    <div className="card-content">
                                        <form onSubmit={this.addProduct}>

                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Nombre del producto" autoFocus/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input name="price" onChange={this.handleChange} value={this.state.price} type="number" placeholder="Precio del producto" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="switch col s12">
                                                    Producto Activo?
                                                    <br/>
                                                    <label>
                                                        No
                                                        <input name="active" value={this.state.active} onChange={this.handleClickSwitch} type="checkbox" />
                                                        <span className="lever"></span>
                                                        Si 
                                                    </label>
                                                </div>
                                            </div> 

                                            <button type="submit" className="btn light-blue darken-4">
                                                Enviar 
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Activo</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { 
                                        this.state.products.map(product => {
                                            return (
                                                <tr key={product.id}>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{String(product.active)}</td>
                                                    <td>
                                                        <button onClick={() => this.editProduct(product.id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                                                            <i className="material-icons">edit</i>
                                                        </button>

                                                        <button onClick={() => this.deleteProduct(product.id)} className="btn light-blue darken-4">
                                                            <i className="material-icons">delete</i> 
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;