let getProducts=(function(){
    return{
        getName(id){return products_data[id].name},
        getTime_prep(id){return products_data[id].time},
        getComponents(id){return products_data[id].components}
    }

})();