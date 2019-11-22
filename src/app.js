const storage = window.localStorage

const renderContacts = () => {
  const contacts = JSON.parse(storage.getItem('contacts'))

  let div = document.querySelector('.contact-list')

  if (contacts) {
    div.innerHTML = ''
    const ul = document.createElement('ul')

   contacts.forEach(contact => {
      let li = document.createElement('li')

      li.innerHTML = `
        <div class="ui special cards">
          <div class="card">
            <div class="image">
              <img width= 250px; src="https://ca-address-book.herokuapp.com/images/pine.jpg" />
            </div>
            <button class="delete-contact" type="submit">Delete Contact</button>
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
      ul.appendChild(li)
    })

    div.appendChild(ul) 
  } else { 
    div.innerHTML = '<p>You have no contacts in your address book</p>' 
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderContacts();
  const addContactForm = document.querySelector('.new-contact-form')
  const deleteContact = document.querySelector('.contact-list')

  
  deleteContact.addEventListener("click", function deleteUser(){
    if (confirm("Are you sure!")) {
      return true
    } else {
      return false
    }
  })
  deleteUser();

  let retrieveData = localStorage.getItem('contacts')
  console.log(retrieveData);
  let deleteUser = JSON.parse(retrievedData);
  if (deleteUser() === true) {
    deleteUser.splice(0,1)
    localStorage.setItem('contacts',JSON.stringify(deleteUser))
    renderContacts();
  } else {
    
  }
  

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
    renderContacts()
    addContactForm.reset()  
  })  
})
