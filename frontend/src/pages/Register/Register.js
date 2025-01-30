import React, { useCallback, useState } from 'react';
import GoogleSignIn from '../../components/Buttons/GoogleSignIn';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { setLoading } from '../../store/features/common';
import { useDispatch } from 'react-redux';
import { registerAPI } from '../../api/authentication';

const Register = () => {
  const [values, setValues] = useState({
    email: '',
    passwordHash: '',
    username: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [enableVerify, setEnableVerify] = useState(false);
  const navigate = useNavigate(); // Hook do nawigacji

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));

    console.log("Rozpoczynam rejestrację..."); // Debug
    registerAPI(values)
      .then(res => {
        console.log("Rejestracja zakończona:", res); // Debug
        if (res?.userId) {
          console.log("Przekierowanie na stronę logowania...");
          navigate("/v1/login");
        }

      })
      .catch(err => {
        console.error("Błąd rejestracji:", err);
        setError("Invalid or Email already exists!");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, values, navigate]);


  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]: e.target?.value,
    }));
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full mt-[-30vh]'>
      {!enableVerify ? (
        <>
          <p className='text-3xl font-bold pb-4 pt-4'>Zarejestruj się</p>
          <GoogleSignIn />
          <p className='text-gray-500 items-center text-center w-full py-2'>Lub</p>

          <div className='pt-4'>
            <form onSubmit={onSubmit} autoComplete='off'>
              <label>Nazwa użytkownika</label>
              <input type="text" name='username' value={values.username} onChange={handleOnChange} placeholder='Nazwa użytkownika' className='h-[48px] w-full border p-2 mt-2 mb-4 border-gray-400' required autoComplete='off' />

              <label>Adres Email</label>
              <input type="email" name='email' value={values.email} onChange={handleOnChange} placeholder='Adres Email' className='h-[48px] w-full border p-2 mt-2 mb-4 border-gray-400' required autoComplete='off' />

              <label>Hasło</label>
              <input type="password" name='passwordHash' value={values.passwordHash} onChange={handleOnChange} placeholder='Hasło' className='h-[48px] mt-2 w-full border p-2 border-gray-400' required autoComplete='new-password' />

              <button className='border w-full rounded-lg h-[48px] mb-4 bg-black text-white mt-4 hover:opacity-80'>Zarejestruj się</button>
            </form>
          </div>

          {error && <p className='text-lg text-red-700'>{error}</p>}
          <Link to={"/v1/login"} className='underline text-gray-500 hover:text-black'>Masz już konto? Zaloguj się!</Link>
        </>
      ) : (
        <p className="text-lg text-green-700">Rejestracja zakończona pomyślnie! Przekierowanie...</p>
      )}
    </div>
  );
};

export default Register;
