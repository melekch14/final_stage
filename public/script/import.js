$(document).ready(function () {

    function alertSuccess()
    {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

        Toast.fire({
            icon: 'success',
            title: 'success'
          })
    }

    function alertError()
    {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

        Toast.fire({
            icon: 'error',
            title: 'error'
          })
    }

    $("#import").click(function () {

        const formData = new FormData();
        formData.append("excelFile", $("#fileInput")[0].files[0]);

        $.ajax({
            type: "POST",
            url: "api/import/insert-excel-data",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                $("#result").html(response.message);
                console.log(response.message);
                $("#modalResult").modal('show');
                $("#fileInput").val("");
                alertSuccess();
            },
            error: function (xhr, status, error) {
                alertError();
            }
        });
    });
});