/**
 * the func returns arr of numbers between start and end that are divisible by divisor
 * @returns It returns 10 digits numbers
 */

function getDivisibleNumbers(start, end, divisor) {
  const result = [];

  // প্রথম সংখ্যা বের করা যেটা divisor দিয়ে বিভাজ্য
  let first = Math.ceil(start / divisor) * divisor;

  for (let i = first; i <= end; i += divisor) {
    result.push(i);
  }

  return result;
}

const numbers = getDivisibleNumbers(1200000, 9000000, 1227);

console.log(numbers[0]);

/**
 * @returns get a random number between 2 and 5 (inclusive)
 */
function getRandom2to5() {
  return Math.floor(Math.random() * (5 - 2 + 1)) + 2;
}

/**
 * @returns a random number between 61 and 69 (inclusive)
 */
function getRandom61to69() {
  return Math.floor(Math.random() * (69 - 61 + 1)) + 61;
}

/**
 *
 * ganarate the code
 */

let printStart = 50; // page
let printNumber = 5; // page
let totalCoupon = printNumber * 4; // total coupon

const genarateCoupon = () => {
  let couponArr = [];

  for (
    let i = printStart * 4 - 3;
    i < printNumber * 4 + printStart * 4 - 3;
    i++
  ) {
    theCode = `${getRandom2to5()}${numbers[i]}${getRandom61to69()}`;
    couponArr.push(theCode);
  }
  return couponArr;
};

/**
 * print the code in coupons
 */
let couponSerial = 1001;
const printCoupon = () => {
  let arr = genarateCoupon();
  let container = document.getElementById('container');
  //   let getPage = document.getElementById('page');

  for (let i = 0; i < printNumber; i++) {
    let page = document.createElement('div');
    page.className = 'page';

    for (let j = i * 4; j < i * 4 + 4; j++) {
      let coupon = document.createElement('div');
      coupon.className = 'couponDiv';
      let makeInner = `
        <img class="couponImg" src="quiz coupon-01.jpg" alt="" />
        <!-- texts -->
    <p class="codePara allura firstCode">5868</p>
       <p class="codePara allura secondCode">${arr[j]}</p>
       <p class="codePara secretCode">${Math.floor(
         Math.sqrt(arr[j]) + 3
       )} ${couponSerial}</p>
        <img class="qr" src="qr.png" />
            <p class="srl">${couponSerial}</p>
 <div class="des allura">
            <p>Registration Fee : 25 Taka Only</p>
            <p>Barishal Sddokta Society</p>
            <p>Date : 03 Octobar 2025</p>
            <p></p>
          </div>
            <p class="allura heading">
            Sharodiyo Quiz <br />
            Competition
          </p>


`;
      coupon.innerHTML = makeInner;
      page.appendChild(coupon);
      couponSerial++;
    }
    container.appendChild(page);
  }
};

printCoupon();
