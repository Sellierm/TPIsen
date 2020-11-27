function displayTable(){
    for (let i = 0; i < products_data.length; i++) {
        let row = display.createElem('tr');
        let comp = getProducts.getComponents(i);


        let name = display.createElem('td');
        display.displayProducts(name, getProducts.getName(i));
        display.createChild(row, name);

        let prep = display.createElem('td');
        display.displayProducts(prep, getProducts.getTime_prep(i));
        display.createChild(row, prep);

        let composants = display.createElem('td');
        display.displayComponents(comp, composants);
        display.createChild(row, composants);

        let price = display.createElem('td');
        let sum = display.calculPrice(comp);
        //console.log(sum);
        display.displayProducts(price, sum);
        display.createChild(row, price);

        let Recipients = display.createElem('td');
        let nbRecipes = display.countRecipe(comp);
        display.displayProducts(Recipients, nbRecipes);
        display.createChild(row, Recipients);

        let bulk = display.createElem('td');
        let isBulk = display.isInBulk(comp);
        display.displayProducts(bulk, isBulk);
        display.createChild(row, bulk);
        document.getElementById('myTable').appendChild(row);
    }
}

displayTable();
