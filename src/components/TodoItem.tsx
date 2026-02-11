"use client";

import { useState, useRef, useEffect } from 'react';
import { Trash2, Check, GripVertical } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  isDragDisabled?: boolean;
}

export default function TodoItem({ todo, index, onToggle, onDelete, onEdit, isDragDisabled }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(todo.id, editedText.trim());
    } else {
      setEditedText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={todo.id} index={index} isDragDisabled={isDragDisabled}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="group flex items-center justify-between p-3 border-b border-gray-100 dark:border-zinc-800 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors duration-300 bg-white dark:bg-zinc-900"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {isDragDisabled !== true && (
              <div 
                {...provided.dragHandleProps} 
                className="text-gray-400 p-1 rounded cursor-grab hover:text-gray-600 dark:text-gray-500 transition-colors duration-200 flex items-center justify-center"
              >
                <GripVertical size={18} />
              </div>
            )}
            
            <div className="relative flex items-center justify-center shrink-0 z-20">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 dark:border-zinc-600 checked:bg-blue-600 checked:border-blue-600 transition-all hover:border-blue-400 dark:hover:border-blue-400 hover:opacity-80"
              />
              <Check 
                size={16} 
                strokeWidth={3}
                className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity" 
              />
            </div>

            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="flex-1 px-2 py-1 text-sm border rounded border-blue-500 outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
              />
            ) : (
              <span
                className={`truncate select-none cursor-pointer transition-colors flex-1 ${
                  todo.completed
                    ? 'text-gray-400 line-through dark:text-zinc-500'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                onDoubleClick={() => setIsEditing(true)}
              >
                {todo.text}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id);
            }}
            className="relative z-20 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-md transition-colors duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 cursor-pointer hover:opacity-100"
            aria-label="Видалити завдання"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </Draggable>
  );
}
