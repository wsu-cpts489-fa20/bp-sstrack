import { Selector } from 'testcafe';


fixture `SS-Track`
    .page `http://localhost:8081/`;

test('Login goes to main page', async t => {
        const email = 'saucin@g.com';
        const pw = 'Chicken123!';
        const emailInput = Selector('#emailInput');
        const passwordInput = Selector('#passwordInput');
    await t
        // Enters text
        .typeText(emailInput, email)

        .typeText(passwordInput,pw)
        // Checks expected input
        .expect(emailInput.value).eql(email)
        .expect(passwordInput.value).eql(pw)
        // Logs in and checks if coursePage is displayed
        .click('#loginBtn')
        .expect(Selector('#coursePage').visible).eql(true)
});

test('Login Github', async t => {
    await t 
    .click('#gitHubBtn')

});