import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';



import Home from './Home';
import './Style.css';

// Initialize Firebase with your project's config
const firebaseConfig = {
  apiKey: "AIzaSyD7s0CTX0EX9IugI1vFN9xW6K4FoXGr3JA",
  authDomain: "codemaker-f51ef.firebaseapp.com",
  databaseURL: "https://codemaker-f51ef-default-rtdb.firebaseio.com",
  projectId: "codemaker-f51ef",
  storageBucket: "codemaker-f51ef.appspot.com",
  messagingSenderId: "780067339183",
  appId: "1:780067339183:web:ede076b95d2976e4670d5a"
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    signInWithEmailAndPassword(getAuth(app), email, password)

      .then((userCredential) => {
        // If login successful, store user details in state or database
        setMessage(`Logged in as ${userCredential.user.email}`);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        // If login fails, display error message to user
        setMessage(`Login failed: ${error.message}`);
      });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  if (isLoggedIn) {
    return <Home/>;
  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />

        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;
