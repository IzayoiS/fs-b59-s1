// console.log("start");

// function getData() {
//   data = "Data get fetched";
//   console.log(data);
// }

// function fetchedData() {
//   setTimeout(getData, 2000);
// }

// fetchedData();

// callback problem

function proses1() {
  console.log("proses pertama");
}
function proses2() {
  console.log("proses kedua");
}
function proses3() {
  console.log("proses ketiga");
}

setTimeout(() => {
  proses1();
  setTimeout(() => {
    proses2();
    setTimeout(() => {
      proses3();
    });
  }, 2000);
}, 5000);
