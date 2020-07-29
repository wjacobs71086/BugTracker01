import React, {useState} from 'react'
import './form.css'
/*
TODO:
if the props show it's a reg, then start with all the password requirements in grey. Once they begin to change the password field, it starts changing the requirements to green as they are fulfilled.
The requirements only turn red AFTER an attempted submission with requirements not met.

reg should also change the fetch command on where the data is sent.

If the props show a sign in, this needs to remove all the validation steps, but returns errors if the server tosses one after a failed attempt.
*/


function Form (props) {

  let [ userName, setUserName ] = useState('')
  let [ userPassword, setPassword ] = useState('')
  let [ err, setErr ] = useState({userNameError:'', passwordError:''})
  let [attSubmit, setAttSubmit] = useState(false);

  function validate() {
    // Check for email address as the user name
    if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(userName))) {
      setErr({...err, userNameError: 'Must be a valid email address'})
    }

    let checkLowerCase = new RegExp("^(?=.*[a-z])");
    let checkUpperCase = new RegExp("^(?=.*[A-Z])");
    let checkNumber = new RegExp("^(?=.*[0-9])");
    let checkSpecialChar = new RegExp("^(?=.*[!@#\$%\^&\*])");
    let checkLength = new RegExp("^(?=.{8,})");
    
     let errorState = {}

      if (!checkLowerCase.test(userPassword)) {
        errorState = {...errorState, passwordError01: 'Must contain a lower case character'}
      } 
      if (!checkUpperCase.test(userPassword)) {
        errorState = {...errorState, passwordError02: 'Must contain an upper case character'}
      } 
      if (!checkNumber.test(userPassword)) {
        errorState = {...errorState, passwordError03: 'Must contain a number'}
      } 
      if (!checkSpecialChar.test(userPassword)) {
        errorState = {...errorState, passwordError04: 'Must contain a special character'}
      } 
      if (!checkLength.test(userPassword)) {
        errorState = {...errorState, passwordError05: 'Must be over 8 characters in length'}
      }
      setErr(errorState)

  }

  function resetError() {
    setErr({userNameError:'', passwordError:''})
  }

  return(
    <div>      
      <form className='form-container'>
      <label className='formLabel'>{props.type === 'reg' ? 'Sign up' : 'Sign in'} </label>
        <input
          type='text'
          placeholder='user name'
          name='user_name'
          autoComplete='off'
          className='input'
          onChange={(e)=> {
            resetError()
            setUserName(e.target.value)
          }}
        />
        <p className='error'>{err.userNameError}</p>
        <input
          type='password'
          placeholder='password'
          name='password'
          autoComplete='off'
          className='input'
          onChange={(e)=> {
            setPassword(e.target.value)
            if(attSubmit){
              validate()
            }
          }}
        />
        <div>





        {/* {(err.passwordError01 !== '' && attSubmit === false) ? <p className='grey'>{err.passwordError01}</p> : <p className='error'>Contains a lower case character</p>}
        {(err.passwordError02 !== '') ? <p className='error'>{err.passwordError02}</p> : <p className='good'>Contains an upper case character</p>}
        {(err.passwordError03 !== '') ? <p className='error'>{err.passwordError03}</p> : <p className='good'>Contains a number</p>}
        {(err.passwordError04 !== '') ? <p className='error'>{err.passwordError04}</p> : <p className='good'>Contains a special character</p>}
        {(err.passwordError05 !== '') ? <p className='error'>{err.passwordError05}</p> : <p className='good'>Over 8 characters in length</p>} */}
        </div>

        <button
        type='submit'
        onClick={(e) => {
          e.preventDefault()
          // Check props if it's a registration or a sign in and route fetch appropriately.
          if(!attSubmit){
            setAttSubmit(true)
          }

          console.log(userPassword)
        }} >Submit</button> 
      </form>
     
    </div>
  )
}

export default Form;