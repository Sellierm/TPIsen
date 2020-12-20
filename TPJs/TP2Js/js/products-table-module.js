let getTableProducts = (function(){
    return{
        create : function () {
            for (let i = 0; i < products_data.length; i++){
                document.getElementById('tableProducts').appendChild(getRowComponents.create(i));
            }
        }
    }
})();


