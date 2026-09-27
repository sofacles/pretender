import { useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import mySound from '../assets/sounds/pow.mp3';


const AudioPlayer = () => {
    const audioRef = useRef(new Audio(mySound));
    const ship = useSelector((state: RootState) => state.ship);
    useEffect(() => {
        if (!ship.isShooting) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        } else {
            audioRef.current.play();
        }
    }, [ship.isShooting]);

    return (
        <div>
            {/* Hidden or visible audio tag linked via ref */}

        </div>
    );
}

export default AudioPlayer;