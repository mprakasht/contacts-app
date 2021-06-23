
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import AppBar from './AppBar';
import ContactList from './Contacts';
import ContactDetails from './ContactDetails';

const HomePage = () => {
	return (
		<div style={{ overflow: 'auto' }}>
			<CssBaseline />
			<AppBar />
			<div style={{ margin: 32, marginTop: 100 }}>
				<BrowserRouter>
					<Switch>
						<Route exact path='/' component={ContactList} />
						<Route path='/view/:contactId' component={ContactDetails} />
					</Switch>
				</BrowserRouter>
			</div>
		</div>
	)
}

export default HomePage
