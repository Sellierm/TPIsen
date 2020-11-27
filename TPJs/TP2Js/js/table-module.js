let getTable = (function(){
    return{
        create : function () {
            let table = document.getElementsByTagName("table")
            for (let i = 0; i < products_data.length; i++){
                document.getElementById('tableProducts').appendChild(getRow.create(i));
            }
        }
    }
})();