const vrf = (data, type) => {
  return {
    result: check[type](data),
    hint: hint
  };
};

let hint = "";

const check = {
  mail: data => {
    let rule = /^[-\w\+]+(?:\.[-\w]+)*@[-a-z0-9]+(?:\.[a-z0-9]+)*(?:\.[a-z]{2,})$/i;
    let bl = rule.test(data);
    hint = bl ? "pass" : "邮件格式错误";
    return bl;
  },
  mobile: data => {
    let rule = /^(?:\+86)?(?:13\d|14[57]|15[0-35-9]|17[35-8]|18\d)\d{8}$|^(?:\+86)?170[057-9]\d{7}$/;
    let bl = rule.test(data);
    hint = bl ? "pass" : "手机号码错误";
    return bl;
  },
  idcard: data => {
    let rule = /^(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])\d{4}(?:1[89]|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}(?:\d|[xX])$/;
    let checkCode = data => {
      let multiplier = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      let idDatas = data.split("");
      let len = 17;
      let sum = 0;
      for (let i = 0; i < len; i++) {
        sum += idDatas[i] * multiplier[i];
      }
      let remainder = sum % 11;
      let checkCodeArr = [
        "1",
        "0",
        "X",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2"
      ];
      let checkCode = checkCodeArr[remainder];
      return checkCode === data[17];
    };
    let c_len = () => {
      if (data.length == 18) {
        hint = "pass";
        return true;
      } else {
        hint = "身份证长度错误";
        return false;
      }
    };
    let c_fmt = () => {
      if (rule.test(data)) {
        return true;
      } else {
        hint = "身份证格式错误";
        return false;
      }
    };
    let c_date = () => {
      let dateStr = data.substr(6, 8);
      let dateStrNew = dateStr.replace(/(\d{4})(\d{2})(\d{2})/, "$1/$2/$3");
      let dateObj = new Date(dateStrNew);
      let month = dateObj.getMonth() + 1;
      if (parseInt(dateStr.substr(4, 2)) === month) {
        return true;
      } else {
        hint = "身份证日期错误";
        return false;
      }
    };
    if (c_len() && c_fmt() && c_date()) {
      if (checkCode(data)) {
        return true;
      } else {
        hint = "身份证校验错误";
        return false;
      }
    } else {
      return false;
    }
  }
};

// console.log(vrf("aaa@bbb.com", "idcard"))

export default vrf;
