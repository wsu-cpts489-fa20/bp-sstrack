import { Selector } from 'testcafe';

fixture `SS-Track`
    .page `http://localhost:8081/`;

test('Login goes to main page', async t => {
        const email = 'saucin@g.com';
        const pw = 'Chicken123!'
        const emailInput = Selector('#emailInput');
        const emailPW = Selector('#passwordInput')
    await t
        .typeText(emailInput, email)
        .typeText(emailPW,pw)
        .expect(emailInput.value).eql(email)
        .expect(emailPW.value).eql(pw)
        .click('#loginBtn')
        .expect(Selector('#coursePage').visible).eql(true)
});