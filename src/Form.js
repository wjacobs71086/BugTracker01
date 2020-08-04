import React, {useState} from 'react'
import './form.css'
/*
TODO:
if the props show it's a registration, then start with all the password requirements in grey. Once they begin to change the password field, it starts changing the requirements to green as they are fulfilled.
The requirements only turn red AFTER an attempted submission with requirements not met.

reg should also change the fetch command on where the data is sent.

If the props show a sign in, this needs to remove all the validation steps, but returns errors if the server tosses one after a failed attempt.
*/


function Form (props) {

  let [ userName, setUserName ] = useState('')
  let [ userPassword, setPassword ] = useState('')
  let [ err, setErr ] = useState({userNameError:'', passwordError:''})
  let [focus, setFocus] = useState(false)
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

      if (checkLowerCase.test(userPassword)) {
        errorState = {...errorState, passwordError01: true}
      } 
      if (checkUpperCase.test(userPassword)) {
        errorState = {...errorState, passwordError02: true}
      } 
      if (checkNumber.test(userPassword)) {
        errorState = {...errorState, passwordError03: true}
      } 
      if (checkSpecialChar.test(userPassword)) {
        errorState = {...errorState, passwordError04: true}
      } 
      if (checkLength.test(userPassword)) {
        errorState = {...errorState, passwordError05: true}
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
          onFocus={()=> {
            validate()
            setFocus(true)
          }}
          onChange={(e)=> {
            setPassword(e.target.value)
            if (focus ){
              validate()
            }
          }}
        />

        <div className={focus ? '' : 'hidden'}>
          <p className={(err.passwordError01) ? 'good' : "grey"}>Contains a lower case character</p>
          <p className={(err.passwordError02) ? 'good' : "grey"}>Contains an upper case character</p>
          <p className={(err.passwordError03) ? 'good' : "grey"}>Contains a number</p>
          <p className={(err.passwordError04) ? 'good' : "grey"}>Contains a special character</p>
          <p className={(err.passwordError05) ? 'good' : "grey"}>8 Characters long</p>
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