import erfc from "math-erfc";

function showFile(input) { //функція, що відповідає за завантаження файлу, зчитування та внесення його в масив
  let file = input.target.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    calculateResult(reader.result.split("\n").filter((i) => i.length !== 0)); // розділення пострічково та перевірка на пустоту
  };
}


function calculateResult(arrayOfRows) {
  var result = "";
  arrayOfRows.forEach((row) => {
    //eslint-disable-next-line eqeqeq
    let rowFinal = row.split("").filter(i => i != "\r"); // розділяємо поелементно
    let sqrtOfN = Math.sqrt(rowFinal.length); //знаходимо корінь  кількості елементів рядка
    let rowCalculationResult = 0; //створюємо змінну для наступної дії
    //eslint-disable-next-line eqeqeq
    rowFinal.map(i => rowCalculationResult += i == "1" ? 1 : -1); //перевіряємо масив та заміняємо 0 на -1
    let stats = Math.abs(rowCalculationResult) / sqrtOfN; //за формулою знаходимо статистику
    let res = erfc(stats / Math.sqrt(2)); //знаходимо P-значення
    result += `Row: ${row}\n 
row length: ${rowFinal.length}\n
rowCalculationResult: ${rowCalculationResult}\n
sqrtOfN: ${sqrtOfN}\n
stats: ${stats}\n
erfc result: ${res}\n
isTestPassed: ${res > 0.01 ? true : false}\n\n\n`; //виводимо результат
  });
  console.log(result);
}

function App() {
  return (
    <div className="App">
      <input type="file" onChange={(i) => showFile(i)}></input>
    </div>
  );
}

export default App;
