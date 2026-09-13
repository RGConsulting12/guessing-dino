import { DinoChallenge, DinoChallengeDraft } from './models';

/** Static artwork paths under public/dinos/ (Wikimedia Commons, museum mounts & scientific reconstructions). */
export const DINO_IMAGE_META: Record<
  string,
  { file: string; credit: string }
> = {
  'easy-trex': {
    file: 'easy-trex.jpg',
    credit: 'T. rex mount — Field Museum / Wikimedia Commons',
  },
  'easy-triceratops': {
    file: 'easy-triceratops.jpg',
    credit: 'Triceratops skeleton — Los Angeles County Museum / Wikimedia Commons',
  },
  'easy-stegosaurus': {
    file: 'easy-stegosaurus.jpg',
    credit: 'Stegosaurus — Wikimedia Commons',
  },
  'easy-brachiosaurus': {
    file: 'easy-brachiosaurus.jpg',
    credit: 'Brachiosaurus — Wikimedia Commons',
  },
  'easy-velociraptor': {
    file: 'easy-velociraptor.jpg',
    credit: 'Velociraptor model — Wikimedia Commons',
  },
  'easy-ankylosaurus': {
    file: 'easy-ankylosaurus.jpg',
    credit: 'Ankylosaurus — Wikimedia Commons',
  },
  'easy-parasaurolophus': {
    file: 'easy-parasaurolophus.jpg',
    credit: 'Parasaurolophus — Wikimedia Commons',
  },
  'easy-diplodocus': {
    file: 'easy-diplodocus.jpg',
    credit: 'Diplodocus skeleton — Carnegie Museum / Wikimedia Commons',
  },
  'easy-spinosaurus': {
    file: 'easy-spinosaurus.jpg',
    credit: 'Spinosaurus — Wikimedia Commons',
  },
  'easy-allosaurus': {
    file: 'easy-allosaurus.jpg',
    credit: 'Allosaurus — Wikimedia Commons',
  },
  'easy-iguanodon': {
    file: 'easy-iguanodon.jpg',
    credit: 'Iguanodon — Wikimedia Commons',
  },
  'easy-pachycephalosaurus': {
    file: 'easy-pachycephalosaurus.jpg',
    credit: 'Pachycephalosaurus — Wikimedia Commons',
  },
  'medium-apatosaurus': {
    file: 'medium-apatosaurus.jpg',
    credit: 'Apatosaurus — American Museum of Natural History / Wikimedia Commons',
  },
  'medium-camarasaurus': {
    file: 'medium-camarasaurus.jpg',
    credit: 'Camarasaurus — Wikimedia Commons',
  },
  'medium-styracosaurus': {
    file: 'medium-styracosaurus.jpg',
    credit: 'Styracosaurus — Wikimedia Commons',
  },
  'medium-protoceratops': {
    file: 'medium-protoceratops.jpg',
    credit: 'Protoceratops — Wikimedia Commons',
  },
  'medium-deinonychus': {
    file: 'medium-deinonychus.jpg',
    credit: 'Deinonychus — Wikimedia Commons',
  },
  'medium-baryonyx': {
    file: 'medium-baryonyx.jpg',
    credit: 'Baryonyx — Natural History Museum, London / Wikimedia Commons',
  },
  'medium-carnotaurus': {
    file: 'medium-carnotaurus.jpg',
    credit: 'Carnotaurus — Wikimedia Commons',
  },
  'medium-giganotosaurus': {
    file: 'medium-giganotosaurus.jpg',
    credit: 'Giganotosaurus — Wikimedia Commons',
  },
  'medium-edmontosaurus': {
    file: 'medium-edmontosaurus.jpg',
    credit: 'Edmontosaurus — Wikimedia Commons',
  },
  'medium-corythosaurus': {
    file: 'medium-corythosaurus.jpg',
    credit: 'Corythosaurus — Wikimedia Commons',
  },
  'medium-therizinosaurus': {
    file: 'medium-therizinosaurus.jpg',
    credit: 'Therizinosaurus — Wikimedia Commons',
  },
  'medium-maiasaura': {
    file: 'medium-maiasaura.jpg',
    credit: 'Maiasaura — Wikimedia Commons',
  },
  'hard-utahraptor': {
    file: 'hard-utahraptor.jpg',
    credit: 'Utahraptor — Wikimedia Commons',
  },
  'hard-suchomimus': {
    file: 'hard-suchomimus.jpg',
    credit: 'Suchomimus — Wikimedia Commons',
  },
  'hard-dilophosaurus': {
    file: 'hard-dilophosaurus.jpg',
    credit: 'Dilophosaurus — Wikimedia Commons',
  },
  'hard-ceratosaurus': {
    file: 'hard-ceratosaurus.jpg',
    credit: 'Ceratosaurus — Wikimedia Commons',
  },
  'hard-archaeopteryx': {
    file: 'hard-archaeopteryx.jpg',
    credit: 'Archaeopteryx fossil — Wikimedia Commons',
  },
  'hard-microraptor': {
    file: 'hard-microraptor.jpg',
    credit: 'Microraptor — Wikimedia Commons',
  },
  'hard-compsognathus': {
    file: 'hard-compsognathus.jpg',
    credit: 'Compsognathus — Wikimedia Commons',
  },
  'hard-oviraptor': {
    file: 'hard-oviraptor.jpg',
    credit: 'Oviraptor — Wikimedia Commons',
  },
  'hard-gallimimus': {
    file: 'hard-gallimimus.jpg',
    credit: 'Gallimimus — Wikimedia Commons',
  },
  'hard-struthiomimus': {
    file: 'hard-struthiomimus.jpg',
    credit: 'Struthiomimus — Wikimedia Commons',
  },
  'hard-kentrosaurus': {
    file: 'hard-kentrosaurus.jpg',
    credit: 'Kentrosaurus — Wikimedia Commons',
  },
  'hard-pentaceratops': {
    file: 'hard-pentaceratops.jpg',
    credit: 'Pentaceratops — Wikimedia Commons',
  },
};

export function attachDinoImages(challenge: DinoChallengeDraft): DinoChallenge {
  const meta = DINO_IMAGE_META[challenge.id];
  return {
    ...challenge,
    imageUrl: meta ? `/dinos/${meta.file}` : `/dinos/placeholder.jpg`,
    imageCredit: meta?.credit ?? 'Dinosaur illustration',
  };
}
