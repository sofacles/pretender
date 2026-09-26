import {useSelector} from "react-redux";
import { LEFT } from "./Constants"
const Ship = ({ x, y }) => {

  const ship = useSelector((state) => state.ship);
  return (
    
    <svg
      version="1.2"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 117 57" fill="transparent"
      x={x}
      y={y}
      transform={ship.direction === LEFT ? `translate(${ship.offsetX},${ship.offsetY}) scale(-1, 1) translate(-${ship.offsetX},-${ship.offsetY})` : ``}
      width="48"
      height="20">
      <g id="shipFlyingRight">
        <path id="Path 0" className="s0" d="m0 57v-57h33l-12 3 1 4 10 2 9-9h76v56l-8-1-2 2z" />
        <path id="Path 19" className="s3" d="m67 38l1-1h3l1 1v4h-5v-1-2z" />
        <path id="Path 21" className="s8" d="m60 38l1-1h6v1 1 2 1h-1-9-1l1-2 4 1z" />
         {ship.isThrusting && <path id="Path 25" className="s8" d="m13 42v-5h4v2l1 2v1z" />}
        <path id="Path 29" className="s7" d="m78 37v-1h24v1z" />
        <path id="Path 35" className="s8" d="m72 36l27-1-4-2h1 7 2v2l-1 1h-2-24z" />
        <path id="Path 37" className="s8" d="m35 36v-3h4v3h-3z" />
       <path id="Path 38" className="s14" d="m-1 30l-1-2v-1h1 4l1 2v1z" />
        <path id="Path 39" className="s3" d="m105 33v-1h5v5h-5v-1-1z" />
        <path id="Path 40" className="s6" d="m103 33v-1h2v1z" />
         {ship.isThrusting && <path id="Path 45" className="s11" d="m18 38l1-6h4l1 1v1l-1 8h-4l-1-1v-2z" />}
        <path id="Path 54" className="s6" d="m83 32v-1h1 4l6 1h1 1v1h-1-2-2z" />
        <path id="Path 62" className="s12" d="m40 29l10-1 1 5 9 1-3 4-2 4h-6-1-4-1-1l-2-10v-1-1z" />
        <path id="Path 63" className="s9" d="m48 41h1v1h-1zm-5 0h1v1h-1zm-3-11h1v1h-1z" />
         {ship.isThrusting && <path id="Path 64" className="s9" d="m18 31h-5v-3h1l4 1z" />}
        <path id="Path 65" className="s5" d="m12 37v-9h1v3h5 1v1l-1 5h-1-4z" />
        <path id="Path 66" className="s13" d="m84 28l4-1v4h-4v-2z" />
        <path id="Path 67" className="s8" d="m77 31l-1-3-14-1h1 7 4 2 1v1 1z" />
        <path id="Path 69" className="s11" d="m88 27v-1h1l5 2v3 1l-6-1z" />
        <path id="Path 72" className="s5" d="m77 27v-1h5l1 1v1 1 2l-1 1-4-1v-2-1z" />
        <path id="Path 76" className="s4" d="m70 27v-1h4v1z" />
        <path id="Path 77" className="s6" d="m63 27v-1h7v1z" />
        <path id="Path 79" className="s9" d="m40 27v-1h10l1 1 2 4h2 3l4 2-1 4-1 1h-3l3-4-9-1-1-5-10 1z" />
        <path id="Path 81" className="s11" d="m34 31l1-5h4l1 1v2 1 1 1h-1l-4 1-1 3v1h-1l-4-3z" />
         {ship.isThrusting && <> 
         <path id="Path 82" className="s11" d="m14 28l3-2h1v3z" />
        <path id="Path 93" className="s8" d="m61 24l-3-2h3z" />
        </>}
        <path id="Path 94" className="s6" d="m34 26v-4h1v4z" />
        <path id="Path 95" className="s11" d="m34 26l-5-2 5-2z" />
        <path id="Path 98" className="s6" d="m58 22v-1h3v1z" />
         {ship.isThrusting && <path id="Path 100" className="s11" d="m18 25l1-4h4v5h-5z" />}
        <path id="Path 104" className="s10" d="m34 31l-1-4-5-1v-4l5-2h1v2l-5 2 5 2h1z" />
        {ship.isThrusting && <path id="Path 118" className="s13" d="m13 17l10-1v2 3h-4l-1 4h-1l-1 1h-1l-2-1v-1z" /> }  
        <path id="Path 128" className="s7" d="m40 15v-3h1v4l1-3 7 2 1-2 1 2v1l5 5h1 1v1l3 2v1l-2 1h2 1v1l14 1 1 3h1l4 1h1l8 1h2 2l4 2-27 1-5 1h-6l1-4-4-2h3l-1-2-8 1-1-3-1-1-14-1v-6l4-3z" />
        <path id="Path 129" className="s8" d="m53 31l-2-4 1 3 8-1 1 2h-3-3z" />
        <path id="Path 134" className="s8" d="m41 12v-1h1 6 1l1 1v1l-1 2-7-2-1 3z" />
        <path id="Path 144" className="s1" d="m41 0l-9 9-10-2-1-4 12-3z" />
        <path id="Path 145" className="s1" d="m109 55l8 1v1h-10z" />
      </g>
    </svg>
    

  );
};

export default Ship;