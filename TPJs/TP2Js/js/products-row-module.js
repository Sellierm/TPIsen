let getRowProducts = (function (){

    return{
        getElem : function (nodeName){
            return document.getElementById(nodeName);
        },
        createElem : function (type){
            return document.createElement(type);
        },
        createChild : function (parent,enfant){
            parent.appendChild(enfant);
        },
        displayProducts : function (carac,attribut){
            carac.textContent = attribut;
        },
        create : function(index){
            let row = getRowProducts.createElem('tr');
            let arrayComps = getProducts.getComponents(index);

            let name = getRowProducts.createElem('td');
            getRowProducts.displayProducts(name, getProducts.getName(index));
            getRowProducts.createChild(row, name);

            let prep = getRowProducts.createElem('td');
            getRowProducts.displayProducts(prep, getProducts.getTime_prep(index));
            getRowProducts.createChild(row, prep);

            let composants = getRowProducts.createElem('td');
            getProducts.displayComponents(arrayComps, composants);
            getRowProducts.createChild(row, composants);

            let price = getRowProducts.createElem('td');
            getRowProducts.displayProducts(price, getProducts.calculPrice(arrayComps));
            getRowProducts.createChild(row, price);

            let Recipients = getRowProducts.createElem('td');
            getRowProducts.displayProducts(Recipients, getProducts.countRecipe(arrayComps));
            getRowProducts.createChild(row, Recipients);

            let bulk = getRowProducts.createElem('td');
            getRowProducts.displayProducts(bulk, getProducts.isInBulk(arrayComps));
            getRowProducts.createChild(row, bulk);
            return row;
        }
    }
})()



