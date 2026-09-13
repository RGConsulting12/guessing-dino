import { DinoChallengeDraft } from '../models';

/** Level 1 — superstar dinosaurs (Smithsonian / AMNH public fact sheets). */
export const easyLevel1: DinoChallengeDraft[] = [
  {
    id: 'easy-trex',
    difficulty: 'easy',
    levelId: 'easy-stars',
    name: 'Tyrannosaurus rex',
    emoji: '🦖',
    description:
      'I lived about 68 million years ago. I walked on two strong legs and had a huge head with powerful jaws. My arms were very small, but my bite was one of the strongest of any land animal ever.',
    distractorNames: ['Triceratops', 'Stegosaurus', 'Brachiosaurus'],
  },
  {
    id: 'easy-triceratops',
    difficulty: 'easy',
    levelId: 'easy-stars',
    name: 'Triceratops',
    emoji: '🦏',
    description:
      'I had three horns on my face and a big bony frill behind my head. I ate plants and lived at the end of the age of dinosaurs in North America.',
    distractorNames: ['Tyrannosaurus rex', 'Stegosaurus', 'Ankylosaurus'],
  },
  {
    id: 'easy-stegosaurus',
    difficulty: 'easy',
    levelId: 'easy-stars',
    name: 'Stegosaurus',
    emoji: '🦴',
    description:
      'I had large bony plates standing up along my back and sharp spikes on my tail. I was a plant-eater from the Jurassic Period and walked on four legs.',
    distractorNames: ['Triceratops', 'Brachiosaurus', 'Ankylosaurus'],
  },
  {
    id: 'easy-brachiosaurus',
    difficulty: 'easy',
    levelId: 'easy-stars',
    name: 'Brachiosaurus',
    emoji: '🦕',
    description:
      'I was one of the tallest dinosaurs. My front legs were longer than my back legs, which helped me reach leaves high in the trees. I had a very long neck and ate plants.',
    distractorNames: ['Diplodocus', 'Stegosaurus', 'Parasaurolophus'],
  },
];

/** Level 2 — more famous plant-eaters and hunters. */
export const easyLevel2: DinoChallengeDraft[] = [
  {
    id: 'easy-velociraptor',
    difficulty: 'easy',
    levelId: 'easy-explorers',
    name: 'Velociraptor',
    emoji: '🐾',
    description:
      'I was a fast hunter about the size of a turkey, not as big as in movies. I had a sharp curved claw on each foot and belonged to the same group as modern birds.',
    distractorNames: ['Tyrannosaurus rex', 'Allosaurus', 'Deinonychus'],
  },
  {
    id: 'easy-ankylosaurus',
    difficulty: 'easy',
    levelId: 'easy-explorers',
    name: 'Ankylosaurus',
    emoji: '🛡️',
    description:
      'My body was covered in bony armor plates and my tail ended in a heavy club. I ate low plants and used my tail to defend myself from predators.',
    distractorNames: ['Stegosaurus', 'Triceratops', 'Parasaurolophus'],
  },
  {
    id: 'easy-parasaurolophus',
    difficulty: 'easy',
    levelId: 'easy-explorers',
    name: 'Parasaurolophus',
    emoji: '🎺',
    description:
      'I had a long hollow crest on top of my head that may have helped me make loud calls. I was a duck-billed plant-eater that could walk on two legs or four.',
    distractorNames: ['Iguanodon', 'Triceratops', 'Brachiosaurus'],
  },
  {
    id: 'easy-diplodocus',
    difficulty: 'easy',
    levelId: 'easy-explorers',
    name: 'Diplodocus',
    emoji: '🦒',
    description:
      'I had an extremely long neck and an even longer whip-like tail. My body was slender for my length, and I ate plants from the Jurassic Period.',
    distractorNames: ['Brachiosaurus', 'Stegosaurus', 'Apatosaurus'],
  },
];

/** Level 3 — finish easy track. */
export const easyLevel3: DinoChallengeDraft[] = [
  {
    id: 'easy-spinosaurus',
    difficulty: 'easy',
    levelId: 'easy-legends',
    name: 'Spinosaurus',
    emoji: '🌊',
    description:
      'I had a tall sail on my back made of long spines. Fossils show I often lived near water and ate fish as well as other prey. I was one of the largest meat-eating dinosaurs.',
    distractorNames: ['Tyrannosaurus rex', 'Allosaurus', 'Baryonyx'],
  },
  {
    id: 'easy-allosaurus',
    difficulty: 'easy',
    levelId: 'easy-legends',
    name: 'Allosaurus',
    emoji: '🦷',
    description:
      'I was a large Jurassic hunter with sharp teeth and strong jaws. I walked on two legs and lived millions of years before Tyrannosaurus rex.',
    distractorNames: ['Tyrannosaurus rex', 'Velociraptor', 'Spinosaurus'],
  },
  {
    id: 'easy-iguanodon',
    difficulty: 'easy',
    levelId: 'easy-legends',
    name: 'Iguanodon',
    emoji: '👍',
    description:
      'I had a spiky thumb on each hand that may have helped me grab plants or defend myself. I could walk on two legs or four and was an early famous dinosaur discovery.',
    distractorNames: ['Parasaurolophus', 'Triceratops', 'Stegosaurus'],
  },
  {
    id: 'easy-pachycephalosaurus',
    difficulty: 'easy',
    levelId: 'easy-legends',
    name: 'Pachycephalosaurus',
    emoji: '🪨',
    description:
      'I had a very thick dome of bone on top of my head. I ate plants and may have used my hard skull when pushing against others of my kind.',
    distractorNames: ['Triceratops', 'Ankylosaurus', 'Stegosaurus'],
  },
];
