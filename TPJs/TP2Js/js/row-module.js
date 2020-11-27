let getRow = (function (){

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
            let row = getRow.createElem('tr');
            let arrayComps = getProducts.getComponents(index);

            let name = getRow.createElem('td');
            getRow.displayProducts(name, getProducts.getName(index));
            getRow.createChild(row, name);

            let prep = getRow.createElem('td');
            getRow.displayProducts(prep, getProducts.getTime_prep(index));
            getRow.createChild(row, prep);

            let composants = getRow.createElem('td');
            getProducts.displayComponents(arrayComps, composants);
            getRow.createChild(row, composants);

            let price = getRow.createElem('td');
            getRow.displayProducts(price, getProducts.calculPrice(arrayComps));
            getRow.createChild(row, price);

            let Recipients = getRow.createElem('td');
            getRow.displayProducts(Recipients, getProducts.countRecipe(arrayComps));
            getRow.createChild(row, Recipients);

            let bulk = getRow.createElem('td');
            getRow.displayProducts(bulk, getProducts.isInBulk(arrayComps));
            getRow.createChild(row, bulk);
            return row;
        }
    }
})()



