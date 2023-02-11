import React from "react";
import {useNavigate} from "react-router-dom";

function Card(props) {
    const w = props.w
    const cardWidth = `${w}px`
    const imgWidth = `${w-50}px`
    const title = props.t
    const src = props.s
    const link = props.l
    const desc = props.d
    const nav = useNavigate()

	return (
        <div className="card" style={{width: cardWidth}}>
            <img src={src} alt="" width={imgWidth}/>
                <div className="container" onClick={()=>nav(link)}>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                </div>
        </div>
);
}

export default Card;