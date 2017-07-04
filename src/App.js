import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsApi from './utils/ContactsApi'
import AddContact from './AddContact'
import { Route } from 'react-router-dom'
class App extends Component {

  state = {
    contacts: [
    ]
  }

  onNavigate = () => {
    this.setState({ screen: 'add' })
  }

  componentDidMount() {
    ContactsApi.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  removeContact = (contact) => {
    console.log(this)
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
    ContactsApi.remove(contact)
  }

  render() {
    return (
      <div >
        <Route exact path="/" render={() => (
          <ListContacts contacts={this.state.contacts} onDeleteContact={this.removeContact} onNavigate={this.onNavigate} > </ListContacts>
        )}> </Route>
      
       <Route  path="/create" component={AddContact} />

      </div>
    )
}
}

export default App;
