import React from "react";
import default_img from '../img/default.png';

function Result(r) {
	const entry = r.r
	const level = entry.Level
	return (
		<div key={Math.random()} className={'result-item'}>
			<div className={'result-container'} >
				<a className={'result-title'} target={"_blank"} href={String(entry.link)}>{entry.title}</a>
				{entry.image?
					<img className={'result-image'} alt={""} src={entry.image} width={'200px'}/> :
					<img className={'result-image'} alt={""} src={default_img} width={'200px'}/>}
				{entry.description? <p>{entry.description.slice(0,750)}...</p>: <></>}
				{level? <span className={'level'}>{level}</span> : <></>}
				{entry.channel? <p>Source {entry.channel} </p>: <></>}
			</div>

		</div>
	);
}

export default Result;