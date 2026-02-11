import { Todo } from '../types/todo';

interface TodoStatsProps {
  todos: Todo[];
  onClearCompleted: () => void;
}

export default function TodoStats({ todos, onClearCompleted }: TodoStatsProps) {
  const completedCount = todos.filter((t) => t.completed).length;
  const remainingCount = todos.length - completedCount;

  if (todos.length === 0) return null;

  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 text-sm text-gray-500 dark:text-zinc-400">
      <span>
        Залишилось виконати: {remainingCount}
      </span>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="hover:text-red-500 transition-colors duration-300 hover:underline cursor-pointer"
        >
          Очистити виконані
        </button>
      )}
    </div>
  );
}