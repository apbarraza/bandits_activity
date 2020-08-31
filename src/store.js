import { useState, useEffect } from 'react'
import { LEVELS } from './config'

const { EASY, MEDIUM, HARD } = LEVELS 
const TOTAL_TRIALS = 3

const getProbabilityVector = (level) => {
  switch (level) {
    case EASY:
      return [0.2,0.4,0.8]
    case MEDIUM:
      return [0.1,0.2,0.8,0.4,0.3]
    case HARD:
      return [0.5,0.9,0.8,0.7,0.6]
    default:
      return []
  }
}

export const useStore = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [winProbabilityVector, setWinProbabilityVector] = useState([]) 
  const [level, setLevel] = useState(EASY)
  const [results, setResults] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [bestArm, setBestArm] = useState([]);
  const [trialsLeft, setTrialsLeft] = useState(TOTAL_TRIALS);
  const [totalCoins, setTotalCoins] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);

  useEffect(()=>{
    const probabilityVector = getProbabilityVector(level)
    setWinProbabilityVector(probabilityVector)
  },[level]);

  let maxProbability = 0
  let bestMachine = 0
  winProbabilityVector.forEach((probability, index) => {
    if (probability > maxProbability) {
      bestMachine = index
      maxProbability = probability
    }
  });

  useEffect(()=>{
    if(trialsLeft === 0){
      console.log(results)
    }
  },[trialsLeft]);

  const selectLevel = () => {
    setIsPlaying(false)
    restartGame()
  }

  const restartGame = () => {
    setRewards([])
    setBestArm([])
    setResults([])
    setTotalCoins(0)
    setTrialsLeft(TOTAL_TRIALS)
    setIsFinished(false)
    setSelectedMachine(null)
  }

  const selectBestMachine = (index) => {
    setIsFinished(true)
    setSelectedMachine(index)
  }

  const onMachineOutput = (didWin) => {
    if(didWin)
      setTotalCoins(coins => coins+1)
    setTrialsLeft(trials => trials-1)
    setResults(results => [...results, didWin])
  }

  // [state, actions]
  return [{
    trialsLeft,
    totalCoins,
    bestMachine,
    maxProbability,
    level,
    isPlaying,
    isFinished,
    winProbabilityVector,
  },
  {
    selectLevel,
    selectBestMachine,
    onMachineOutput,
    restartGame,
    setIsPlaying,
    setLevel
  }];
};
