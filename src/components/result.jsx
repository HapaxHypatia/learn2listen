import React from "react";

function Result(r) {
	const entry = r.r


	const level = entry.Level
	return (
		<div key={Math.random()} className={'result-item'}>
			<div className={'result-container'} >
				<a className={'result-title'} target={"_blank"} href={String(entry.link)}>{entry.title}</a>
				{level? <span className={'level'}>{level}</span> : <></>}
				{entry.image? <img className={'result-image'} alt={""} src={entry.image} width={'200px'}/> : <></>}
				{entry.description? <p>{entry.description.slice(0,750)}...</p>: <></>}
			</div>
			<p><a href={entry.Page_URL}>Go to website: {entry.Page_title}</a></p>
		</div>
	);
}

export default Result;