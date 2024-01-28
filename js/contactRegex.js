const nameRegex = /^[a-zA-Z]+(\s?[a-zA-Z]+)*$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^\+?\d{10,12}$/;
const ageRegex = /^([1-9]{1,2}|0?[1-9])$/;
//Minimum eight characters (including special characters), at least one letter and one number
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

export class ContactRegex {
  static isPassedArr = [false, false, false, false, false, false];

  constructor() {}

  static setupRegex() {
    $(".contact-us input").on("keyup", (e) => {
      let target = $(e.target);
      let isPassed = this.isRegexPassed(target);
      if (isPassed) {
        target.next(".alert").css("display", "none");
      } else {
        target.next(".alert").css("display", "block");
      }

      //if the input chosen is the password input then also check the repassword input
      if (target.attr("id") == "passwordInput") {
        let repasswordElement = target.parent().next().children("input");
        let isRepasswordMatch = this.isRegexPassed(repasswordElement);
        if (isRepasswordMatch) {
          repasswordElement.next(".alert").css("display", "none");
        } else {
          repasswordElement.next(".alert").css("display", "block");
        }
      }

      //if isPassedArr is completely true then enable submit btn else disable it
      if (this.isPassedArr.includes(false)) {
        $(".contact-us button").attr("disabled", true);
      } else {
        $(".contact-us button").removeAttr("disabled");
      }
    });
  }

  static isRegexPassed(target) {
    let val = target.val();
    let isPassed;
    switch (target.attr("id")) {
      case "nameInput":
        //check if value passes regex
        isPassed = nameRegex.test(val);
        //add isPassed value to the isPassedArr
        this.isPassedArr[0] = isPassed;
        return isPassed;
      case "emailInput":
        isPassed = emailRegex.test(val);
        this.isPassedArr[1] = isPassed;
        return isPassed;
      case "phoneInput":
        isPassed = phoneRegex.test(val);
        this.isPassedArr[2] = isPassed;
        return isPassed;
      case "numberInput":
        isPassed = ageRegex.test(val);
        this.isPassedArr[3] = isPassed;
        return isPassed;
      case "passwordInput":
        isPassed = passRegex.test(val);
        this.isPassedArr[4] = isPassed;
        return isPassed;
      default:
        //default case is repassword
        let passVal = target.parent().prev().children("input").val();
        if (val == passVal) {
          this.isPassedArr[5] = true;
          return true;
        }
        this.isPassedArr[5] = false;
        return false;
    }
  }
}
