const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  let errors = [];
  let fields = Object.entries(payload);

  // Kiểm tra các trường không được bỏ trống
  fields.forEach(([key, value]) => {
    if (value === '' || value == null) {
      errors.push({
        name: key,
        message: 'Bạn không được bỏ trống trường này.'
      });
      invalids++;
    }
  });

  // Kiểm tra các trường cụ thể
  fields.forEach(([key, value]) => {
    switch (key) {
      case 'password':
        if (value && value.length < 6) {
          errors.push({
            name: key,
            message: 'Mật khẩu phải có tối thiểu 6 kí tự.'
          });
          invalids++;
        }
        break;
      case 'phone':
        if (value && !/^\d+$/.test(value)) {
          errors.push({
            name: key,
            message: 'Số điện thoại không hợp lệ.'
          });
          invalids++;
        }
        break;
      // Thêm các trường hợp cụ thể khác nếu cần
      default:
        break;
    }
  });

  // Cập nhật trạng thái với tất cả các lỗi
  setInvalidFields(errors);

  return invalids;
};

export default validate;
