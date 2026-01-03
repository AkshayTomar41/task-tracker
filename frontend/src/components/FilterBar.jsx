export default function FilterBar({ setFilter }) {
  return (
    <div className="filter-bar">
      <button onClick={() => setFilter("All")}>All</button>
      <button onClick={() => setFilter("Pending")}>Pending</button>
      <button onClick={() => setFilter("Completed")}>Completed</button>
    </div>
  );
}
