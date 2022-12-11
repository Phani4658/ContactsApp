import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import ContactItem from './components/ContactItem'

import './App.css'

const stringifiedContactsList = localStorage.getItem('contactsList')
const parsedContactsList = JSON.parse(stringifiedContactsList)
const initialContactList = parsedContactsList === null ? [] : parsedContactsList

class App extends Component {
  state = {
    contactsList: initialContactList,
    name: '',
    mobileNo: '',
  }

  onAddContact = event => {
    event.preventDefault()
    const {name, mobileNo} = this.state
    if (name === '' && mobileNo.length !== 10) {
      alert('Enter Valid Name and Mobile Number') // eslint-disable-line no-alert
    } else if (mobileNo.length !== 10) {
      alert('Enter Valid Mobile Number') // eslint-disable-line no-alert
    } else if (name === '') {
      alert('Enter valid Name') // eslint-disable-line no-alert
    } else {
      const newContact = {
        id: uuidv4(),
        name,
        mobileNo,
        isFavorite: false,
      }
      this.setState(prevState => {
        localStorage.setItem(
          'contactsList',
          JSON.stringify([...prevState.contactsList, newContact]),
        )
        return {
          contactsList: [...prevState.contactsList, newContact],
          name: '',
          mobileNo: '',
        }
      })
    }
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      contactsList: prevState.contactsList.map(eachContact => {
        if (eachContact.id === id) {
          return {...eachContact, isFavorite: !eachContact.isFavorite}
        }
        return eachContact
      }),
    }))
  }

  onChangeMobileNo = event => {
    this.setState({mobileNo: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  deleteContact = id => {
    const {contactsList} = this.state
    const updatedContactsList = contactsList.filter(
      contact => contact.id !== id,
    )
    localStorage.setItem('contactsList', JSON.stringify(updatedContactsList))
    this.setState({contactsList: updatedContactsList})
  }

  render() {
    const {name, mobileNo, contactsList} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Contacts</h1>
          <form className="contact-form-container" onSubmit={this.onAddContact}>
            <input
              value={name}
              onChange={this.onChangeName}
              className="input"
              placeholder="Name"
            />
            <input
              className="input"
              value={mobileNo}
              onChange={this.onChangeMobileNo}
              placeholder="Mobile Number"
            />
            <button type="submit" className="button">
              Add Contact
            </button>
          </form>
          <ul className="contacts-table">
            <li className="table-header">
              <p className="table-header-cell name-column">Name</p>
              <hr className="separator" />
              <p className="table-header-cell">Mobile Number</p>
            </li>
            {contactsList.map(eachContact => (
              <ContactItem
                key={eachContact.id}
                contactDetails={eachContact}
                toggleIsFavorite={this.toggleIsFavorite}
                deleteContact={this.deleteContact}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
