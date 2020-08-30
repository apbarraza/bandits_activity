import { useState } from 'react'
import { LEVELS } from './config'

const { EASY, MEDIUM, HARD } = LEVELS 

export const useStore = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [level, setLevel] = useState(EASY)
  const [results, setResults] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [bestArm, setBestArm] = useState([]);

  // [state, actions]
  return [{
    level,
    isPlaying
  },
  {
    setIsPlaying,
    setLevel
  }];
};
