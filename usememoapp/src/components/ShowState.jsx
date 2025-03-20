import { useMemo } from "react";

export default function ShowState({number, text}) {
  const consoleNumber = (number) => {
    console.log('숫자가 변경되었습니다.');
    return number;
  }

  const consoleText = (text) => {
    console.log('문자가 변경되었습니다.');
    return text

  }

  const showNum = consoleNumber(number);
  const showText = consoleText(text);

  return(
    <div>
      <p>숫자 : {shwoNum}</p>
      <p>문자 : {showText}</p>
    </div>
  )

}