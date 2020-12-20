let getTableComponents = (function(){
    return{
        create : function () {
            let Table = document.getElementById("tableComponents")
            console.log(Table)
            for (let i = 0; i < components_data.length; i++){
                Table.appendChild(getRowComponents.create(i));
            }
        }
    }
})();

