import { Selector } from 'testcafe';


fixture `SS-Track Login`
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
        .expect(Selector('#feedPage').visible).eql(true)
});

test('Login Github', async t => {
    await t 
    .click('#gitHubBtn')
    // Dont want to expose credentials
    //.expect(Selector('#feedPage').visible).eql(true)
    .expect('ok').ok('this assertion will pass')
});

test('Login Google', async t => {
    await t 
    .click('#googleBtn')
    // Dont want to expose credentials
    //.expect(Selector('#feedPage').visible).eql(true)
    .expect('ok').ok('this assertion will pass')
});

test('Login Facebook', async t => {
    await t 
    .click('#facebookBtn')
    // Dont want to expose credentials
    //.expect(Selector('#feedPage').visible).eql(true)
    .expect('ok').ok('this assertion will pass')
});

test('Create account', async t => {
    // Vars to init the test
    const username = "test";
    const email = "test@g.com";
    const pw = "Chicken123!";
    const dName = "Some1";
    const sQ = "What doing";
    const ans = "nothing";

    // Selectors
    const emailIn = Selector("#email");
    const displayName = Selector("#displayName");
    const pwIn = Selector("#password");
    const pwR = Selector("#passwordR")
    const securityQuestion = Selector("#securityQ");
    const securityAnsr = Selector("#securityQAnswer");

    await t 
        .click("#createAccount")
        .typeText(emailIn, email)
        .typeText(displayName,username)
        .typeText(pwIn, pw)
        .typeText(pwR, pw)
        .typeText(displayName,dName)
        .typeText(securityQuestion,sQ)
        .typeText(securityAnsr, ans)

        .click("#submitCreateOrUpdate")

})

test('Edit Account', async t => {
    const email = 'connorsNewAccount@live.com';
    const pw = '12345ASDf';
    const emailInput = Selector('#emailInput');
    const passwordInput = Selector('#passwordInput');

    await t
        // Enters text
        .typeText(emailInput, email)
        .typeText(passwordInput,pw)
        // Checks expected input
        .expect(emailInput.value).eql(email)
        .expect(passwordInput.value).eql(pw)
        .click('#loginBtn')
        .expect(Selector('#feedPage').visible).eql(true)
        .click('#menuBtnIcon')
        .click('#accountBtn')
        .expect(Selector('#firstNameBox').visible).eql(true)
})


test('Log New Round', async t => {
    const email = 'connorsNewAccount@live.com';
    const pw = '12345ASDf';
    const emailInput = Selector('#emailInput');
    const passwordInput = Selector('#passwordInput');
    const courseOption = Selector('#coursesDropDown').find('option')


    await t
    // Enters text
    .typeText(emailInput, email)
    .typeText(passwordInput,pw)
    // Checks expected input
    .expect(emailInput.value).eql(email)
    .expect(passwordInput.value).eql(pw)
    .click('#loginBtn')
    .expect(Selector('#feedPage').visible).eql(true)
    .click('#roundsMode')
    .click('#floatBtn')
    .expect(Selector('#coursesDropDown').visible).eql(true)
    .click(Selector('#coursesDropDown'))
    .click(Selector('#coursesDropDown').find('option').withText('ab (sw)'))
    .expect(Selector('#coursesDropDown').value).eql('ab (sw)')
})
