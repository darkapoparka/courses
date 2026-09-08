export default function Loading() {
  return (
    <div className="loading-home" data-testid="home-loading">
      <h1>Home</h1>
      <p role="status">Loading your next bit of inspiration...</p>
      <div className="skeleton-editorials" aria-hidden="true">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} />
        ))}
      </div>
      <div className="skeleton-shelf" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} />
        ))}
      </div>
    </div>
  );
}
