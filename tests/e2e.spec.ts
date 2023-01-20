import { ElectronApplication, Page, _electron as electron } from 'playwright'
import { test, expect } from '@playwright/test'

let electronApp : ElectronApplication
let page : Page

test.beforeAll(async () => {
  electronApp = await electron.launch({ args: ['./app.js'] });
  // Evaluation expression in the Electron context.
  const appPath = await electronApp.evaluate(async ({ app }) => {
  // This runs in the main Electron process, parameter here is always
  // the result of the require('electron') in the main app script.
  return app.getAppPath();
  });
  console.log(appPath);  
  })

test.afterAll(async () => {
  await electronApp.close()
  })

test('render first page', async () => {
  // Get the first window that the app opens, wait if necessary.
  page = await electronApp.firstWindow();
  // Print the title.
  const title = await page.title()
  expect(title).toBe("PassWard")
})

test('click the button to open new window', async () => {
  const button = await page.waitForSelector('*css=button >> text=Create');
  await button.click();
  const newPage = await electronApp.firstWindow();
  expect(newPage).toBeTruthy()
  page = newPage
})

test('check if on create page', async () => {
  await page.waitForSelector('h1')
  const text = await page.$eval('h1', (el) => el.textContent)
  console.log(text)
  expect(text).toBe("Create Credential")
})