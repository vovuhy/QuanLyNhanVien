function NhanVien(
    _taiKhoan,
    _tenNV,
    _email,
    _matKhau,
    _ngayLam,
    _luongCoBan,
    _chucVu,
    _gioLamTrongThang
) {
    this.taiKhoan = _taiKhoan;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLamTrongThang = _gioLamTrongThang;
    this.tongLuong = 0
    this.loaiNhanVien=""

    this.tinhTongLuong=function(){
        switch(this.chucVu){
            case 'Sếp':
                this.tongLuong=this.luongCoBan*3
                break
            case 'Trưởng phòng':
                this.tongLuong=this.luongCoBan*2
                break
            default:
                this.tongLuong=this.luongCoBan
                
        }
    };
    this.tinhXepLoai=function(){
        if(this.gioLamTrongThang>=192){
            this.loaiNhanVien='nhân viên xuất sắc'
        }else if(this.gioLamTrongThang>=176){
            this.loaiNhanVien='nhân viên giỏi'
        } else if(this.gioLamTrongThang>=160){
            this.loaiNhanVien='nhân viên khá'
        } else{
            this.loaiNhanVien='nhân viên trung bình'
        } 
    }

}
