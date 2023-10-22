import React, {useState} from "react";
import data from "../data.json";
import Result from "../components/result";
import '../App.css'
import './audioSearch.css'

function AudioSearch() {
	const [update, setUpdate] = useState('')
    const [searchTerm, setSearchTerm] = useState("")
	const [results, setResults] = useState([])
	const [paginate, setPaginate] = useState(10)
	const load_more = () => {
	  setPaginate((prevValue) => prevValue + 8);
	};

	fetch('https://api.github.com/repos/HapaxHypatia/Learn2Listen/commits?per_page=1')
  						.then(res => res.json())
  						.then(res => setUpdate(res[0]['commit']['author']['date']))

	function getLevel(item){
		const levels = {
        A1: ['a1'],
		A2: ['a2'],
		beginner: ['beginner', 'beginning', 'débutant', 'debutant','introductory'],
		B1: ['b1'],
		B2: ['b2'],
        intermediate: ['intermediate', 'intermédiaire', 'intermediaire'],
		C1:['c1'],
		C2: ['c2'],
        advanced: ['advanced', 'avancé']
    	}
		for (let level of Object.keys(levels)){
			for (let term of levels[level]){
				for (let val of Object.values(item)){
					if (typeof(val)=="string"){
						if (val.toLowerCase().includes(term)){
							return level
						}
					}

				}
			}
		}
	}

	function normalize(text){
		return text.toLowerCase()
			.replace(/[àâ]/g,"a")
			.replace(/[éèêë]/g, "e")
			.replace(/[îï]/g,'i')
			.replace('ô', 'o')
			.replace('œ', 'oe')
			.replace(/[ùûü]/g, 'u')
		}

	//Search Function
	const search= (e)=> {
		console.log(searchTerm)
		e.preventDefault()
		let hits = []
		for (let item of data) {
			let count = 0
			let titlewords = item.title.split(" ")
			for (let word of titlewords) {
				if (normalize(word) === searchTerm) {
					count = count + 3
				}
				if (normalize(word).includes(searchTerm)) {
					count = count + 2
				}
			}
			if(item.description){
				let descwords = item.description.split(" ")
				for (let word of descwords) {
				if (normalize(word) === searchTerm) {
					count = count + 2
				}
				if (normalize(word).includes(searchTerm)) {
					count = count + 1
				}
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
		let cleanval = normalize(val)
		setSearchTerm(cleanval)
	}

	return (
	  <div className={'main'}>
		  <form id={'searchForm'} onSubmit={search}>
			  <input id='searchBox' value={searchTerm ?? ""} onChange={updateState} placeholder="Search listening resources" />
			  <button type={"submit"}>Search</button>
		  </form>
		  {results.length<1?
			  <>
				<h2>Search thousands of French audio and video resources with one search</h2>
			  </>: <></>
		  }
		  {results.length>1?
			  <>
			  <div id={"resultsList"}>
			  {results.length} results found.
				{results.slice(0, paginate)
					.map((r)=><Result r={r}></Result>
					)}
			  </div>
			  </>: <></>
		  }

		  {results.length>paginate?
			  <button id={'loadMore'} onClick={load_more}>Load More...</button> :<></>
		  }
		  <footer>
			  <p id={'update'}>Last update {update}</p>
		  </footer>
	  </div>
	);
}

export default AudioSearch;