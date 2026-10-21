# Paul Comaïta: 3D Showcase

Crée un site portfolio pour Paul Comaïta, artiste 3D spécialisé en publicité, motion graphics et animation produit.

Design général :- Palette : fond noir/gris très foncé (#0a0a0a à #1a1a1a), accents 

  blanc pur et une couleur accent (bleu cyan ou violet selon ton choix)

- Typographie : sans-serif moderne (Inter, Poppins), lignes espacées

- Espace blanc généreux, sections bien aérées

Hero (première section visible) :

- Image/élément central immersif : soit un élément 3D flottant 

  (inspiré par Quantum et Tomato), soit une animation subtile

- Titre principal : "Paul Comaïta" en gros (80-120px)

- Sous-titre : "3D Artist & Art Director | Blender, Motion & Cinematic"

- Petit CTA vers portfolio ou scroll hint animé

- Navigation sticky en haut : simple, minimaliste (Home, Work, About, Contact)

Navigation et layout global :

- Utilise la pleine largeur

- Footer simple avec réseaux sociaux

- Pas de sidebars

## Development

You need Node.js and Bun (the lockfile is `bun.lock`).

```sh
git clone https://github.com/pcomaita/ta-3d-showcase
cd ta-3d-showcase
bun install
bun run dev
```

Build the static site with `bun run build`. The output is written to `dist/client`.
