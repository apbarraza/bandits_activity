import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Context } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import jackpotWin from '../assets/jackpots-win.png'
import jackpotLose from '../assets/jackpots-lose.png'
import jackpot from '../assets/jackpots.png'

const RestartButton = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const ResultsWrapper = styled.div`
  font-size: 14px;
`

const Result = styled.div`
  font-weight: bold;
  color: #C57633;
`

const SlotMachinesWrapper = styled.div`
  ${(props) => {return !props.isEnabled? `
    opacity: 0.5;
    pointer-events: none;
  `: ''}}
`

const PlayGround = () => {
  const [{
    isFinished,
    trialsLeft,
    winProbabilityVector
  }] = useContext(Context);

  return (<div>
    <Header/>
    <SlotMachinesWrapper isEnabled={!isFinished} className='d-flex align-items-center justify-content-center mt-5'>
      {winProbabilityVector.map((winProbability, index) => (<div key={index}>
        <SlotMachine index={index} isEnabled={trialsLeft > 0} winProbability={winProbability}/>
      </div>))}
    </SlotMachinesWrapper>
    {trialsLeft === 0 && <div>
      
    </div>}
  </div>)
} 

const Header = () => {
  const [{
    trialsLeft,
    totalCoins,
  }, {
    restartGame
  }] = useContext(Context);

  return (
    <div className='d-flex justify-content-between'>
      <RestartButton className='ml-3 mt-3' onClick={() => restartGame()}>
        <FontAwesomeIcon className='mr-1' icon={faChevronLeft} /> Select Level
      </RestartButton>
      <ResultsWrapper className='d-flex mt-3 mr-3'>
        <div className='mr-1'> Trials left: </div>
        <Result className='font-weight-bold'>{trialsLeft}</Result>
        <div className='ml-3 mr-1'> Total Coins: </div>
        <Result className='font-weight-bold'>{totalCoins}</Result>
      </ResultsWrapper>
    </div>)
}

const MachineWrapper = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :hover {
    cursor: pointer;
    opacity: 0.9;
  }
  ${(props) => {return props.isFinished? `
    opacity: ${props.winProbability};
  `: ''}}
  ${(props) => {return !props.isClickable? `
    pointer-events: none;
  `:''}}
  /* img{
    filter: grayscale(100%) 
  } */
`

var sleep = n => new Promise(resolve => setTimeout(resolve, n))

const SlotMachine = ({ index, winProbability }) => {
  const [{
    isFinished,
    trialsLeft
  }, {
    onMachineOutput,
    selectBestMachine,
  }] = useContext(Context);

  const [selectedImage, setSelectedImage] = useState(jackpot);
  
  const onMachineClick = async () => {
    if(trialsLeft > 0){
      const result = Math.random()
      let didWin = false
      if(result < winProbability)
        didWin = true
      if(didWin){
        setSelectedImage(jackpotWin)
      }
      else{
        setSelectedImage(jackpotLose)
      }
      onMachineOutput(didWin)
      await sleep(1000)
      setSelectedImage(jackpot)
    }
    else{
      selectBestMachine(index)
    }
  }

  return (<MachineWrapper 
    isFinished={isFinished}
    winProbability={winProbability}
    isClickable={selectedImage === jackpot} 
    onClick={onMachineClick}>
      {isFinished && <div> isFinished </div>}
    <img draggable={false} width="120px" src={selectedImage} alt=''/>
  </MachineWrapper>)
}

export default PlayGround