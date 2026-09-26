import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isShooting = useSelector((state: RootState) => state.ship.isShooting);

    useEffect(() => {
        if (audioRef.current) {
            if (isShooting) {
                audioRef.current.pause();
                audioRef.current.src = "/sounds/pow.mp3";
                // Reset audio to start if it's already playing
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch((error) => {
                    console.log("Playback blocked or failed:", error);
                });
            } else {
                //audioRef.current.pause();
            }
        }
    }, [isShooting]); // This effect runs whenever isShooting changes

    return (
        <div>
            {/* Hidden or visible audio tag linked via ref */}
            <audio
                ref={audioRef}
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
        </div>
    );
}

export default AudioPlayer;