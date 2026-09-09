import { creators } from "@/features/catalog/catalog";
import { CreatorTile } from "@/features/catalog/catalog-view";
export default function CreatorsPage() {
  return (
    <>
      <header className="page-heading">
        <h1>Creators</h1>
        <span className="muted">Fictional sample identities</span>
      </header>
      <div className="creator-grid">
        {creators.map((creator) => (
          <CreatorTile key={creator.id} creator={creator} />
        ))}
      </div>
    </>
  );
}

export const metadata = { title: "Creators" };
