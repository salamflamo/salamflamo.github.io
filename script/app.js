var ispemupdate;
var ispengupdate;
var ishutupdate;
var Uid;
var dt = new Date();
var date = dt.getDate() + "-" + dt.getMonth() + "-" + dt.getFullYear() + " " + dt.getHours() + ":" + dt.getMinutes();

function setFalse() {
  ispemupdate = false;
  ispengupdate = false;
  ishutupdate = false;
}
$(document).ready(function() {
  $('button[name=batal]').click(function() {
    hideForm();
    setFalse();
  });
  //////////TODO
  /*
    ini milik pemasukan;
    silahkan edit dibawah
  */
  $('button[name=pem-simpan]').click(function() {
    var updates = {};
    if (ispemupdate) {
      var data = {
        id: $('input[name=pem-id]').val(),
        nominal: $('input[name=pem-nominal]').val(),
        sumber: $('input[name=pem-sumber]').val(),
        updated: date,
        tgl: parseInt($('input[name=pem-tgl]').val()),
        bln: parseInt($('input[name=pem-bln]').val()),
        th: parseInt($('input[name=pem-th]').val()),
        jam: $('input[name=pem-jam]').val()
      };
      updates['/pemasukan/' + Uid + "/" + $('input[name=pem-id]').val()] = data;
      ispemupdate = false;
    } else {
      var id = firebase.database().ref().child("pemasukan/" + Uid).push().key;
      var data = {
        id: id,
        nominal: parseInt($('input[name=pem-nominal]').val()),
        sumber: $('input[name=pem-sumber]').val(),
        updated: date,
        tgl: dt.getDate(),
        bln: dt.getMonth(),
        th: dt.getFullYear(),
        jam: dt.getHours() + ":" + dt.getMinutes()
      };
      updates['/pemasukan/' + Uid + "/" + id] = data;
    }
    firebase.database().ref().update(updates);
    pemReload(iter, Uid);
    hideForm();
  });
  //////////TODO
  /*
    ini milik pengeluaran;
    silahkan edit dibawah
  */
  $('button[name=peng-simpan]').click(function() {
    var updates = {};
    if (ispengupdate) {
      var data = {
        id: $('input[name=peng-id]').val(),
        nominal: $('input[name=peng-nominal]').val(),
        keperluan: $('input[name=peng-keperluan]').val(),
        updated: date,
        tgl: parseInt($('input[name=peng-tgl]').val()),
        bln: parseInt($('input[name=peng-bln]').val()),
        th: parseInt($('input[name=peng-th]').val()),
        jam: $('input[name=peng-jam]').val()
      };
      updates['/pengeluaran/' + Uid + "/" + $('input[name=peng-id]').val()] = data;
      ispengupdate = false;
    } else {
      var id = firebase.database().ref().child("pengeluaran/" + Uid).push().key;
      var data = {
        id: id,
        nominal: parseInt($('input[name=peng-nominal]').val()),
        keperluan: $('input[name=peng-keperluan]').val(),
        updated: date,
        tgl: dt.getDate(),
        bln: dt.getMonth(),
        th: dt.getFullYear(),
        jam: dt.getHours() + ":" + dt.getMinutes()
      };
      updates['/pengeluaran/' + Uid + "/" + id] = data;
    }
    firebase.database().ref().update(updates);
    pengReload(iter);
    tampPeng();
    hideForm();
  });
  /*
    ini milik hutang;
    silahkan edit dibawah
    TODO
  */
  $('button[name=hut-simpan]').click(function() {
    var updates = {};
    if (ishutupdate) {
      var data = {
        id: $('input[name=hut-id]').val(),
        nominal: $('input[name=hut-nominal]').val(),
        dari: $('input[name=hut-dari]').val(),
        updated: "",
        lunas: "belum"
      };
      updates['/hutang/' + Uid + "/" + $('input[name=hut-id]').val()] = data;
      ishutupdate = false;
    } else {
      var id = firebase.database().ref().child("hutang/" + Uid).push().key;
      var data = {
        id: id,
        nominal: parseInt($('input[name=hut-nominal]').val()),
        dari: $('input[name=hut-dari]').val(),
        updated: "",
        lunas: "belum"
      };
      var updates = {};
      updates['/hutang/' + Uid + "/" + id] = data;
    }
    firebase.database().ref().update(updates);
    hutReload(iter);
    tampHut();
    hideForm();
  });
  /*
  TODO ini fungsi global
  */
  $('.lebih').click(function() {
    iter++;
    pemReload(iter, Uid);
    pengReload(iter);
    hutReload(iter);
  });
  $('.kurang').click(function() {
    if (iter !== 1) {
      iter--;
    }
    pemReload(iter, Uid);
    pengReload(iter);
    hutReload(iter);
  });

});
///fungsi-fungsi
var pemGlobalID = new Array();
var pemAllData = new Array();
var pengGlobalID = new Array();
var pengAllData = new Array();
var hutGlobalID = new Array();
var hutAllData = new Array();

/*
TODO ini punya pemasukan
*/
function pemReload(l = 1, uid = "") {
  Uid = uid;
  var url = "pemasukan" + "/" + uid;
  var fireRef = firebase.database().ref(url);
  pemAllData = [];
  var allId = new Array();
  allId = [];
  $('input').val("");
  var i = 0;
  fireRef.limitToLast(50 * l).once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      allId[i] = childKey;
      pemAllData[i] = {
        "id": childData.id,
        "nominal": childData.nominal,
        "sumber": childData.sumber,
        "tgl": childData.tgl,
        "bln": childData.bln,
        "th": childData.th,
        "jam": childData.jam,
        "updated": childData.updated
      };
      i++;
    });
  }).then(function() {
    pemGlobalID = [];
    pemGlobalID = allId;
    pemTabel();
  });
}

/*
TODO ini punya pengeluaran
*/
function pengReload(l = 1) {
  var url = "pengeluaran" + "/" + Uid;
  var fireRef = firebase.database().ref(url);
  pengAllData = [];
  var allId = new Array();
  allId = [];
  $('input').val("");
  var i = 0;
  fireRef.limitToLast(50 * l).once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      allId[i] = childKey;
      pengAllData[i] = {
        "id": childData.id,
        "nominal": childData.nominal,
        "keperluan": childData.keperluan,
        "tgl": childData.tgl,
        "bln": childData.bln,
        "th": childData.th,
        "jam": childData.jam,
        "updated": childData.updated
      };
      i++;
    });
  }).then(function() {
    pengGlobalID = [];
    pengGlobalID = allId;
    pengTable();
  });
}

/*
TODO ini punya hutang
*/
function hutReload(l = 1) {
  var url = "hutang" + "/" + Uid;
  var fireRef = firebase.database().ref(url);
  hutAllData = [];
  var allId = new Array();
  allId = [];
  $('input').val("");
  var i = 0;
  fireRef.limitToLast(50 * l).once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      allId[i] = childKey;
      hutAllData[i] = {
        "id": childData.id,
        "nominal": childData.nominal,
        "dari": childData.dari,
        "updated": childData.updated,
        "lunas": childData.lunas
      };
      i++;
    });
  }).then(function() {
    hutGlobalID = [];
    hutGlobalID = allId;
    hutTable();
  });
}

/*
TODO ini punya pemasukan
*/
function pemTabel() {
  var html;
  var no = 1;
  for (var i = pemAllData.length - 1; i >= 0; i--) {
    html += '<tr>' +
      '<td>' + no + '</td>' +
      '<td>' + pemAllData[i].nominal + '</td>' +
      '<td>' + pemAllData[i].sumber + '</td>' +
      '<td>' + pemAllData[i].tgl + "-" + pemAllData[i].bln + "-" + pemAllData[i].th + " " + pemAllData[i].jam + '</td>' +
      '<td>' + pemAllData[i].updated + '</td>' +
      '<td>' +
      '<div class="button-group">' +
      '<a  class="waves-effect waves-light btn"' +
      'onclick="pemPerbarui(' + i + ')" >' +
      '<i class="large material-icons">edit</i>' +
      '</a>' +
      '<a  class="waves-effect red darken-2 btn"  ' +
      ' onclick="pemHapus(' + i + ')">' +
      '<i class="large material-icons">delete</i>' +
      '</a>' +
      '</div>' +
      '</td>' +
      '</tr>';
    no++;
  }
  $('#pem-isi').html(html);
}

/*
TODO ini punya pengeluaran
*/
function pengTable() {
  var html;
  var no = 1;
  for (var i = pengAllData.length - 1; i >= 0; i--) {
    html += '<tr>' +
      '<td>' + no + '</td>' +
      '<td>' + pengAllData[i].nominal + '</td>' +
      '<td>' + pengAllData[i].keperluan + '</td>' +
      '<td>' + pengAllData[i].tgl + "-" + pengAllData[i].bln + "-" + pengAllData[i].th + " " + pengAllData[i].jam + '</td>' +
      '<td>' + pengAllData[i].updated + '</td>' +
      '<td>' +
      '<div class="button-group">' +
      '<a  class="waves-effect waves-light btn"' +
      'onclick="pengPerbarui(' + i + ')" >' +
      '<i class="small material-icons">edit</i>' +
      '</a>' +
      '<a  class="waves-effect red darken-2 btn"  ' +
      ' onclick="pengHapus(' + i + ')">' +
      '<i class="small material-icons">delete</i>' +
      '</a>' +
      '</div>' +
      '</td>' +
      '</tr>';
    no++;
  }
  $('#peng-isi').html(html);
}

/*
TODO ini punya hutang
*/
function hutTable() {
  var html;
  var no = 1;
  for (var i = hutAllData.length - 1; i >= 0; i--) {
    html += '<tr>' +
      '<td>' + no + '</td>' +
      '<td>' + hutAllData[i].nominal + '</td>' +
      '<td>' + hutAllData[i].dari + '</td>' +
      '<td><a onclick="lunasi(' + i + ')">' + hutAllData[i].lunas + '</a></td>' +
      '<td>' + hutAllData[i].updated + '</td>' +
      '<td>' +
      '<div class="button-group">' +
      '<a  class="waves-effect waves-light btn"' +
      'onclick="hutPerbarui(' + i + ')" >' +
      '<i class="small material-icons">edit</i>' +
      '</a>' +
      '<a  class="waves-effect red darken-2 btn"  ' +
      ' onclick="hutHapus(' + i + ')">' +
      '<i class="small material-icons">delete</i>' +
      '</a>' +
      '</div>' +
      '</td>' +
      '</tr>';
    no++;
  }
  $('#hut-isi').html(html);
}

/*
TODO ini punya pemasukan
*/
function pemPerbarui(i) {
  ispemupdate = true;
  $('input[name=pem-id]').val(pemAllData[i].id);
  $('input[name=pem-nominal]').val(pemAllData[i].nominal);
  $('input[name=pem-sumber]').val(pemAllData[i].sumber);
  $('input[name=pem-tgl]').val(pemAllData[i].tgl);
  $('input[name=pem-bln]').val(pemAllData[i].bln);
  $('input[name=pem-th]').val(pemAllData[i].th);
  $('input[name=pem-jam]').val(pemAllData[i].jam);
  unHideForm();
}

/*
TODO ini punya pengeluaran
*/
function pengPerbarui(i) {
  ispengupdate = true;
  $('input[name=peng-id]').val(pengAllData[i].id);
  $('input[name=peng-nominal]').val(pengAllData[i].nominal);
  $('input[name=peng-keperluan]').val(pengAllData[i].keperluan);
  $('input[name=peng-tgl]').val(pengAllData[i].tgl);
  $('input[name=peng-bln]').val(pengAllData[i].bln);
  $('input[name=peng-th]').val(pengAllData[i].th);
  $('input[name=peng-jam]').val(pengAllData[i].jam);
  unHideForm();
}

/*
TODO ini punya hutang
*/
function hutPerbarui(i) {
  ishutupdate = true;
  $('input[name=hut-id]').val(hutAllData[i].id);
  $('input[name=hut-nominal]').val(hutAllData[i].nominal);
  $('input[name=hut-dari]').val(hutAllData[i].dari);
  unHideForm();
}

/*
TODO ini punya pemasukan
*/
function pemHapus(i) {
  var hapus = confirm("hapus?");
  if (hapus) {
    firebase.database().ref().child("/pemasukan/" + Uid + "/" + pemGlobalID[i]).remove();
    pemReload(1, Uid);
  }
  if ((i == 0 || i == null) && pemGlobalID.length == 1) {
    window.location.reload();
  }
}

/*
TODO ini punya pengeluaran
*/
function pengHapus(i) {
  var hapus = confirm("hapus?");
  if (hapus) {
    firebase.database().ref().child("/pengeluaran/" + Uid + "/" + pengGlobalID[i]).remove();
    pengReload();
  }
  if ((i == 0 || i == null) && pengGlobalID.length == 1) {
    window.location.reload();
  }
}

/*
TODO ini punya hutang
*/
function hutHapus(i) {
  var hapus = confirm("hapus?");
  if (hapus) {
    firebase.database().ref().child("/hutang/" + Uid + "/" + hutGlobalID[i]).remove();
    hutReload();
  }
  if ((i == 0 || i == null) && hutGlobalID.length == 1) {
    window.location.reload();
  }
}

/*
TODO ini punya pemasukan
*/
function tampPem() {
  var starCountRef = firebase.database().ref('pemasukan/' + Uid);
  var bulan = new Date();
  var pemasukan = 0;
  starCountRef.once('value', function(snapshot) {
    snapshot.forEach(function(isi) {
      var key = isi.key;
      var val = isi.val();
      pemasukan = pemasukan + parseInt(val.nominal);
      if (val.bln !== bulan.getMonth()) {
        return;
      }
    });
    $('span.pemasukan').text("Pemasukan kamu Rp." + pemasukan);
  });
}

/*
TODO ini punya pengeluaran
*/
function tampPeng() {
  var starCountRef = firebase.database().ref('pengeluaran/' + Uid);
  var bulan = new Date();
  var pengeluaran = 0;
  starCountRef.once('value', function(snapshot) {
    snapshot.forEach(function(isi) {
      var key = isi.key;
      var val = isi.val();
      pengeluaran = pengeluaran + parseInt(val.nominal);
      if (val.bln !== bulan.getMonth()) {
        return;
      }
    });
    $('span.pengeluaran').text("Pengeluaran kamu Rp." + pengeluaran);
  });
}

/*
TODO ini punya hutang
*/
function tampHut() {
  var starCountRef = firebase.database().ref('hutang/' + Uid);
  var bulan = new Date();
  var pengeluaran = 0;
  starCountRef.once('value', function(snapshot) {
    snapshot.forEach(function(isi) {
      var key = isi.key;
      var val = isi.val();
      pengeluaran = pengeluaran + parseInt(val.nominal);
    });
    $('span.hutang').text("Hutang kamu Rp." + pengeluaran);
  });
}

function lunasi(i) {
  if (hutAllData[i].lunas == "belum") {
    var data = {
      id: hutAllData[i].id,
      nominal: hutAllData[i].nominal,
      dari: hutAllData[i].dari,
      updated: date,
      lunas: "lunas"
    };
    var updates = {};
    updates['/hutang/' + Uid + "/" + hutAllData[i].id] = data;
    firebase.database().ref().update(updates);
    hutReload(iter);
    tampHut();
  } else {
    console.log("lunas");
  }
}