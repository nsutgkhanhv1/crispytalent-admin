const dataTable = $('#currencies_data').DataTable({
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
    url: '/currencies/datatable',
    type: 'get',
    data: function (d) {
      d.filter = {
        [$('#select-filter-field').find(':selected').val()]: $('#filters-input')
          .val()
          .toLowerCase(),
      };
    },
  },
  aaSorting: [],
  columns: [
    { data: 'id' },
    { data: 'name' },
    { data: 'symbol' },
    { data: 'decimal' },
    { data: 'img' },
    { data: 'address' },
    { data: 'status' },
    { data: 'action' },
  ],
});

$('#btn-search-by-filters').on('click', (e) => {
  dataTable.draw();
});

$('#open-create-currency-modal').on('click', (e) => {
  const apiUrl = '/currencies/modal-create';
  helper.show(apiUrl, 'Create Currency');
});

$(document).on('click', '.open-update-modal', (e) => {
  const clickedElement = $(e.target);
  const id = clickedElement.data('id');
  const apiUrl = '/currencies/modal-update' + `/${id}`;
  helper.show(apiUrl, 'Update Currency');
});

$(document).on('click', '.open-delete-modal', (e) => {
  const clickedElement = $(e.target);
  const id = clickedElement.data('id');
  const apiUrl = '/currencies/modal-delete' + `/${id}`;
  helper.show(apiUrl, 'Delete Currency');
});

$(document).on('click', '.open-public-modal', (e) => {
  const clickedElement = $(e.target);
  const id = clickedElement.data('id');
  const apiUrl = '/currencies/modal-public' + `/${id}`;
  helper.show(apiUrl, 'Public Currency');
});

$(document).on('submit', '#create-currency-form', (e) => {
  e.preventDefault();
  formHelper.postFormJson(
    'create-currency-form',
    (data) => {
      dialog.close();
      displayToast(data.status, data.message);
      dataTable.draw();
    },
    (errors) => {
      const erorrsJSON = errors.responseJSON;
      if (erorrsJSON.status == 'error') {
        dialog.close();
        displayToast(erorrsJSON.status, erorrsJSON.message);
      } else {
        renderErrorFormException(JSON.parse(erorrsJSON));
      }
    },
  );
});

$(document).on('submit', '#update-currency-form', (e) => {
  e.preventDefault();
  formHelper.postFormJson(
    'update-currency-form',
    (data) => {
      dialog.close();
      displayToast(data.status, data.message);
      dataTable.draw();
    },
    (errors) => {
      const erorrsJSON = errors.responseJSON;
      if (erorrsJSON.status == 'error') {
        dialog.close();
        displayToast(erorrsJSON.status, erorrsJSON.message);
      } else {
        renderErrorFormException(JSON.parse(erorrsJSON));
      }
    },
  );
});

$(document).on('submit', '#delete-currency-form', (e) => {
  e.preventDefault();
  formHelper.postFormJson(
    'delete-currency-form',
    (data) => {
      dialog.close();
      displayToast(data.status, data.message);
      dataTable.draw();
    },
    (errors) => {
      const erorrsJSON = errors.responseJSON;
      if (erorrsJSON.status == 'error') {
        dialog.close();
        displayToast(erorrsJSON.status, erorrsJSON.message);
      }
    },
  );
});

$(document).on('submit', '#public-currency-form', (e) => {
  e.preventDefault();
  formHelper.postFormJson(
    'public-currency-form',
    (data) => {
      dialog.close();
      displayToast(data.status, data.message);
      dataTable.draw();
    },
    (errors) => {
      const erorrsJSON = errors.responseJSON;
      if (erorrsJSON.status == 'error') {
        dialog.close();
        displayToast(erorrsJSON.status, erorrsJSON.message);
      }
    },
  );
});

const loadFile = function (event) {
  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById('output-upload');
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};
