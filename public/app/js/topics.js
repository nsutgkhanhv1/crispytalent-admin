const dataTable = $('#topics_data').DataTable({
  processing: true,
  serverSide: true,
  searching: false,
  serverMethod: 'get',
  columnDefs: [
    {
      targets: '_all',
      orderSequence: ['desc', 'asc'],
    },
  ],
  ajax: {
    url: '/topics/datatable',
    type: 'get',
    data: function (d) {
      d.filter = {
        ['question']: $('#filters-input').val().toLowerCase(),
      };
    },
  },
  aaSorting: [],
  columns: [
    { data: 'id' },
    { data: 'question' },
    { data: 'answer' },
    { data: 'test_id' },
    { data: 'action' },
  ],
});

$('#btn-search-by-filters').on('click', (e) => {
  dataTable.draw();
});
var csvFile;

function input(e) {
  csvFile = e.target.files[0];
}

function importTopic(e) {
  const apiUrl = '/topics/import';
  const csrf = $('meta[name="_csrf"]');
  e.preventDefault();
  let formData = new FormData();
  formData.append('files', csvFile);
  formData.append('_token', csrf);
  $.ajax({
    type: 'POST',
    processData: false,
    contentType: false,
    data: formData,
    url: apiUrl,
    success: function (data) {
      dialog.close();
      displayToast(data.status, data.message);
      dataTable.draw();
    },
    error: function (error) {
      console.log(error);
      const errorJson = error.statusText;
      $(`#error-approve`).show();
      $(`#error-approve-asset`).text(errorJson);
    },
  });
}
