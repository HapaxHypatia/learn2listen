import React from "react";
import {Link} from "react-router-dom";

function Nav() {
	return (
		<nav>
			<Link to={'/'}>Home</Link>
			<Link to={'/audiosearch'}>Audio Search</Link>
			<Link to={'/transcribe'}>Transcribe</Link>
		</nav>
	);
}

export default Nav;