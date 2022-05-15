class Container {
    constructor(){
        this.products = [];
        this.counter = 1;
    };

   addProduct = (product) => {
        const id = this.counter;
        const productToPush = product;
        productToPush.id = id;
        this.products.push(productToPush);
        this.counter++;
        return id;
   };

   getProducts = () => {
       return this.products;
   };

   getProductById = (id) => {
        let product;
        this.products.forEach((p) => {
            if(p.id === id){
                product = p;
            }
        })

        return product;
   };

   updateProductById = (id, newProduct) => {
       const index = this.products.findIndex(p => p.id === id);

       if(index !== -1){
           newProduct.id = id;
           this.products[index] = newProduct;
           return "Se actualizo el producto."
       } else {
           return "Producto no existente";
       };
   };

   deleteProductById = (id) => {
        const index = this.products.findIndex(p => p.id === id);

        if(index !== -1){
            this.products.splice(index, 1);
            return "Producto eliminado correctamente";
        } 
        else return "El producto no existe";
   }

};

module.exports = Container;