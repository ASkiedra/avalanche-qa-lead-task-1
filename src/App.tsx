import { useState } from 'react'

const App = () => {
  const [drankAmount, setDrankAmount] = useState(0)
  const [addAmount, setAddAmount] = useState(0)
  const [userData, setUserData] = useState({ birthDate: new Date(), weight: 0 })
  const [registered, setRegistered] = useState(false)
  const shouldFormat = drankAmount >= 1000;
  const maxAmountDrank = 10000;
  const unit = shouldFormat ? 'l' : 'ml'

  // bierthdat weight phone number reg
  // bierthdat weight sett

  return (
    <div className="App">
      <div style={{ fontSize: 26 }} className="centered">
        <div id='main-view'>
          <h1 style={{ marginBottom: '10rem' }}>{registered ? 'Hydration App Functional Prototype' : 'Registration'}</h1>

          {registered ?
            <>
              <input type='number' min="0" style={{ padding: '1rem' }} value={addAmount || ''} onChange={({ target }) => setAddAmount(+target.value)} />

              <button style={{ marginBottom: '4rem', padding: '1rem' }} onClick={() => {
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
            </>
            :
            <>
              <p>Birth date</p>

              <input type='date' value={userData.birthDate.toLocaleDateString("lt-LT")} onChange={({ target }) => {
                if (new Date(target.value) > new Date()) {
                  return alert('Birth date cannot be in the future')
                }
                setUserData({ ...userData, birthDate: new Date(target.value) })
              }} />

              <p>Weight</p>

              <input type='number' max={9999} min='0' value={userData.weight || ''} onChange={({ target }) => {
                if (+target.value > 9999) {
                  return alert('Weight cannot exceed 9999')
                }

                setUserData({ ...userData, weight: +target.value })
              }} />

              <div>
                <button onClick={() => {
                  if (!userData.weight || !userData.birthDate) {
                    return alert('Please enter all fields.')
                  }
                  setRegistered(true)
                }}>Register</button>
              </div>
            </>

          }

        </div>

      </div>
    </div>
  );
}

export default App;
