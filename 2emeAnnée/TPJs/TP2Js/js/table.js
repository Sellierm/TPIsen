let display = (function (){

    return{
        calculPrice: function (components) {
            let sum = 0;
            for (let i = 0; i < components.length; i++) {
                console.log(getComponent.getPrice(components[i]))
                sum += getComponent.getPrice(components[i])*getComponent.getPercentUsed(components[i]);
            }
            return Number.parseFloat(sum).toPrecision(4);;
        },
        displayComponents : function (components,comp) {
            for (let i = 0; i < components.length; i++) {
                comp.textContent += getComponent.getName(components[i]);
                comp.textContent += ", "
            }
        },
        isInBulk : function (components){
            for (let i = 0; i < components.length; i++) {
                if(getComponent.getBuyInBulk(i) == 0){
                    return "non";
                }
            }
            return "oui";
        },
        countRecipe : function (components){
            let recipes = 0;
            for (let i = 0; i < components.length; i++) {
                if(getComponent.getNeedRecipe(i) == 1){
                    recipes++;
                }
            }
            return recipes;
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
    }
})()



