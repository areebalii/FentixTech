import React from 'react';

export default function TodoFilters({ filter, setFilter, stats }) {
  const filterTabs = [
    { id: 'all', label: 'All', count: stats.total },
    { id: 'pending', label: 'Pending', count: stats.pending },
    { id: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="filters-container">
      {filterTabs.map((tab) => (
        <button
          key={tab.id}
          className={`filter-tab ${filter === tab.id ? 'active' : ''}`}
          onClick={() => setFilter(tab.id)}
        >
          {tab.label}
          <span className="filter-count">{tab.count}</span>
        </button>
      ))}
    </div>
  );
}