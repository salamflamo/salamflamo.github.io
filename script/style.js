$(document).ready(function() {
  $('.button-collapse').sideNav();
  var html;
  for (var i = 1; i <= 1; i++) {
    html += '<tr>' +
      '<td>' + i + '</td>' +
      '<td>Kosong</td>' +
      '<td>Rp. 0</td>' +
      '<td>17-8-1945 07:00</td>' +
      '<td>17-8-1945 07:00</td>' +
      '<td><a href="#">hapus</a> | <a href="#">Edit</a></td>' +
      '</tr>';
  }
  $('#pem-isi').html(html);
  var html2;
  for (var i = 1; i <= 1; i++) {
    html2 += '<tr>' +
      '<td>' + i + '</td>' +
      '<td>Kosong</td>' +
      '<td>Rp. 0</td>' +
      '<td>17-8-1945 07:00</td>' +
      '<td>17-8-1945 07:00</td>' +
      '<td><a href="#">hapus</a> | <a href="#">Edit</a></td>' +
      '</tr>';
  }
  $('#peng-isi').html(html2);
  var html3;
  for (var i = 1; i <= 1; i++) {
    html3 += '<tr>' +
      '<td>' + i + '</td>' +
      '<td>Rp. 0</td>' +
      '<td>Kosong</td>' +
      '<td>Belum' +
      '<td>17-8-1945 07:00</td>' +
      '<td><a href="#">hapus</a> | <a href="#">Edit</a></td>' +
      '</tr>';
  }
  $('#hut-isi').html(html3);
  $('ul.tabs').tabs();
  if (document.cookie != "") {
    $('#a').attr('onclick', 'dash()');
    $('#b').attr('onclick', 'pem()');
    $('#c').attr('onclick', 'peng()');
    $('#d').attr('onclick', 'hut()');
  }
  $('a.btn-floating').click(function() {
    unHideForm();
  });
});

function dash() {
  $('.button-collapse').sideNav('hide');
  $('#dashboard').removeClass("hidden");
  $('#pemasukan').addClass("hidden");
  $('#pengeluaran').addClass("hidden");
  $('#hutang').addClass("hidden");
  hideForm();
  setFalse();
}

function pem() {
  $('.button-collapse').sideNav('hide');
  $('#dashboard').addClass("hidden");
  $('#pemasukan').removeClass("hidden");
  $('#pengeluaran').addClass("hidden");
  $('#hutang').addClass("hidden");
  hideForm();
  setFalse();
}

function peng() {
  $('.button-collapse').sideNav('hide');
  $('#dashboard').addClass("hidden");
  $('#pemasukan').addClass("hidden");
  $('#pengeluaran').removeClass("hidden");
  $('#hutang').addClass("hidden");
  hideForm();
  setFalse();
}

function hut() {
  $('.button-collapse').sideNav('hide');
  $('#dashboard').addClass("hidden");
  $('#pemasukan').addClass("hidden");
  $('#pengeluaran').addClass("hidden");
  $('#hutang').removeClass("hidden");
  hideForm();
  setFalse();
}

function logged() {
  var profile = readCookie();
  $('.circle').attr("src", profile[3]);
  $('.name').text(profile[1]);
  $('.email').text(profile[2]);
  $('#login').addClass("hidden");
  $('.button-collapse').removeClass("hidden");
  $('#dashboard').removeClass("hidden");
}

function unHideForm() {
  $('#pem-form').removeClass("hidden");
  $('#peng-form').removeClass("hidden");
  $('#hut-form').removeClass("hidden");
  $('#pem-table').addClass("hidden");
  $('#peng-table').addClass("hidden");
  $('#hut-table').addClass("hidden");
}

function hideForm() {
  $('input').val("");
  $('#pem-form').addClass("hidden");
  $('#peng-form').addClass("hidden");
  $('#hut-form').addClass("hidden");
  $('#pem-table').removeClass("hidden");
  $('#peng-table').removeClass("hidden");
  $('#hut-table').removeClass("hidden");
}