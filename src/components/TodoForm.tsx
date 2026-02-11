"use client";

import { useState, FormEvent } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введіть завдання..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white transition-all"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer"
      >
        Додати
      </button>
    </form>
  );
}