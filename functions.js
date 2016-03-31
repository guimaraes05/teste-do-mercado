$(function () {
    var operation = "C"; 
    var selected_index = -1; 
    var tblTrades = localStorage.getItem("tblTrades");
    tblTrades = JSON.parse(tblTrades); //CConverter String em objeto
    if (tblTrades === null) // Se não existe dados, começa com array vazio
        tblTrades = [];

    function createTrade() {
        var trade = JSON.stringify({
                                    codigo: $("#Codigo").val(),
                                    tipo: $("#Tipo").val(),
                                    nome: $("#Nome").val(),
                                    quantidade: $("#Quantidade").val(),
                                    preco: $("#Preco").val(),
                                    negocio: $("#Negocio").val()

        });

        tblTrades.push(trade);
        //Armazenar os dados no localStorage
        localStorage.setItem("tblTrades", JSON.stringify(tblTrades));
        alert("Mercadoria Cadastrada com Sucesso"); //mensagem de alerta
    };
    
    $('#btnView').click(function(){
        $('#tblList').show();
    });


    function editTrade() {
        // Editar os itens que estão na tabela
        tblTrades[selected_index] = JSON.stringify({
            codigo: $("#Codigo").val(),
            tipo: $("#Tipo").val(),
            nome: $("#Nome").val(),
            quantidade: $("#Quantidade").val(),
            preco: $("#Preco").val(),
            negocio: $("#Negocio").val()
        });
        //Armazenar os novos dados no localStorage
        localStorage.setItem("tblTrades", JSON.stringify(tblTrades));
        alert("Os dados foram alterados"); //Alerta de que os dados foram alterados
        return true;
    }

    function deleteTrade() {
        //Eliminar o item selecionado

        tblTrades.splice(selected_index, 1);
        localStorage.setItem("tblTrades", JSON.stringify(tblTrades));
        alert("Deletado com sucesso"); //Alerta de deletado com sucesso
    };

    function listTrade() {
        $("#tblList").html("");
        $("#tblList").html(
                "<thead>" +
                    "<tr>" +
                        "<th>Codigo</th>" +
                        "<th>Tipo</th>" +
                        "<th>Nome</th>" +
                        "<th>Quantidade</th>" +
                        "<th>Preço</th>" +
                        "<th>Negocio</th>" +
                        "<th>Editar</th>" +
                    "</tr>" +
                "</thead>" +
                "<tbody>" +
                "</tbody>"
                ); //Estrutura HTML
        for (var i in tblTrades) {
            var tr = JSON.parse(tblTrades[i]);
            $("#tblList tbody").append("<tr>" +
                    "<td>" + tr.codigo + "</td>" +
                    "<td>" + tr.tipo + "</td>" +
                    "<td>" + tr.nome + "</td>" +
                    "<td>" + tr.quantidade + "</td>" +
                    "<td>" + tr.preco + "</td>" +
                    "<td>" + tr.negocio + "</td>" +
                    "<td><img src='edit.png' alt='editTrade" + i + "'class='btnEdit'/>&nbsp &nbsp<img src='delete.png' alt='deleteTrade" + i + "' class='btnDelete'/></td>" +
                    "</tr>"
                    );
        };
    };

    $("#frmTrade").bind("submit", function () {
        if (operation === "C")
            return createTrade();

        else
            return editTrade();
    }); //Función para decidir si se encuentra añadiendo o editando un item

    listTrade();

    $(".btnEdit").bind("click", function () {
        operation = "E"; //"E" = Editar
        //Obtener el identificador del item a ser editado
        selected_index = parseInt($(this).attr("alt").replace("editTrade", ""));
        // Convertir de JSON al formato adecuando para editarlos datos
        var tr = JSON.parse(tblTrades[selected_index]);
        $("#Codigo").val(tr.codigo);
        $("#Tipo").val(tr.tipo);
        $("#Nome").val(tr.nome);
        $("#Quantidade").val(tr.quantidade);
        $("#Preco").val(tr.preco);
        $("#Negocio").val(tr.negocio);
        
        editTrade();
        listTrade();
    });
    
////    $(".btnDelete").click(function(){
////        selected_index = parseInt($(this).attr("alt").replace("deleteTrade", ""));
////        deleteTrade();
////        listTRade();
//    }
//            );

    $(".btnDelete").bind("click", function () { 
        
        while(selected_index){
        selected_index = parseInt($(this).attr("alt").replace("deleteTrade", ""));
        deleteTrade(); //Deletar o item
        listTrade();
        
        
        }});
});

