"use client";

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onDragEnd: (result: DropResult) => void;
  isFiltered?: boolean;
  currentFilter: 'all' | 'active' | 'completed';
}

export default function TodoList({ todos, onToggle, onDelete, onEdit, onDragEnd, isFiltered, currentFilter }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-500 dark:text-zinc-400 text-lg">
          {isFiltered ? 'Завдань не знайдено' : 'Список завдань порожній'}
        </p>
        {!isFiltered && (
          <p className="text-gray-400 dark:text-zinc-500 text-sm mt-1">Додайте нове завдання, щоб почати!</p>
        )}
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                index={index}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                isDragDisabled={false}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
