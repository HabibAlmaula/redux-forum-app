import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { home } from './routeName';
import PropTypes from 'prop-types';

export const AuthGuard = ({ children }) => {
  const authUser = useSelector((state) => state.authUser.authUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate(home);
    }
  }, [authUser, navigate]);

  return !authUser ? children : null;
};

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};