$(document).ready(function () {
  // Retrieve the data from localStorage
  var dataReceived = localStorage.getItem("retraitData");
  var retraitid = "";
  if (dataReceived) {
    var data = JSON.parse(dataReceived);
    retraitid = data.retrait;
  }

  $("#add_offre").click(function () {
    var title = $("#offre_title").val();

    $.ajax({
      url: "/api/sous-offre/create/",
      method: "POST",
      data: { retrait: retraitid, titre: title },
      success: function (response) {
        displayAllOffre(retraitid);
        $("#offreMod").modal("hide");
      },
      error: function (error) {
        console.log(error);
        // Handle error
      }
    });
  });

  $.ajax({
    url: "/api/lotissemnts/getByRetrait/" + retraitid,
    method: "GET",
    success: function (response) {
      response = response.data
      var options = '';
      if (response && response.length > 0) {
        options += '<option value="0">selectionner lotissement</option>';
        response.forEach(function (lotissement) {
          options += '<option value="' + lotissement.code_lotissement + '">' + lotissement.nom + '</option>';
        });
        $('#lotissement_select').html(options);
      }
    },
    error: function (error) {
      console.log(error);
      // Handle error
    }
  });

  $("#add_soum").click(function () {
    var principal = $("#Principale").val();
    var option1 = $("#option1").val();
    var option2 = $("#option2").val();
    var id_sousoff = $("#id_sousoff").val();
    var lot = $('#lot_select').val();

    $.ajax({
      url: "/api/soumission/create/",
      method: "POST",
      data: { option1: option1, option2: option2, principal: principal, id_s_offre: id_sousoff, lot: lot },
      success: function (response) {
        getAllSoumissionsByOffre(id_sousoff);
        $("#soumMod").modal("hide");
      },
      error: function (error) {
        console.log(error);
        // Handle error
      }
    });

  });

  $('#lotissement_select').on('change', function () {
    var idLotissement = $(this).val();

    if (idLotissement != 0) {
      $.ajax({
        url: "/api/lot/getByLotissement/" + idLotissement,
        method: "GET",
        success: function (response) {
          $('#lot_select').html("");
          response = response.data
          if (response && response.length > 0) {
            var options = '';
            response.forEach(function (lot) {
              options += '<option value="' + lot.code_lot + '">' + lot.code_lot + '</option>';
            });
            $('#lot_select').html(options);
          }
        },
        error: function (error) {
          console.log(error);
          // Handle error
        }
      });
    }
  });

  displayAllOffre(retraitid);

  function displayAllOffre(id) {
    $.ajax({
      url: "/api/sous-offre/getAllByRetrait/" + id,
      method: "GET",
      success: function (response) {
        console.log(response);
        populateTableBody(response);
      },
      error: function (error) {
        console.log(error);
        // Handle error
      }
    });
  }

  function populateTableBody(data) {
    var tbody = $('#offreTable tbody');
    tbody.html("");
      data.forEach(function(item) {
        var row = '<tr><td>' + item.titre + '</td><td>' + item.participant + '</td><td>' + item.appel + '</td> <td> <a href="#" id="'+item.id_soff+'" class="btn btn-dim btn-sm btn-warning soumission-button">Soumissions</a> </td></tr>';
        tbody.append(row);
      });
  }

  $("#offreTable tbody").on('click', '.soumission-button', function () {
    var id = $(this).attr('id');
    $("#id_sousoff").val(id);
    $("#all_soumissions").removeClass("d-sm-none");
    getAllSoumissionsByOffre(id);
  });

  function getAllSoumissionsByOffre(offre){
    $.ajax({
      url: "/api/soumission/getAllByOffre/" + offre,
      method: "GET",
      success: function (response) {
        console.log(response);
        populateTableSoumission(response);
      },
      error: function (error) {
        console.log(error);
        // Handle error
      }
    });
  }

  

  function populateTableSoumission(data) {
    var tbody = $('#soumTable tbody');
    tbody.html("");
      data.forEach(function(item) {
        var row = '<tr><td>' + item.code_lot + '</td><td>' + item.principal + '</td><td>' + item.option1 + '</td> <td>'+item.option2+'</td></tr>';
        tbody.append(row);
      });
  }






});