var dsnv = new DSNV();
var validation = new Validation();


function setLocalStorage() {
    //convert Json => String
    var dataString = JSON.stringify(dsnv.arr);
    //set localStorage
    localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
    //check condition
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        //convert String => Json
        dsnv.arr = JSON.parse(dataString);
        //render table
        renderTable(dsnv.arr);
    }
}

function getEle(id) {
    return document.getElementById(id);
}

function renderTable(data) {
    var content = "";

    for (var i = 0; i < data.length; i++) {
        var nv = data[i];
        content += `
          <tr>
              <td>${nv.taiKhoan}</td>
              <td>${nv.tenNV}</td>
              <td>${nv.email}</td>
              <td>${nv.ngayLam}</td>
              <td>${nv.chucVu}</td>
              <td>${nv.tongLuong}</td>
              td>${nv.loaiNhanVien}</td>
              <td>
                  <button class="btn btn-info" onclick="editSV('${nv.taiKhoan}')">Edit</button>
                  <button class="btn btn-danger" onclick="deleteSV('${nv.taiKhoan}')">Delete</button>
              </td>
          </tr>
      `;
    }
    getEle("tbodySinhVien").innerHTML = content;
}

function layThongTinNV(isAdd) {
    var _taiKhoan = getEle("tknv").value;
    var _tenNV = getEle("name").value;
    var _email = getEle("email").value;
    var _matKhau = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _luongCoBan = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLamTrongThang = getEle("gioLam").value;

    var isValid = true;

    if (isAdd) {
        isValid &=
            validation.kiemTraRong(_taiKhoan, "tbTKNV", "(*) Vui lòng nhập tài khoản") &&
            validation.kiemTraDoDaiKiTu(
                _taiKhoan,
                "tbTKNV",
                "(*) Vui long nhap 4 - 10 ki tu",
                4,
                10
            ) &&
            validation.kiemTraMaSVTonTai(
                _taiKhoan,
                "tbTKNV",
                "(*) Tài khoản đã tồn tại!",
                dsnv.arr
            );
    }

    isValid &=
        validation.kiemTraRong(_tenNV, "tbTen", "(*) Vui lòng nhập") &&
        validation.kiemTraPattern(
            _tenNV,
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
            "tbTen",
            "(*) Vui long nhap Ten hop le!"
        );
}