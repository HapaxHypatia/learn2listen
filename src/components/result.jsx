import React from "react";

function Result(r) {
	const entry = r.r

	const levels = {
        beginner: ['A1', 'A2', 'beginner', 'beginning', 'débutant'],
        intermediate: ['B1', 'B2', 'intermediate', 'intermédiaire'],
        advanced: ['C1', 'C2', 'advanced', 'avancé']
    }


	function filterIt(item, searchKey) {
		const results = Object.keys(item).filter(k=> item[k].includes(searchKey))
  		return results.length !==0
	}

	function getLevel(item){
		if (item.Level){
			return item.Level
		}
		for (var list of Object.keys(levels)){
			for (let term of levels[list]){
				if (filterIt(item, term)) {return list}
			}
		}
	}

	const level = getLevel(entry)
	return (
		<div key={Math.random()} className={'result-item'}>
			<div className={'result-container'} >
				<a className={'result-title'} target={"_blank"} href={String(entry.URL)}>{entry.Title}</a>
				{level? <span className={'level'}>{level}</span> : <></>}
				{entry.Image? <img alt={""} src={entry.Image} width={'200px'}/> : <></>}
				{entry.Description? <p>{entry.Description}</p>: <></>}
			</div>
			<p><a href={entry.Page_URL}>Go to website: {entry.Page_title}</a></p>
		</div>
	);
}

export default Result;