import { useState } from 'react'

const App = () => {
  const [drankAmount, setDrankAmount] = useState(0)
  const [addAmount, setAddAmount] = useState(0)
  const [userData, setUserData] = useState({ birthDate: new Date(), weight: 0, phoneNumber: '' })
  const [registered, setRegistered] = useState(false)
  const [inSettings, setInSettings] = useState(false)
  const shouldFormat = drankAmount >= 1000;
  const maxAmountDrank = 10000;
  const unit = shouldFormat ? 'l' : 'ml'

  // bierthdat weight phone number reg
  // bierthdat weight sett

  return (
    <div className="App">
      <div style={{ fontSize: 26 }} className="centered">
        <div id='main-view'>
          <h1 style={{ marginBottom: '10rem' }}>{(registered && !inSettings) ? 'Hydration App Functional Prototype' : inSettings ? 'Settings' : 'Registration'}</h1>

          {(registered && !inSettings) ?
            <>
              <input type='number' min="0" style={{ padding: '1rem' }} value={addAmount || ''} onChange={({ target }) => setAddAmount(+target.value)} />

              <button
                aria-label='add-btn'
                style={{ marginBottom: '4rem', padding: '1rem' }} onClick={() => {
                  if (addAmount <= 0)
                    alert('Please enter a value that is above 0.')
                  else if (drankAmount + addAmount > maxAmountDrank)
                    alert("Please don't drink more than " + maxAmountDrank / 1000 + 'l of liquid')
                  else
                    setDrankAmount(drankAmount + addAmount)

                  setAddAmount(0)
                }}>Add</button>

              <p style={{ border: '3px solid cyan', padding: '0.5rem 0', width: '25rem', margin: '0 auto' }}>
                {shouldFormat ? (drankAmount / 1000).toFixed(1) : drankAmount} {unit}
              </p>

              <button aria-label="settings-button" style={{ borderRadius: '10px', marginTop: '2rem', padding: '0.5rem 1.5rem' }} onClick={() => setInSettings(true)}><b>SETTINGS</b></button>
            </>
            :
            <>

              {!inSettings &&
                <>
                  <p>Phone number</p>

                  <input aria-label="phone-number-field" value={userData.phoneNumber || ''} onChange={({ target }) => {
                    setUserData({ ...userData, phoneNumber: target.value })
                  }} />
                </>}


              <p>Birth date</p>

              <input aria-label="birth-date-field" type='date' value={userData.birthDate.toLocaleDateString("lt-LT")} onChange={({ target }) => {
                if (new Date(target.value) > new Date()) {
                  return alert('Birth date cannot be in the future')
                }
                setUserData({ ...userData, birthDate: new Date(target.value) })
              }} />

              <p>Weight</p>

              <input aria-label="weight-field" type='number' max={9999} min='0' value={userData.weight || ''} onChange={({ target }) => {
                if (+target.value > 9999) {
                  return alert('Weight cannot exceed 9999')
                }

                setUserData({ ...userData, weight: +target.value })
              }} />

              <div>
                <button
                  aria-label="settings-or-register-button"
                  onClick={() => {
                    if (!inSettings && userData.phoneNumber.length < 6) {
                      return alert('Phone number too short.')
                    }

                    if (!userData.weight || !userData.birthDate) {
                      return alert('Please enter all fields.')
                    }

                    if (inSettings)
                      return setInSettings(false)

                    localStorage.setItem('userData', JSON.stringify(userData))
                    setRegistered(true)
                  }}>{inSettings ? 'Save' : 'Register'}</button>
              </div>
            </>

          }

        </div>

      </div>
    </div>
  );
}

export default App;
