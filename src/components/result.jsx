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
		<div key={Math.random()} className={'result'}>
			{entry.Image && <><img src={entry.Image} width={'200px'}/><br/></>}
			<a className={'result-link'} target={"_blank"} href={String(entry.URL)}>{entry.Title}</a>
			{level? <p className={'level'}>{level}</p> : <></>}
			<a href={entry.Page_URL}>Source: {entry.Page_title}</a>
			{entry.Description && <p>{entry.Description}</p>}
		</div>
	);
}

export default Result;