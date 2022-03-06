import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';


describe('App', () => {
  const userMock = {
    phoneNumber: '86346342',
    weight: 56,
    birthDate: new Date()
  }

  afterEach(() => {
    localStorage.clear()
  })


  it(`Should not register if phone number is wrong length`, async () => {
    const badPhoneNumber = "123";
    const birthDateData = "2001-11-26";
    const weightFieldData = 80;

    render(<App />);

    const phoneNumberField = screen.getByLabelText(`phone-number-field`);
    await fireEvent.click(phoneNumberField);
    userEvent.type(phoneNumberField, badPhoneNumber);

    const birthDateField = screen.getByLabelText(`birth-date-field`);
    await fireEvent.click(birthDateField);
    userEvent.type(birthDateField, birthDateData);

    const weightField = screen.getByLabelText(`weight-field`);
    await fireEvent.click(weightField);
    userEvent.type(weightField, `${weightFieldData}`)

    const registerBtn = screen.getByLabelText('settings-or-register-button')
    await fireEvent.click(registerBtn);

    expect(localStorage.getItem(`userData`)).toBeNull();
  })



  it('Unit/E2E test of registration process', async () => {
    const phoneNumberData = "86123456";
    const birthDateData = "2001-11-26";
    const weightFieldData = 80;

    render(<App />);

    const phoneNumberField = screen.getByLabelText(`phone-number-field`);
    await fireEvent.click(phoneNumberField);
    userEvent.type(phoneNumberField, phoneNumberData);

    const birthDateField = screen.getByLabelText(`birth-date-field`);
    await fireEvent.click(birthDateField);
    userEvent.type(birthDateField, birthDateData);

    const weightField = screen.getByLabelText(`weight-field`);
    await fireEvent.click(weightField);
    userEvent.type(weightField, `${weightFieldData}`)

    const registerBtn = screen.getByLabelText('settings-or-register-button')
    await fireEvent.click(registerBtn);


    const registerData = {
      birthDate: new Date(birthDateData),
      weight: weightFieldData,
      phoneNumber: phoneNumberData,
    }

    expect(localStorage.getItem(`userData`)).toStrictEqual(JSON.stringify(registerData));
  });


  it('Unit/E2E: hydration functionality', async () => {
    localStorage.setItem('userData', JSON.stringify(userMock))

    const addAmount = 150;

    render(<App />);

    const addAmountField = screen.getByLabelText(`add-amount-field`);
    await fireEvent.click(addAmountField);
    userEvent.type(addAmountField, String(addAmount));

    const addBtn = screen.getByLabelText(`add-btn`);
    await fireEvent.click(addBtn);


    const drankAmount = screen.getByLabelText("drank-amount");


    expect(drankAmount.textContent).toBe(`${addAmount} ml`);
  });


  it('E2E test of registration and hydration functions', async () => {
    const phoneNumberData = "86123456";
    const birthDateData = "2001-11-26";
    const weightFieldData = 80;
    console.info(localStorage.getItem('userData'))
    render(<App />);

    const phoneNumberField = screen.getByLabelText(`phone-number-field`);
    await fireEvent.click(phoneNumberField);
    userEvent.type(phoneNumberField, phoneNumberData);

    const birthDateField = screen.getByLabelText(`birth-date-field`);
    await fireEvent.click(birthDateField);
    userEvent.type(birthDateField, birthDateData);

    const weightField = screen.getByLabelText(`weight-field`);
    await fireEvent.click(weightField);
    userEvent.type(weightField, `${weightFieldData}`)

    const registerBtn = screen.getByLabelText('settings-or-register-button')
    await fireEvent.click(registerBtn);


    const registerData = {
      birthDate: new Date(birthDateData),
      weight: weightFieldData,
      phoneNumber: phoneNumberData,
    }

    expect(localStorage.getItem(`userData`)).toStrictEqual(JSON.stringify(registerData));

    const addAmount = 150;

    const addAmountField = screen.getByLabelText(`add-amount-field`);
    await fireEvent.click(addAmountField);
    userEvent.type(addAmountField, String(addAmount));

    const addBtn = screen.getByLabelText(`add-btn`);
    await fireEvent.click(addBtn);

    const drankAmount = screen.getByLabelText("drank-amount");

    expect(drankAmount.textContent).toBe(`${addAmount} ml`);
  });

  it(`Unit test of settings overwrite functionality`, async () => {
    localStorage.setItem('userData', JSON.stringify(userMock))

    const newWeight = 100;

    render(<App />);

    const settingsBtn = screen.getByLabelText(`settings-button`);
    await fireEvent.click(settingsBtn);

    const weightField = screen.getByLabelText(`weight-field`);
    await fireEvent.click(weightField);
    userEvent.type(weightField, String(newWeight))

    const saveBtn = screen.getByLabelText(`settings-or-register-button`);
    await fireEvent.click(saveBtn);

    console.info(localStorage.getItem('userData'))

    expect(localStorage.getItem('userData')).not.toEqual(JSON.stringify(userMock));

  });

});