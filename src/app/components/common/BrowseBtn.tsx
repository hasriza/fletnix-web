import { Button } from 'antd';
import { selectAuth } from 'app/pages/Auth/slice/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function BrowseBtn() {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(selectAuth);

  return (
    <Button
      type="primary"
      onClick={() => navigate(isAuthenticated ? '/listing' : '/auth')}
    >
      Browse
    </Button>
  );
}
