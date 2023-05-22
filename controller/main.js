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
getLocalStorage()

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
              <td>${nv.tongLuong.toLocaleString('vi-VN', {
                style: 'decimal',
                maximumFractionDigits: 2,
                minimumFractionDigits: 0
            })}</td>
              <td>${nv.loaiNhanVien}</td>
              <td>
                  <button class="btn btn-info" onclick="editSV('${nv.taiKhoan}')">Sửa</button>
                  <button class="btn btn-danger" onclick="deleteSV('${nv.taiKhoan}')">Xóa</button>
              </td>
          </tr>
      `;
    }
    getEle("tableDanhSach").innerHTML = content;
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
                "(*) Vui lòng nhập từ 4-6 ký tự",
                4,
                6
            ) &&
            validation.kiemTraTKNVTonTai(
                _taiKhoan,
                "tbTKNV",
                "(*) Tài khoản đã tồn tại!",
                dsnv.arr
            ) &&
            validation.kiemTraPattern(
                _taiKhoan,
                "^[A-Za-z]+$",
                "tbTen",
                "(*) Vui lòng nhập tài khoản hợp lệ!"
            );
    }

    isValid &=
        validation.kiemTraRong(_tenNV, "tbTen", "(*) Vui lòng nhập") &&
        validation.kiemTraPattern(
            _tenNV,
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
            "tbTen",
            "(*) Vui lòng nhập tên hợp lệ!"
        );

    
    isValid &=
        validation.kiemTraRong(_email, "tbEmail", "(*) Vui lòng nhập") &&
        validation.kiemTraPattern(
            _email,
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
            "tbEmail",
            "(*) Vui lòng nhập Email hợp lệ!"
        );

    isValid &=
        validation.kiemTraRong(_matKhau, "tbMatKhau", "(*) Vui lòng nhập") &&
        validation.kiemTraPattern(
            _matKhau,
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/,
            "tbMatKhau",
            "(*) Vui lòng nhập mật khẩu hợp lệ (có 6-10 ký tự ,1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)!"
        );

    isValid &=
        validation.kiemTraRong(_ngayLam, "tbNgay", "(*) Vui lòng nhập") &&
        validation.kiemTraPattern(
            _ngayLam,
            /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/,
            "tbNgay",
            "(*) Vui lòng nhập ngày đúng định dạng MM/DD/YYYY!"
        );

    isValid &=
        validation.kiemTraRong(_luongCoBan, "tbLuongCB", "(*) Vui lòng nhập") &&
        validation.kiemTraPattern(
            _luongCoBan,
            /^[0-9]+$/,
            "tbLuongCB",
            "(*) Vui lòng nhập ngày đúng định dạng số!"
        ) &&
        validation.kiemTraInputTrongKhoang(
            _luongCoBan,
            "tbLuongCB",
            'Nhận vào giá trị nằm trong khoảng từ 1 000 000 đến 20 000 000',
            1000000,
            20000000
        )

    isValid &=
        validation.kiemTraChucVu(
            _chucVu,
            'tbChucVu',
            'Vui lòng chọn chức vụ'
        )
    isValid &=
        validation.kiemTraRong(_gioLamTrongThang, "tbGiolam", "(*) Vui lòng nhập") &&
        validation.kiemTraPattern(
            _luongCoBan,
            /^[0-9]+$/,
            "tbLuongCB",
            "(*) Vui lòng nhập ngày đúng định dạng số!"
        ) &&
        validation.kiemTraInputTrongKhoang(
            _gioLamTrongThang,
            "tbGiolam",
            'Nhận vào giá trị nằm trong khoảng từ 80 đến 200',
            80,
            200
        )

    if (isValid == false) {
        return false
    }

    var nv = new NhanVien(
        _taiKhoan,
        _tenNV,
        _email,
        _matKhau,
        _ngayLam,
        _luongCoBan * 1,
        _chucVu,
        _gioLamTrongThang * 1
    )

    nv.tinhTongLuong();
    nv.tinhXepLoai()
    return nv
}


getEle('btnThemNV').addEventListener("click", function (event) {
    event.preventDefault();

    var nv = layThongTinNV(true);
    console.log(nv)
    if(nv){
        dsnv.addNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
    }
    
});
