import './GalleryItem.scss';

interface GalleryItemProps {
  img?: string;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ img }) => {
  return (
    <div className="GalleryItem">
      <img src={img} alt="gallery item" />
    </div>
  );
}
