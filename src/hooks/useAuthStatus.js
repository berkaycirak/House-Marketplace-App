import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// We will check whether the currentUser is matching with userRef(the actual user of the items.)
export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });
  }, []);

  return { loggedIn, checkingStatus };
}
