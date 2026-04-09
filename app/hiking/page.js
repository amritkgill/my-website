import fs from "fs";
import path from "path";

function getHikingPhotos() {
  const dir = path.join(process.cwd(), "public", "hiking");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .map((f) => `/hiking/${f}`);
}

export default function HikingPage() {
  const photos = getHikingPhotos();

  return (
    <main>
      <div className="hiking-page">
        <div className="hiking-gallery">
          {photos.map((src) => (
            <div key={src} className="hiking-photo">
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
