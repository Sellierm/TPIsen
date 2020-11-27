let getComponent=(function(){
    return{
        getName(id){ return components_data[id].name},
        getNeedRecipe(id){ return components_data[id].needRecipe},
        getPrice(id){return components_data[id].price},
        getType(id){return components_data[id].type},
        getBuyInBulk(id){return components_data[id].buyInBulk},
        getPercentUsed(id){return components_data[id].percentUsed}
    }
})();
