import React, { useState, useContext } from 'react';
import { useStore } from './store'
import styled from 'styled-components'
import DropdownInput from './components/utils/DropdownInput'
import PlayGround from './components/PlayGround'
import { instructions, LEVELS } from './config'

const Title = styled.div`
  font-size: 20px;
  font-weight:bold;
  color: #09508D;
`

const Wrapper = styled.div`
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  color: #5F6368;
  width: 650px;
`

const Container = styled.div`
  height:100vh;
  width:100vw;
  display: flex;
  justify-content: center;
`

const Instructions = styled.div`
  font-size: 11px;
  color: #5F6368;
`

const DropdownWrapper = styled.div`
  margin-top: 15px;
  margin-left: 15px;
  width: 180px;
`

const PlayGroundWrapper = styled.div`
  background-color: #F6F6F6;
  border: solid 1px white ;
  border-radius: 8px;
  width: 100%;
  height: 500px;
  margin-top: 20px;
`

const StartButton = styled.div`
  margin-top: 150px;
  height:40px;
  width:200px;
  font-weight: bold;
  border-radius: 4px;
  color:white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #09508D ;
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

export const Context = React.createContext();

const { EASY, MEDIUM, HARD } = LEVELS 
const TOTAL_TRIALS = 10

const App = () => {
  const store = useStore();
  const [
    { isPlaying }
  ] = store;

  return (<Context.Provider value={store}>
      <Container>
      <Wrapper>
        <Title className='d-flex align-items-center justify-content-center mb-3 mt-4'> MS Game </Title>
        <Instructions> {instructions} </Instructions>
        <PlayGroundWrapper>
          {!isPlaying && <div>
            <PresentationView/> 
            </div>}
          {isPlaying && <div> 
            <PlayGround totalTrials={TOTAL_TRIALS}/> 
          </div>}
        </PlayGroundWrapper>
      </Wrapper>
    </Container>
  </Context.Provider>)
}

const PresentationView = () => {
  const [{
    level,
  },{
    setLevel,
    setIsPlaying
  }] = useContext(Context);
  
  return (<div>
    <DropdownWrapper>
      <div className='font-weight-bold mb-1'>Select Level:</div>
      <DropdownInput
        value={level}
        menu={[EASY, MEDIUM, HARD]}
        onChange={(value) => setLevel(value)} />
    </DropdownWrapper>
    <div>
      <div className='d-flex align-items-center justify-content-center'>
        <StartButton onClick={() => { setIsPlaying(true) }}> START! </StartButton>
      </div>
    </div>
  </div>)
}

export default App;
