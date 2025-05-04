// import React, { useState } from 'react';

// const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(true); // Toggle state
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const handleToggle = () => {
//     setIsLogin(!isLogin);
//     setFormData({ name: '', email: '', password: '' }); // Reset form
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = isLogin
//       ? 'http://localhost:7001/api/users/login'
//       : 'http://localhost:7001/api/users/register';

//     const payload = isLogin
//       ? { email: formData.email, password: formData.password }
//       : formData;

//     try {
//       const res = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert(isLogin ? 'Login successful ✅' : 'User registered ✅');
//         if (data.token) {
//           localStorage.setItem('token', data.token);
//         }
//         console.log('Response:', data);
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Something went wrong');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
//       <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
//       <form onSubmit={handleSubmit}>
//         {!isLogin && (
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         )}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
//       </form>

//       <p style={{ marginTop: '10px' }}>
//         {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
//         <button onClick={handleToggle} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
//           {isLogin ? 'Sign Up' : 'Login'}
//         </button>
//       </p>
//     </div>
//   );
// };

// export default AuthForm;




import React, { useState } from 'react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' }); // Reset form
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? 'http://localhost:7001/api/users/login'
      : 'http://localhost:7001/api/users/register';

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert(isLogin ? 'Login successful ✅' : 'User registered ✅');
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        console.log('Response:', data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>

      <p style={{ marginTop: '10px' }}>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button onClick={handleToggle} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
