import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';


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

it('E2E test of registration process', async () => {
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

  //const menuDropdown = screen.getByLabelText('menu-dropdown');

  const registerData = {
    birthDate: new Date(birthDateData),
    weight: weightFieldData,
    phoneNumber: phoneNumberData,
  }

  expect(localStorage.getItem(`userData`)).toStrictEqual(JSON.stringify(registerData));
});
