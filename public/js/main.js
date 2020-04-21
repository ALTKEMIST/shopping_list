var lista = {};

function add(){
    var prod = producto.value;
    var prc = precioP.value;

    lista[prod] = prc;

    alert ("El producto: " + prod + " fue añadido a la lista de compra.")

    updateList (lista);
    calcTotal(lista);

    producto.value = "";
    precioP.value = "";

    localStorage.setItem('Lista', JSON.stringify(lista));
}

function updateList(lista){
    // imprimir lista
    var cadT = "";
    for (var precio in lista){
        cadT +=  "<tr><td><button class='btn btn-light' data-toggle='tooltip' data-placement='top' title='Quitar producto' onclick=remove('"+precio+"')><i class='fas fa-trash-alt'></i></button></td><td>"+precio+":</td> <td class='text-right'>"+lista[precio]+"</td></tr>";
    }

    document.getElementById("shopping_list").innerHTML = cadT;
}

function remove(producto){
    if (confirm("¿Está seguro que desea quitar "+producto+" de su lista?")){
        delete lista[producto];
        localStorage.setItem('Lista', JSON.stringify(lista));
        updateList (lista);
        calcTotal(lista);
    }
}

function calcTotal(lista){
    var total = 0;
    for (var precio in lista){
        total = total +  parseFloat(lista[precio]);
    }

    document.getElementById("total").innerHTML = total;
}

function deleteList(){

    if (confirm("¿Está seguro que desea eliminar su lista actual?")){
        lista = {};

        document.getElementById("shopping_list").innerHTML = "";
        document.getElementById("total").innerHTML = "0";

        localStorage.removeItem('Lista')
    }    
}

function loadLista(){
    lista = JSON.parse(localStorage.getItem('Lista'));

    if (lista==null){
        lista = {};
    }

    updateList (lista);
    calcTotal(lista);
}