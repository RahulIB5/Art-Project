import type { Artwork } from '../types/artwork';

interface Props {
  selectedArtworks: Record<number, Artwork>;
}

export const SelectedArtworksBanner = ({ selectedArtworks }: Props) => {
  const selectedList = Object.values(selectedArtworks);

  if (selectedList.length === 0) return null;

  return (
    <div
      className="bg-blue-50 p-3 border-round shadow-2 mb-4"
      style={{
        maxHeight: '200px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <strong>{selectedList.length} row{selectedList.length > 1 ? 's' : ''} selected:</strong>
      <ul style={{ margin: 0, paddingLeft: '1rem' }}>
        {selectedList.map((item) => (
          <li key={item.id} style={{ lineHeight: '1.5' }}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
