import React, {useEffect, useState, useMemo} from "react";

export const UserContext = React.createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(undefined);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8000/api/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.status)
          }
          return response.json()
        })
        .then(setUser)
        .catch((e) => {
          console.log(e.message)
        })
    }
  }, []);

  const onAuthSubmit = (authModal, email, password) => {

    const userData = JSON.stringify({email, password, password_confirmation: password});

    if (authModal === 'register') {
      fetch(`http://localhost:8000/api/register`, {
        method: 'post',
        body: userData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).catch((e) => {
        console.log(e.message)
      })
    } else {
      fetch('http://localhost:8000/api/login', {
        method: 'post',
        body: userData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          setUser(data.user)
        })
        .catch((e) => {
          console.log(e.message)
        })
    }
  };

  const logoutSubmit = () => {
    fetch(`http://localhost:8000/api/logout`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setUser(undefined);
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  const value = useMemo(() => {
    return ({
      user,
      logoutSubmit,
      onAuthSubmit
    })
  }, [user])

  return <UserContext.Provider value={value} {...props}/>

};