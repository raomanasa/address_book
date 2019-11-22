const { After, Given, Then, When } = require('cucumber')

Given('I visit the site', async function() {
  return await this.openHomePage()
})

After(async function() {
    return await this.closeHomePage()
  })

Then('I should see {string}', async function(content) {
  return await this.pageHasTextContent(content)
})

When('I click {string}', async function(btnName) {
  return await this.clickOnButton(btnName)
})

Then('I fill in {string} with {string}', async function(field, content) {
  return await this.fillFormField(field.toLowerCase(), content)
})

Then('I should have {int} contact in my address book', async function (contactCount) {
  return await this.checkContactStorageCount(contactCount)
})

Then('I should not see {string}', async function (content) {
  return await this.pageDoesNotHaveTextContent(content)
})
