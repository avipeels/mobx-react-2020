import React from 'react';
import { useLocalStore, useObserver } from "mobx-react";

// create react context to store this context so that it is available through out the app
const StoreContext = React.createContext();
// create a store provider that wraps over all the components in the app
const StoreProvider = ({ children }) => {
  // initialize store using 'useLocalStore
  const store = useLocalStore(() => ({
    bugs: [],
    addBug: bug => {
      store.bugs.push(bug);
    },
    get bugsCount() {
      return store.bugs.length;
    }
  }));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

const BugsHeader = () => {
  const store = React.useContext(StoreContext);
  return useObserver(() => (
    <h1>{store.bugsCount} Bugs!!</h1>
  ))
}

const BugsList = () => {
  const store = React.useContext(StoreContext);
  return useObserver(() => (
    <ul>
      {store.bugs.map(bug => (<li key={bug}>{bug}</li>))}
    </ul>
  ))
}

const BugsForm = () => {
  const store = React.useContext(StoreContext);
  const [bug, setBug] = React.useState("");
  return (
    <form onSubmit={(e) => {
      store.addBug(bug);
      setBug("");
      e.preventDefault();
    }}>
      <input type="text" value={bug} onChange={(e) => { setBug(e.target.value) }} />
      <button>Add</button>
    </form>
  )
}

function App() {
  return (
    <StoreProvider>
      <main>
        <BugsHeader />
        <BugsList />
        <BugsForm />
      </main>
    </StoreProvider>
  );
}

export default App;
