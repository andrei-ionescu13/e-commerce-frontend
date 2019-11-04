import React from 'react';
import { StyledAlert } from '../styles';

const Alert = ({ type, children }) => <StyledAlert type={type}>{children}</StyledAlert>;

export default Alert;
