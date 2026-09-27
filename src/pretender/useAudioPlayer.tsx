import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import shootingSound from '../assets/sounds/pow.mp3';


const useAudioPlayer = () => {
    const audioRef = useRef(new Audio(shootingSound));
    const ship = useSelector((state: RootState) => state.ship);
    useEffect(() => {
        if (ship.isShooting) {
            audioRef.current = new Audio(shootingSound);
            audioRef.current.play();
        }
    }, [ship.isShooting]);
};

export default useAudioPlayer;