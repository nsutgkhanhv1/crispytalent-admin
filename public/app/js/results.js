const dataTable = $('#results_data').DataTable({
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
    url: '/results/datatable',
    type: 'get',
    data: function (d) {
      d.filter = {
        ['id']: '',
      };
    },
  },
  aaSorting: [],
  columns: [
    { data: 'id' },
    { data: 'score' },
    { data: 'note' },
    { data: 'user_email' },
    { data: 'test_name' },
    { data: 'assessment_name' },
  ],
});

$('#btn-search-by-filters').on('click', (e) => {
  dataTable.draw();
});

$('#btn-export').on('click', (e) => {
  $.ajax({
    url: '/results/export',
    method: 'get',
    error: function (response) {
      console.log(response);
    },
    success: function (response) {
      function downloadURI(uri, name) {
        var link = document.createElement('a');
        // If you don't know the name or want to use
        // the webserver default set name = ''
        link.setAttribute('download', name);
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
      downloadURI(response.data, 'result.csv');
    },
  });
});
