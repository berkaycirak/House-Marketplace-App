import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import OAuth from '../components/OAuth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  // This function will be callback for change events.
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // This function will be callback for submit event
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      // We are registering the user with that function, and assign it to userCredential variable.
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // You can get the actual user info here which will be using in database. Usercredential also contains uid even if you don't create uid, above function will automatically create a uid.
      const user = userCredential.user;

      // You can reach the current user with currentUser method on auth, and update the profile.
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      //Since we do not want to change our formData, we copy it.
      const formDataCopy = { ...formData };

      // We do not want to store the password into the database.
      delete formDataCopy.password;

      // timestamp property will be defined since serverTimestamp function returns a time value.
      formDataCopy.timestamp = serverTimestamp();

      // setDoc will update the database, and will create a collection with a "users" name and add the user into it according to formDataCopy info.
      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      // After sign-up process, we redirect the page.
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with registration');
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={submitHandler}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={changeHandler}
          />
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={changeHandler}
          />

          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={changeHandler}
            />

            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button type='submit' className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
        <OAuth />

        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
