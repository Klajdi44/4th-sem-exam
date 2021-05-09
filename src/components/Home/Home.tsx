import React from 'react';
import app from '../FirebaseApp';
import Nav from '../Nav/Nav';

function Home() {
  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  return (
    <div className='home'>
      <h1> Home</h1>
      <button onClick={handleSignOut}> Log out </button>
      <Nav />
    </div>
  );
}

export default Home;