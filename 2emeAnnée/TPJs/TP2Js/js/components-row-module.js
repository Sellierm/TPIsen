let getRowComponents = (function (){
    return {
        createElem : function (type){
            return document.createElement(type);
        },
        createChild : function (parent,enfant){
            parent.appendChild(enfant);
        },
        displayComponents : function (carac,attribut){
            carac.textContent = attribut;
        },
        create : function (i){
            let row = getRowComponents.createElem("tr");

            let name = getRowComponents.createElem("td");
            getRowComponents.displayComponents(name,getComponent.getName(i));
            getRowComponents.createChild(row,name);

            let recipe = getRowComponents.createElem("td");
            if(getComponent.getNeedRecipe(i) == 1){
                getRowComponents.displayComponents(recipe,"oui");
            }
            else{
                getRowComponents.displayComponents(recipe,"non");
            }
            getRowComponents.createChild(row,recipe);

            let price = getRowComponents.createElem("td");
            getRowComponents.displayComponents(price,getComponent.getPrice(i));
            getRowComponents.createChild(row,price);

            let type = getRowComponents.createElem("td");
            getRowComponents.displayComponents(type,getComponent.getType(i));
            getRowComponents.createChild(row,type);

            let bulk = getRowComponents.createElem("td");
            if(getComponent.getBuyInBulk(i) == 1){
                getRowComponents.displayComponents(bulk,"oui");
            }
            else{
                getRowComponents.displayComponents(bulk,"non");
            }
            getRowComponents.createChild(row,bulk);

            let percentUsed = getRowComponents.createElem("td");
            getRowComponents.displayComponents(percentUsed,getComponent.getPercentUsed(i));
            getRowComponents.createChild(row,percentUsed);

            return row;

        }
    }

}());