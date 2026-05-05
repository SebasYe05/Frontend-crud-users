import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import {
  FiMusic, FiDisc, FiHeadphones, FiHeart,
  FiList, FiPlay, FiClock
} from "react-icons/fi";
import "./HomePage.css";

const RECENT_ALBUMS = [
  { id: 1, title: "Kind of Blue", artist: "Miles Davis", year: 1959, genre: "Jazz", tracks: 5, color: "#1e3a5f" },
  { id: 2, title: "Rumours", artist: "Fleetwood Mac", year: 1977, genre: "Rock", tracks: 11, color: "#3b1f5e" },
  { id: 3, title: "Random Access Memories", artist: "Daft Punk", year: 2013, genre: "Electronic", tracks: 13, color: "#1f3d2e" },
  { id: 4, title: "Blue", artist: "Joni Mitchell", year: 1971, genre: "Folk", tracks: 10, color: "#1a3348" },
];

const QUICK_LINKS = [
  { to: "/library", icon: FiDisc, label: "Biblioteca", desc: "Toda tu música" },
  { to: "/favorites", icon: FiHeart, label: "Favoritos", desc: "Lo que más te gusta" },
  { to: "/playlists", icon: FiList, label: "Playlists", desc: "Tus listas" },
  { to: "/player", icon: FiHeadphones, label: "Reproductor", desc: "Ahora sonando" },
];

const RECENT_PLAYS = [
  { title: "So What", artist: "Miles Davis", album: "Kind of Blue", duration: "9:22" },
  { title: "The Chain", artist: "Fleetwood Mac", album: "Rumours", duration: "4:30" },
  { title: "Get Lucky", artist: "Daft Punk", album: "Random Access Memories", duration: "6:09" },
  { title: "River", artist: "Joni Mitchell", album: "Blue", duration: "4:00" },
  { title: "Blue in Green", artist: "Miles Davis", album: "Kind of Blue", duration: "5:37" },
];

export function HomePage() {
  const authContext = useAuthContext();
  const user = authContext?.user;
  const firstName = user?.username?.split(" ")[0] || user?.username || "Oyente";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="home-page">
      {/* ── Hero ───────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-waveform" aria-hidden="true">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="waveform-bar" style={{ "--delay": `${i * 0.07}s`, "--h": `${20 + Math.sin(i * 0.6) * 60}%` }} />
          ))}
        </div>
        <div className="home-hero-content">
          <p className="home-greeting">{greeting},</p>
          <h1 className="home-name">{firstName} <span className="home-name-accent">♪</span></h1>
          <p className="home-tagline">Tu colección FLAC de alta fidelidad, siempre contigo.</p>
          <NavLink to="/player" className="home-play-btn">
            <FiPlay size={16} />
            Escuchar ahora
          </NavLink>
        </div>
      </section>

      {/* ── Accesos rápidos ────────────────────────── */}
      <section className="home-section">
        <h2 className="home-section-title">Accesos rápidos</h2>
        <div className="quick-links-grid">
          {QUICK_LINKS.map(({ to, icon: Icon, label, desc }) => (
            <NavLink key={to} to={to} className="quick-link-card">
              <div className="quick-link-icon">
                <Icon size={20} />
              </div>
              <div>
                <div className="quick-link-label">{label}</div>
                <div className="quick-link-desc">{desc}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* ── Álbumes recientes ──────────────────────── */}
      <section className="home-section">
        <div className="home-section-header">
          <h2 className="home-section-title">Álbumes recientes</h2>
          <NavLink to="/library" className="home-see-all">Ver todos →</NavLink>
        </div>
        <div className="albums-grid">
          {RECENT_ALBUMS.map((album) => (
            <div key={album.id} className="album-card">
              <div className="album-art" style={{ background: album.color }}>
                <FiDisc size={32} color="rgba(255,255,255,0.4)" />
                <button className="album-play-btn" aria-label={`Reproducir ${album.title}`}>
                  <FiPlay size={16} />
                </button>
              </div>
              <div className="album-info">
                <div className="album-title">{album.title}</div>
                <div className="album-artist">{album.artist}</div>
                <div className="album-meta">
                  <span className="album-genre">{album.genre}</span>
                  <span>{album.tracks} pistas · {album.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Escuchado recientemente ────────────────── */}
      <section className="home-section">
        <div className="home-section-header">
          <h2 className="home-section-title">
            <FiClock size={16} style={{ marginRight: 6, opacity: 0.6 }} />
            Escuchado recientemente
          </h2>
          <NavLink to="/history" className="home-see-all">Ver historial →</NavLink>
        </div>
        <div className="recent-list">
          {RECENT_PLAYS.map((track, i) => (
            <div key={i} className="recent-track">
              <div className="recent-track-num">{i + 1}</div>
              <div className="recent-track-art">
                <FiMusic size={14} />
              </div>
              <div className="recent-track-info">
                <div className="recent-track-title">{track.title}</div>
                <div className="recent-track-artist">{track.artist} · {track.album}</div>
              </div>
              <div className="recent-track-duration">{track.duration}</div>
              <button className="recent-track-play" aria-label="Reproducir">
                <FiPlay size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}