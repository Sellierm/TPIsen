let products_data = [
    { idProd:'0', name: 'Métier à Tisser', time: '30', components: ['14','15','16']},
    { idProd:'1', name: 'Bocal à Cookies', time: '15', components: ['0','1','2','3','4','5','6']},
    { idProd:'2', name: 'Beaume à lèvres', time: '15', components: ['7','8','9','10']},
    { idProd:'3', name: 'Post-it maison', time: '25', components: ['11','12','13']},
    { idProd:'4', name: 'Eponge Tawashi', time: '5', components: ['17','13']},
    { idProd:'5', name: 'Liqueur', time: '30', components: ['18','19','20','23','24','6']},
    { idProd:'6', name: 'Lessive', time: '14', components: ['6','20','21','22']},
];

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
                price += getComponent.getPrice(components[i])*getComponent.getPercentUsed(components[i]);
            }
            return Math.round(price*1000) /1000;
        },
    }

})();