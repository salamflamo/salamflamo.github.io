$(document).ready(function() {
  $('.button-collapse').sideNav();
  var html;
  var html2;
  for (var i = 1; i <= 10; i++) {
    html += '<tr>' +
      '<td>' + i + '</td>' +
      '<td>Donatur</td>' +
      '<td>Rp. 1500000</td>' +
      '<td>2017-12-04</td>' +
      '<td><a href="#">hapus</a> | <a href="#">Edit</a></td>' +
      '</tr>';
  }
  $('#pem-isi').html(html);
  for (var i = 1; i <= 10; i++) {
    html2 += '<tr>' +
      '<td>' + i + '</td>' +
      '<td>Bayar zakat</td>' +
      '<td>Rp. 1500000</td>' +
      '<td>2017-12-04</td>' +
      '<td><a href="#">hapus</a> | <a href="#">Edit</a></td>' +
      '</tr>';
  }
  $('#peng-isi').html(html2);
  $('ul.tabs').tabs();
});

function dash() {
  $('.button-collapse').sideNav('hide');
  $('#dashboard').removeClass("hidden");
  $('#pemasukan').addClass("hidden");
  $('#pengeluaran').addClass("hidden");
}

function pem() {
  $('.button-collapse').sideNav('hide');
  $('#dashboard').addClass("hidden");
  $('#pemasukan').removeClass("hidden");
  $('#pengeluaran').addClass("hidden");
}

function peng() {
  $('.button-collapse').sideNav('hide');
  $('#dashboard').addClass("hidden");
  $('#pemasukan').addClass("hidden");
  $('#pengeluaran').removeClass("hidden");
}