import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsApi from './utils/ContactsApi'
import AddContact from './AddContact'

class App extends Component {

  state = {
    contacts: [
    ],
    screen : 'list'
  }

  onNavigate=()=>{
    this.setState({screen:'add'})
  }

  componentDidMount(){
    ContactsApi.getAll().then((contacts)=>{
      this.setState({contacts})
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
       { this.state.screen === 'list' &&
      <ListContacts contacts={this.state.contacts} onDeleteContact={this.removeContact}   onNavigate={this.onNavigate} > </ListContacts> }
      { this.state.screen === 'add' &&
      <AddContact> </AddContact>}

      </div>
    )
  }
}

export default App;
