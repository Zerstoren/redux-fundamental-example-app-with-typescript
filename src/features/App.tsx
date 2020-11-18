import React from 'react';
// import store from '../store';

import Header from './header/Header';
import Footer from './footer/Footer';
import TodoList from './todos/TodoList';
// import {FilterReducerAction} from './filters/filterSlice';
// import {TodosReducerAction} from './todos/types';

export default function App() {
  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>
        </section>
      </nav>
      <main>
        <section className="medium-container">
          <h2>Todos</h2>
          <div className="todoapp">
            <Header />
            <TodoList />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  );
}