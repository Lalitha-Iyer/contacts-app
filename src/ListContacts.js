import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'
class ListContacts extends Component {

  state = {
    query: '',
  }
  handleChange = function (value) {
    console.log(value)
    this.setState({ query: value.trim() })

  }

  clearQuery =  function(){
    console.log(this)
    this.setState({query: ''})
  }

  render() {
    const { contacts } = this.props

    let showingContacts
    if (this.state.query !== '') {

      console.log('m here' + this.state.query)
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingContacts = this.props.contacts.filter((c) => { return match.test(c.name) })
      console.log(showingContacts)
    }
    else {
      console.log('m here2')
      showingContacts = this.props.contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={this.state.query}
            onChange={(event) => this.handleChange(event.target.value)}
          />

          <Link to="/create" className="add-contact"> Add Contact</Link>
        </div>
        {
          showingContacts.length !== contacts.length && 
            <div className='showing-contacts'>
              <span>Now showing {showingContacts.length} of {contacts.length} total</span>
              <button onClick={()=>this.clearQuery()}>Show all</button>
            </div>
          
        }

        <ol className='contact-list'>
          {
            showingContacts.map(contact => (<li key={contact.id} className='contact-list-item'>

              <div className="contact-avatar" style={{ backgroundImage: `url(${contact.avatarURL})` }}> </div>

              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button className='contact-remove' onClick={() => this.props.onDeleteContact(contact)}>
                Remove
        </button> </li>))
          }
        </ol>
      </div>
    )
  }

}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts