interface TodoFiltersProps {
  currentFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

export default function TodoFilters({ currentFilter, onFilterChange }: TodoFiltersProps) {
  const filters: { value: 'all' | 'active' | 'completed'; label: string }[] = [
    { value: 'all', label: 'Всі' },
    { value: 'active', label: 'Активні' },
    { value: 'completed', label: 'Виконані' },
  ];

  return (
    <div className="flex justify-center gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 cursor-pointer ${
            currentFilter === filter.value
              ? 'bg-blue-600 text-white'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}