import React, { useState } from 'react';

const Calculator = () => {
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(0)
  const [isEqual, setIsEqual] = useState(false)
  const [clearButton, setClearButton] = useState("AC")
  const [prevButton, setPrevButton] = useState("")

  const buttonArray = {
    1: [clearButton, "+/-", "%", "/"],
    2: ["7","8","9","X"],
    3: ["4","5","6","-"],
    4: ["1","2","3","+"],
    5: ["0",".","="]
  }

  const setScreenCurrent = (num) => {
    if (isEqual)  {
      setIsEqual(false)
    }
    setClearButton("C")
    current !== 0 ?
      setCurrent("" + current + num)
    :
      setCurrent(num)
  }

  const topButtonChoiceHandler = (buttonElementChoice) => {
    switch (buttonElementChoice) {
      case clearButton:
        clearAll()
        break;
      case "+/-":
        negitify()
        break;
      case "%":
        percent()
        break;
      default:
        break;
    }
  }

  const sideButtonChoiceHandler = (buttonElementChoice) => {
    if (prevButton === ""){
      setTotal(parseFloat(current))
      setCurrent(0)
      setIsEqual(true)
      setPrevButton(buttonElementChoice)  
    } else {
      previousButtonHandler()
      setPrevButton(buttonElementChoice)
    }
  }

  const previousButtonHandler = () => {
    switch (prevButton) {
      case "+":
        add()
        break;
      case "-":
        sub()
        break;
      case "X":
        multiply()
        break;
      case "/":
        divide()
        break;
      case "=":
        equal()
        break;
      default:
        break;
    }
  }

  const negitify = () => {
    if (current === 0) {
      setTotal(0-total)
    } else {
      if (current.includes("-")) {
        const [, ...newCurrent] = [...current.split("")]
        setCurrent(newCurrent.join(""))
      } else {
        setCurrent("-" + current)
      }
    }
  }

  const add = () => {
    setTotal(total + parseFloat(current))
    setCurrent(0)
    setIsEqual(true)
  }

  const sub = () => {
    setTotal(total - parseFloat(current))
    setCurrent(0)
    setIsEqual(true)
  }

  const clearAll = () => {
    if (current === 0) {
      setTotal(0)
    } else {
      setCurrent(0)
      setClearButton("AC")
    }
  }

  // ###############

  const percent = () => {
    // divide current by 100
    // multply by total
    if (current !== 0) {
      setCurrent(current/100)
    } else {
      setTotal(total/100)
    }
  }

  const divide = () => {
    // total/current
    setTotal(total / parseFloat(current))
    setCurrent(0)
    setIsEqual(true)
  }

  const multiply = () => {
    // total * current
    setTotal(total * parseFloat(current))
    setCurrent(0)
    setIsEqual(true)
  }

  const equal = () => {
    // show total
    setCurrent(0)
    setIsEqual(true)

  }

  const decimal = () => {
    console.log(current)
    // change all parseFloat to parseFloat
    // check if . exists in current
    // Add a . just like setScreenCurrent
    if (current.toString().includes(".") || current == 0 || current === "") {
      return
    } else {
      setCurrent(current + ".")
    }

  }

  // UI 

  // Fix display to go to end of all 
  // change buttons to be correct
  // change sizes to be fixed 
  // glow animation whenever the buttons are clicked
  // operators hold glow until allClear is pushed or equal is pushed

  // #################

  const Display = ({children}) => {
    return <div className="h-320px w-375px text-white d-flex justify-content-end align-items-end pr-2" style={{backgroundColor: 'black'}}><h1 className="display-1">{children}</h1></div>
  }

  const Row = ({children}) => {
    return <div className="row h-100px d-flex justify-content-around align-items-center pl-2" style={{backgroundColor: 'black'}}>{children}</div>
  }


  const Button = ({children, style, extras, clicked}) => {
    return <button onClick={clicked} style={style} className={`buttonDimensions rounded-circle border-0 ${extras}`}>{children}</button>
  }

  const GreyTopButtons = ({children, clicked}) => {
    return <Button clicked={clicked} style={{backgroundColor: "#C0C0C0"}} extras="">{children}</Button>
  }

  const OrangeSideButtons = ({children, clicked}) => {
    return <Button clicked={clicked} style={{backgroundColor: "#FFA500"}} extras="text-white">{children}</Button>
  }

  const DarkGreyMiddleButtons = ({children, clicked}) => {
    return <Button clicked={clicked} style={{backgroundColor: "#696969"}} extras="text-white">{children}</Button>
  }

  const ZeroButton = ({children, clicked}) => {
    return <Button clicked={clicked} style={{backgroundColor: "#696969"}} extras="zeroDimensions text-white zero-radius">{children}</Button>
  }

  return (
    <div>
      <Display>{isEqual ? total : current}</Display>
      {Object.keys(buttonArray).map(el=>(
        <Row>{buttonArray[el].map(buttonElement=>{
          if (["/","X","-","+","="].includes(buttonElement)) {
            return <OrangeSideButtons clicked={()=>{sideButtonChoiceHandler(buttonElement)}}>{buttonElement}</OrangeSideButtons> 
          } else if (buttonElement === ".") {
            return <DarkGreyMiddleButtons clicked={()=>{decimal()}}>{buttonElement}</DarkGreyMiddleButtons>
          } else if (buttonElement === "0") {
            return <ZeroButton clicked={()=>{setScreenCurrent(buttonElement)}}>{buttonElement}</ZeroButton>
          } else if (el === "1"){
            return <GreyTopButtons clicked={()=>{topButtonChoiceHandler(buttonElement)}}>{buttonElement}</GreyTopButtons>
          } else {
            return <DarkGreyMiddleButtons clicked={()=>{setScreenCurrent(buttonElement)}}>{buttonElement}</DarkGreyMiddleButtons>
          } 
        }
        )}
        </Row>
      ))}
    </div>
  )


    
    // <div className="container-fluid">
    //   <div className="row vh-40">
    //     <div className="col text-white d-flex justify-content-end align-items-end" style={{backgroundColor: 'black'}}>
    //       <h1 className="display-1">
    //         {isEqual ? total : current}
    //       </h1>
    //     </div>
    //   </div>

    //   <Row>
    //     onClick={()=>clearAll()}>
    //       <GreyTopButtons><h1>{total === 0 ? "AC" : "C"}</h1></GreyTopButtons>
    //    >
    //     
    //       <GreyTopButtons><h1>+/-</h1></GreyTopButtons>
    //    >
    //     
    //       <GreyTopButtons><h1>%</h1></GreyTopButtons>
    //    >
    //     
    //       <OrangeSideButtons><h1>/</h1></OrangeSideButtons>
    //    >
    //   </Row>
    //   <Row>
    //     onClick={()=>setScreenCurrent(7)}>
    //       <DarkGreyMiddleButtons><h1>7</h1></DarkGreyMiddleButtons>
    //    >
    //     onClick={()=>setScreenCurrent(8)}>
    //       <DarkGreyMiddleButtons><h1>8</h1></DarkGreyMiddleButtons>
    //    >
    //     onClick={()=>setScreenCurrent(9)}>
    //       <DarkGreyMiddleButtons><h1>9</h1></DarkGreyMiddleButtons>
    //    >
    //     
    //       <OrangeSideButtons><h1>X</h1></OrangeSideButtons>
    //    >
    //   </Row>
    //   <Row>
    //     onClick={()=>setScreenCurrent(4)}>
    //       <DarkGreyMiddleButtons><h1>4</h1></DarkGreyMiddleButtons>
    //    >
    //     onClick={()=>setScreenCurrent(5)}>
    //       <DarkGreyMiddleButtons><h1>5</h1></DarkGreyMiddleButtons>
    //    >
    //     onClick={()=>setScreenCurrent(6)}>
    //       <DarkGreyMiddleButtons><h1>6</h1></DarkGreyMiddleButtons>
    //    >
    //     
    //       <OrangeSideButtons><h1>-</h1></OrangeSideButtons>
    //    >
    //   </Row>
    //   <Row>
    //     onClick={()=>setScreenCurrent(1)}>
    //       <DarkGreyMiddleButtons><h1>1</h1></DarkGreyMiddleButtons>
    //    >
    //     onClick={()=>setScreenCurrent(2)}>
    //       <DarkGreyMiddleButtons><h1>2</h1></DarkGreyMiddleButtons>
    //    >
    //     onClick={()=>setScreenCurrent(3)}>
    //       <DarkGreyMiddleButtons><h1>3</h1></DarkGreyMiddleButtons>
    //    >
    //     onClick={add}>
    //       <OrangeSideButtons><h1>+</h1></OrangeSideButtons>
    //    >
    //   </Row>
    //   <Row>
    //     
    //       <DarkGreyMiddleButtons><h1>0</h1></DarkGreyMiddleButtons>
    //    >
    //     
    //       <DarkGreyMiddleButtons><h1>=</h1></DarkGreyMiddleButtons>
    //    >
    //     
    //       <OrangeSideButtons><h1>.</h1></OrangeSideButtons>
    //    >
    //   </Row>
    // </div>
    
}
  

export default Calculator;


// adding 1. full number
// 2. + then it will show total 

// when we have total 