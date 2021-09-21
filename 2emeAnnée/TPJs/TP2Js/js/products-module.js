let getProducts=(function(){
    return{
        getName: function (id){return products_data[id].name},
        getTime_prep: function (id){return products_data[id].time},
        getComponents: function (id){return products_data[id].components},
        isInBulk : function (components){
            let bulk  = 0;
            for (let i = 0; i < components.length; i++) {
                if(getComponent.getBuyInBulk(components[i]) == 1){
                    bulk++;
                }
            }
            return bulk;
        },
        countRecipe : function (components){
            let recipes = 0;
            for (let i = 0; i < components.length; i++) {
                if(getComponent.getNeedRecipe(components[i]) == 1){
                    recipes++;
                }
            }
            return recipes;
        },
        displayComponents : function (components,comp) {
            for (let i = 0; i < components.length; i++) {
                comp.textContent += getComponent.getName(components[i]);
                comp.textContent += ", "
            }
        },
        calculPrice: function (components) {
            let price = 0;
            for (let i = 0; i < components.length; i++) {
                console.log(getComponent.getPrice(components[i]))
                price += getComponent.getPrice(components[i])*getComponent.getPercentUsed(components[i]);
            }
            return Math.round(price*1000) /1000;
        },
    }

})();