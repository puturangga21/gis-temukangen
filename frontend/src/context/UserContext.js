'use client';

import { createContext, useContext, useState } from 'react';

const CredentialContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [credential, setCredential] = useState({});
  const [loading, setLoading] = useState(true);

  return (
    <CredentialContext.Provider
      value={{ credential, setCredential, loading, setLoading }}>
      {children}
    </CredentialContext.Provider>
  );
};

export const useCredential = () => useContext(CredentialContext);
