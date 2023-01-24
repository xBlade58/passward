import { ElectronApplication, Page, _electron as electron } from 'playwright'
import { test, expect } from '@playwright/test'
import { ipcMainInvokeHandler } from 'electron-playwright-helpers'

let electronApp : ElectronApplication
let page : Page

test.beforeAll(async () => {
  electronApp = await electron.launch({ args: ['./src/app.js'] }); 
  })

test.afterAll(async () => {
  await electronApp.close()
  })

//E2E UI Tests

test('render first page', async () => {
  page = await electronApp.firstWindow();
  const title = await page.title()
  expect(title).toBe("PassWard")
})

test('click the button to open create credential page', async () => {
  const button = await page.waitForSelector('*css=button >> text=Create Credential');
  await button.click();
  const newPage = await electronApp.firstWindow();
  expect(newPage).toBeTruthy()
  page = newPage
})

test('check if on create page', async () => {
  await page.waitForSelector('h2')
  const text = await page.$eval('h2', (el) => el.textContent)
  console.log(text)
  expect(text).toBe("Create Credential")
})

//Integration Tests

var obj = {
  id: "Test-ID",
  title: "Test-Titel",
  username: "Test-UserName",
  password: "TestPassword"
}

test('test save Credential', async () => {
  await ipcMainInvokeHandler(electronApp, 'storage:saveCredential', obj)
  const result = await ipcMainInvokeHandler(electronApp, 'storage:fetchPasswordById', obj.id)
  expect(result).toBe("TestPassword")
})

test('test delete Credential', async () => {
  const result = await ipcMainInvokeHandler(electronApp, 'storage:deleteCredentialById', obj.id)
  expect(result).toBe(undefined)
})