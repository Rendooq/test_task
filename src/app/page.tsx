"use client";

import { useState, useEffect } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { Todo } from '../types/todo';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoStats from '../components/TodoStats';
import TodoFilters from '../components/TodoFilters';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Failed to parse todos from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isMounted]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const newTodos = Array.from(todos);
    const [reorderedItem] = newTodos.splice(sourceIndex, 1);
    newTodos.splice(destinationIndex, 0, reorderedItem);

    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (!isMounted) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-black py-10 px-4 transition-colors duration-300">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-xl text-center border border-gray-100 dark:border-zinc-800 transition-colors duration-300">
          <p className="text-gray-500 dark:text-zinc-400">Завантаження...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black py-10 px-4 transition-colors duration-300 font-sans">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-100 dark:border-zinc-800 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Список завдань
          </h1>
          <ThemeToggle />
        </div>
        
        <TodoForm onAdd={handleAddTodo} />
        
        <TodoFilters currentFilter={filter} onFilterChange={setFilter} />

        <div className="mt-6">
          <TodoList
            todos={filter === 'all' ? todos : filteredTodos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            onDragEnd={handleDragEnd}
            isFiltered={filter !== 'all'}
            currentFilter={filter}
          />
        </div>

        <TodoStats todos={todos} onClearCompleted={handleClearCompleted} />
      </div>
    </main>
  );
}
