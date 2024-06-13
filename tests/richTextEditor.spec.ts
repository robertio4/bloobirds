import { test, expect } from '@playwright/test';

test('test add link', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.goto('http://localhost:3000/app');
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('support+example@bloobirds.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('tesla');
  await page.getByPlaceholder('Password').press('Tab');
  await page.locator('[data-test="BaseInput-Login-Password"]').getByRole('button').press('Tab');
  await page.getByRole('link', { name: 'Forgot your password?' }).press('Tab');
  await page.getByRole('link', { name: 'master subscription agreement' }).press('Tab');
  const page1Promise = page.waitForEvent('popup');
  await page.locator('[data-test="BaseCheck-Login-Checkbox"]').click();
  const page1 = await page1Promise;
  await page.locator('[data-test="Button-Login-Submit"]').click();
  await page.locator('[data-test="Nav-HeaderLists"] svg').nth(1).click();
  await page.locator('[data-test="BaseItem-HeaderListsLeads"]').click();
  await page
    .getByRole('row', {
      name:
        'Roberto Rodríguez Fernández. Bloobirds Supports Label Label Team Lead & Senior Frontend Engineer Sep 9, 2022 17:09',
    })
    .getByRole('cell', { name: 'Bloobirds' })
    .click();
  await page.locator('[data-test="Action-mailButton"]').click();
  await page.getByText('Create new Email').click();
  await page
    .locator(
      '.smartEmailModal-module__editor__container_ast__ibq8J > .richTextEditor-module_plate_container__c59X1 > div > div',
    )
    .first()
    .click();
  await page.locator('button:nth-child(4)').click();
  await page.getByPlaceholder('Paste link').fill('www.google.com');
  await page.getByPlaceholder('Text to display').click();
  await page.getByPlaceholder('Text to display').fill('LINK');
  await page.getByPlaceholder('Text to display').press('Enter');
  await page
    .getByText('LINK Alfonso TrocoliLead Product Owner at BloobirdsCarrer de Lluçà, 28, 2, 08028')
    .press('Enter');
  await page
    .getByText('LINK Alfonso TrocoliLead Product Owner at BloobirdsCarrer de Lluçà, 28, 2, 08028')
    .press('Enter');
  await page.screenshot({ path: 'richTextEditor-link.png' });

  //expect(await page.screenshot()).toMatchSnapshot('richTextEditor-link.png');
});
