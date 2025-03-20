import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState('');

  // 무거운 연산 수행하는 함수 정의 및 호출
  function heavyCalc() {
    let sum = 0;
    for (let i = 0; i < 100000; i ++) {
      sum +=i;
    }
    return sum;
  }

  const calc = useMemo(() => {
    retrun heavyCalc();
  }, [])
  
  let calc = heavyCalc();
  console.log(calc)
  // number 값을 바꾸는 함수
  const increaseNum = () => {
    setNumber((prev) => prev +1)
  };

  const decreaseNum = () => {
    setNumber((prev) => prev -1)
  }

  // text 값을 바꿔주는 함수
  const handleText = (e) => {
    setText(e.target.value)
  };




  return (
    <br>
      <h4>반복적이고 무거운 연산 값</h4>
      <p>{calc}</p>

      <br />
      <br />
      <h4>숫자 바꾸기</h4>
      <button onClick={increaseNum}>+</button>
      <button onClick={decreaseNum}>-</button>
      <br />
      <br />
      <h4>문자 바꾸기</h4>
      <input type="text" onChange={handleText} />
      <br/>
      <br/>
      <ShowState text={text} number = {number} />
  )
}

export default App
