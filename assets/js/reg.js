/**
 * validation
 */

const validation = () => {
  let getCouponCode = Number(document.getElementById('mainCode').value);
  let getSecretCode = Number(document.getElementById('secret').value);

  /**
   * start the validatioon 5145399566
   */

  /**
   *  if the the number are'nt 10 digit
   */
  if (String(getCouponCode).length !== 10) {
    console.log('10 digit');
    alert('Please Enter A Valid Code');
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
    alert('Please Enter A Valid Code');
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
    alert('Please Enter A Valid Code');
    return false;
  }

  /**
   * check the number iod divser 1227
   * String(num).slice(1, 8)
   */
  let code2To8 = Number(String(getCouponCode).slice(1, 8));
  if (code2To8 % 1227 != 0) {
    console.log('false');
    alert('Please Enter A Valid Code');
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

const signUp = () => {
  console.log(validation());
};

document.getElementById('btn').addEventListener('click', () => signUp());
