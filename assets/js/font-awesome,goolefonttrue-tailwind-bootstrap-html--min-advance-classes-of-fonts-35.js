import { getArr } from './font-awesome,goolefonttrue-tailwind-bootstrap-html--min-advance-classes-of-fonts-31.js';
import { server } from './font-awesome,goolefonttrue-tailwind-bootstrap-html--min-advance-classes-of-fonts-27.js';

/**
 * validation
 */

const validation = () => {
  let getCouponCode = Number(document.getElementById('mainCode').value);
  let getSecretCode = Number(document.getElementById('secret').value);

  /**
   *  if the the number are'nt 10 digit
   */
  if (String(getCouponCode).length !== 10) {
    console.log('10 digit');
    return false;
  }

  /**
   *   if the first num is not num >= 2 && num <= 5
   *
   */
  let firstNum = Number(getCouponCode.toString()[0]);
  if (firstNum >= 2 && firstNum <= 5) {
  } else {
    console.log('2-5');
    return false;
  }

  /**
   * last 2 digit of 10 digit
   *      61 - 69
   * String(num).slice(-2)
   */
  let last2digit = Number(String(getCouponCode).slice(-2));
  if (last2digit >= 61 && last2digit <= 69) {
  } else {
    console.log('61-69');
    return false;
  }

  /**
   * check the number iod divser 1227
   * String(num).slice(1, 8)
   */
  let code2To8 = Number(String(getCouponCode).slice(1, 8));
  if (code2To8 % 1227 != 0) {
    console.log('false');
    return false;
  }

  /**
   * check main code to Secret // sqrt
   */

  let sqrt = Math.floor(Math.sqrt(getCouponCode) + 3);
  if (sqrt !== getSecretCode) {
    alert('secret code not match');
    return false;
  }

  // at last return True 😊
  return true;
};

/**
 *
 *
 * check the agent code if paid work alse not
 *
 *
 */

const isAgentPaid = () => {
  let agentCode = document.getElementById('agentCode').value;
  let agentArr = getArr;
  let isTrue = false;
  agentArr.forEach((x) => {
    if (x.code == agentCode) {
      isTrue = true;
    }
  });
  return isTrue;
};
/**
 *
 *
 *
 * Two pass key check
 * and pass key will be min 6 digit
 *
 *
 *
 */

const passCheck = () => {
  let pass1 = document.getElementById('pass1').value;
  let pass2 = document.getElementById('pass2').value;

  let isTrue = false;

  pass1.toString().length < 6
    ? alert('Password be 6 digit')
    : pass1 == pass2
    ? (isTrue = true)
    : alert('Retype The Same Password');

  return isTrue;
};

/**
 *
 *
 *
 * user name
 *
 *
 */

const userNameFunc = () => {
  let name = document.getElementById('userName');
  let isTrue = false;
  if (name.value.length != 0) {
    isTrue = true;
  } else {
    alert('Please Enter Your User Name');
  }

  return isTrue;
};

/**
 *
 *
 *
 * calls functions
 *
 *
 *
 */

const reg = () => {
  if (validation()) {
    if (isAgentPaid()) {
      if (passCheck()) {
        if (userNameFunc()) {
          // check that is registerd with api
          // server()
          let getCouponCode = Number(document.getElementById('mainCode').value);
          let pass = Number(document.getElementById('pass1').value);
          let userName = document.getElementById('userName').value;
          console.log(getCouponCode, pass, userName);
          server(getCouponCode, pass, userName);
        }
      }
    } else {
      alert('The Coupon Distributor Till Not Register');
    }
  } else {
    alert('Please Enter A Valid Code');
  }
};

document.getElementById('btn').addEventListener('click', () => reg());
