

## Plan d'intégration de l'album "Echoes in the Buffer"

### Objectif
Ajouter le nouvel album "Echoes in the Buffer" sur la page d'accueil et la page musique, avec son iframe SoundCloud et sa cover.

---

### Etape 1 : Copier l'image de cover dans le projet

Copier l'image uploadee vers le dossier `public/image/` :
- Source : `user-uploads://echoes_in_the_buffer.png`
- Destination : `public/image/EchoesInTheBuffer.png`

---

### Etape 2 : Mettre a jour le service SoundCloud Scraper

Modifier `src/services/soundcloudScraper.ts` pour ajouter les donnees mock du nouvel album dans la fonction `getMockAlbumData()` (lignes 121-185) :

```typescript
if (albumUrl.includes('echoes-in-the-buffer')) {
  return {
    title: "Echoes in the Buffer",
    artist: "Himely",
    coverImage: "/image/EchoesInTheBuffer.png",
    description: "Album de Himely - Echoes in the Buffer",
    tracks: [
      {
        title: "Buffer Overflow",
        url: "/music/background.mp3",
        duration: 180
      },
      // ... autres tracks
    ]
  };
}
```

---

### Etape 3 : Mettre a jour le service SoundCloud principal

Modifier `src/services/soundcloudService.ts` pour ajouter :

1. L'album dans `STATIC_ALBUMS` (lignes 24-35)
2. L'URL de l'album dans `ALBUM_URLS` (lignes 70-73)

---

### Etape 4 : Mettre a jour la page Music

Modifier `src/pages/MusicPage.tsx` pour ajouter :

1. L'iframe dans `albumIframes` (lignes 11-22) :
```typescript
"echoes-in-the-buffer": {
  title: "Echoes in the Buffer",
  src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2163688712&color=%23e60764&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  link: "https://soundcloud.com/himely_pup/sets/echoes-in-the-buffer"
}
```

2. L'album dans le tableau `albums` (lignes 23-48) :
```typescript
{
  id: 3,
  title: "Echoes in the Buffer",
  image: "/image/EchoesInTheBuffer.png",
  status: "available"
}
```

3. Remplacer un des placeholders "Coming Soon" par ce nouvel album disponible

---

### Resume des fichiers a modifier

| Fichier | Modification |
|---------|--------------|
| `public/image/EchoesInTheBuffer.png` | Nouveau fichier (copie de la cover) |
| `src/services/soundcloudScraper.ts` | Ajouter les donnees mock de l'album |
| `src/services/soundcloudService.ts` | Ajouter l'album statique et l'URL |
| `src/pages/MusicPage.tsx` | Ajouter l'iframe et l'album dans le carousel |

---

### Resultat attendu

- L'album "Echoes in the Buffer" apparaitra dans la section "Mes Albums" sur la page d'accueil
- L'album sera visible dans le carousel sur la page Musique
- Un bouton de selection permettra d'ecouter l'album via l'iframe SoundCloud
- La cover de l'album sera affichee correctement

