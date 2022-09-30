class Products {
    constructor(){
        this.products = [];
        this.id = 0;
    }

    addProdutcs(product){
        if(this.products.length !== 0){
            product.id = this.products.length + 1;
            this.products.push(product);
        }else{
            product.id = 1;
            this.products.push(product);
        }
        return product.id;
    }

    getAll(){
        let arrayProducts = [];
        this.products.forEach(element => {
            arrayProducts.push(element);
        })
        return arrayProducts;
    }

    getById(id){
        const product = this.products.find(product => product.id === parseInt(id));
        if(product !== undefined){
            return product;
        }else{
            return {'Error': 'Product not found.'};
        }
    }

    update(id, newProduct){
        const product = this.getById(id);
        if(!product.Error){
            this.products.splice(product, 1);
            this.addProdutcs(newProduct);
            return {'Message': 'Modified product.'};    
        }else{
           return product.Error; 
        }
    }

    delete(id){
        const product = this.getById(id);
        if(!product.Error){
            this.products.splice(product, 1);
            return {'Message': 'Removed product.'};
        }else{
            return product.Error;
        }
    }
}

const products = new Products();

module.exports = products;