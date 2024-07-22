import React, { useState } from 'react';
import './login.css';
import { toast } from 'react-toastify';

const Login = ({ setCurrentUser }) => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ''
  });

  const [loading, setLoading] = useState(false);

  const handleAvatar = e => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      // Mock sign-in logic
      if (email === 'test@test.com' && password === 'password') {
        toast.success('Logged in successfully!');
        setCurrentUser({ id: 'mock-id', name: 'John Doe' }); // Set the mock user
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      // Mock registration logic
      if (username && email && password) {
        const imgUrl = avatar.url || './avatar.png';

        const user = {
          username,
          email,
          avatar: imgUrl,
          id: 'mock-id',
          blocked: []
        };

        console.log('User created:', user);
        toast.success('Account created! You can login now!');
      } else {
        throw new Error('All fields are required');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder='Email' name='email' />
          <input type="password" name="password" placeholder='Password' />
          <button disabled={loading}>{loading ? 'Loading' : 'Sign In'}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || './avatar.png'} alt="" />
            Upload an image
          </label>
          <input type="file" id='file' style={{ display: 'none' }} onChange={handleAvatar} />
          <input type="text" placeholder='Username' name='username' />
          <input type="text" placeholder='Email' name='email' />
          <input type="password" name="password" placeholder='Password' />
          <button disabled={loading}>{loading ? 'Loading' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
