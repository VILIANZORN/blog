import { useSelector, useDispatch  } from 'react-redux';
import { useEffect } from 'react';

import { setUser, setUsername, setEmail, setImage } from '../store/userSlice';
import { useGetUserQuery } from '../store/API/userApi';

export default function useAuth() {
  const dispatch = useDispatch();
  const username = useSelector(setUsername);
  const email = useSelector(setEmail);
  const image = useSelector(setImage);

  const token = localStorage.getItem('token');
  const { data: userData, error } = useGetUserQuery(token, {
    skip: !token, 
  });

  useEffect(() => {
    if (userData && !error) {
      dispatch(setUser(userData.user));
    } else if (error) {
      localStorage.removeItem('token');
    }
  }, [userData, error, dispatch]);

  return {
    isAuth: !!username,
    username,
    email,
    image,
  };
}