const storage = window.localStorage

const renderContacts = () => {
  const contacts = JSON.parse(storage.getItem('contacts'))

  let div = document.querySelector('.contact-list')

  if (contacts && contacts.length > 0) {
    div.innerHTML = ''
    contacts.forEach(contact => {
      let pos = contacts.indexOf(contact)
      let cardDiv = document.createElement('div')
      cardDiv.setAttribute('class', 'card')
      cardDiv.innerHTML = `
        <div class="ui special cards">
          <div class="card">
            <div class="image">
              <img width= 250px; src="https://ca-address-book.herokuapp.com/images/pine.jpg" />
            </div>
            <button class="delete-contact" button id="remove-btn-${pos}">Delete Contact ${ contact.name }</button>
            <div class="content">
              <h1>${ contact.name }</h1>
              <h2>${ contact.company }</h2>
              <p>${ contact.notes }</p> 
              ${ contact.email } | 
              <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a>
            </div>
          </div>
        </div>
     `
      div.appendChild(cardDiv)
    })

  } else { 
    div.innerHTML = '<p>You have no contacts in your address book</p>' 
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderContacts();
  const addContactForm = document.querySelector('.new-contact-form')
  const deleteContact = document.querySelector('.contact-list')

  
  deleteContact.addEventListener('click', event => {
    const storage = window.localStorage
    const clickedButton = event.target.id
    const contactNumber = clickedButton.replace('remove-btn-', '')
    const deleteUser = JSON.parse(storage.getItem('contacts'))
    if (confirm("Are you sure!")) {
      deleteUser.splice(contactNumber, 1)
      storage.setItem('contacts',JSON.stringify(deleteUser))
      window.location.reload()
    } else {
      return false
    }
  })

  addContactForm.addEventListener('submit', event => {
    event.preventDefault()
   
    
    const {
      name,
      email,
      phone,
      company,
      notes,
      twitter,
    } = addContactForm.elements

  
    const contact = {
      id: Date.now(),
      name: name.value,
      email: email.value,
      phone: phone.value,
      company: company.value,
      notes: notes.value,
      twitter: twitter.value,
    }

    console.log(contact)
    let contacts = JSON.parse(storage.getItem('contacts')) || []
    contacts.push(contact)
    storage.setItem('contacts', JSON.stringify(contacts))
    document.getElementsByClassName('contact-form')
    renderContacts()
    location.reload()  
  })  
})
