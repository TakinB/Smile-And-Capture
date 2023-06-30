import "./gallery.css";

const PhotoGallery = ({ photos }: { photos: any[] }) => {

  return (
      <div className="gallery">
        {photos.length > 0 &&
          photos.map((photo, i: number) => (
            <div key={i}>
              <img src={photo} alt={`capture ${i}`} className="gallery__photo" />
            </div>
          ))}
      </div>
  );
};

export default PhotoGallery;