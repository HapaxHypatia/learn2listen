import React, {useState} from "react";
import data from "../data.json";
import Result from "../components/result";
import '../App.css'
import './audioSearch.css'

function AudioSearch() {
    const [searchTerm, setSearchTerm] = useState("")
	const [results, setResults] = useState([])
	const [paginate, setPaginate] = useState(10)
	const seenURLs = []
	const clean_data = data.filter(function(currentObject) {
		if (currentObject.URL in seenURLs) {
			return false;
		} else {
			seenURLs[currentObject.URL] = true;
			return true;
		}
})
	const seenSites = []
	const sites = clean_data.filter(function(currentObject) {
		if (currentObject.Page_title in seenSites) {
			return false;
		} else {
			seenSites[currentObject.Page_title] = true;
			return true;
		}
	})

	const load_more = () => {
	  setPaginate((prevValue) => prevValue + 8);
	};

	//TODO remove links to whole websites instead of items
	//https://www.lawlessfrench.com/products/fluentu-french-videos/
	// https://www.lawlessfrench.com/products/lawless-french-immersion/
	// https://www.lawlessfrench.com/speaking/conversational-french/


	function getLevel(item){
		const levels = {
        beginner: ['A1', 'A2', 'beginner', 'beginning', 'débutant'],
        intermediate: ['B1', 'B2', 'intermediate', 'intermédiaire'],
        advanced: ['C1', 'C2', 'advanced', 'avancé']
    	}
		for (let list of Object.keys(levels)){
			console.log(list)
			for (let term of levels[list]){
				for (let val of Object.values(item)){
					if (typeof(val)=="string"){
						if (val.includes(term)){
							return term
						}
					}

				}
			}
		}


	}

	//Search Function
	const search= (e)=> {
		e.preventDefault()
		let hits = []
		for (let item of clean_data) {
			let count = 0
			let titlewords = item.Title.split(" ")
			for (let word of titlewords) {
				if (word.toLowerCase() === searchTerm) {
					count = count + 2
				}
			}
			let descwords = item.Description.split(" ")
			for (let word of descwords) {
				if (word.toLowerCase() === searchTerm) {
					count++
				}
			}
			if (count !== 0) {
				item.count = count
				if(!item.Level){
					item.Level = getLevel(item)
				}
				hits.push(item)
			}


			hits.sort((a, b) => parseInt(b.count) - parseInt(a.count))
			setResults(hits)
		}
	}

	const updateState = (e) => {
		const val = e.target.value;
		setSearchTerm(val)
	}

	return (
	  <div className={'main'}>
		  <form id={'searchForm'} onSubmit={search}>
			  <input id='searchBox' value={searchTerm ?? ""} onChange={updateState} placeholder="Search listening resources" />
			  <button type={"submit"}>Search</button>
		  </form>
		  <div id={"resultsList"}>
			  {results.length} results found.
				{results.slice(0, paginate)
					.map((r)=><Result r={r}></Result>
					)}
		  </div>
		  {results.length<1?
			  <>
				<h2>Search {clean_data.length} French audio and video resources with one search</h2>
				{/*<div id={'sitesList'}>*/}
				{/*	{sites.map((item)=>*/}
				{/*	<span><a href={item.Page_URL}>{item.Page_title}</a></span>*/}
				{/*	)*/}
				{/*	}*/}
				{/*</div>*/}
			  </>: <></>
		  }
		  {results.length>paginate?
			  <button id={'loadMore'} onClick={load_more}>Load More...</button> :<></>
		  }
	  </div>
	);
}

export default AudioSearch;