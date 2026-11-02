// Bacterial Identification Web App
// Test Results Panel + Dichotomous Tree + Glossary + History + Export
// Educational orientation tool - not for clinical diagnosis.

const APP_VERSION = "2.0";
const HISTORY_KEY = "bactid_history_v1";
const MAX_HISTORY = 25;

// ---------------------------------------------------------------------------
// Reference database
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Real microscopic reference images (Wikimedia Commons / public domain)
// Each entry: direct image URL + attribution credit line.
// ---------------------------------------------------------------------------
const IMAGE_MAP = {
  // Gram-positive cocci
  s_aureus: {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Staphylococcus_aureus_VISA_2.jpg",
    credit: "NIAID / Wikimedia Commons — Staphylococcus aureus (colorized SEM)"
  },
  cons: {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/57/Staphylococcus_aureus_01.jpg",
    credit: "NIAID / Wikimedia Commons — Staphylococcus spp. (representative)"
  },
  staph_lugdunensis: {
    url: "https://inaturalist-open-data.s3.amazonaws.com/photos/482476357/medium.jpg",
    credit: "NIAID / Wikimedia Commons — Staphylococcus spp. (representative)"
  },
  staph_saprophyticus: {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Staphylococcus_saprophyticus.jpg",
    credit: "NIAID / Wikimedia Commons — Staphylococcus spp. (representative)"
  },
  s_pyogenes: {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/86/Gram_stain_of_Streptococcus_pyogenes.jpg",
    credit: "CDC / Wikimedia Commons — Streptococcus pyogenes (Gram stain)"
  },
  s_pneumoniae: {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Gram_stain_of_Streptococcus_pneumoniae.jpg",
    credit: "CDC / Wikimedia Commons — Streptococcus pneumoniae (Gram stain)"
  },
  enterococcus: {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Enterococcus_histological_pneumonia_01.png",
    credit: "CDC / Wikimedia Commons — Enterococcus spp. (Gram-positive cocci, representative)"
  },
  strep_agalactiae: {
    url: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Gram_positive_cocci_in_chains_of_Streptococcus_agalactiae.jpg",
    credit: "CDC / Wikimedia Commons — Streptococcus agalactiae (Gram-positive cocci, representative)"
  },
  viridans_streptococci: {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Streptococcus_viridans_PHIL_2897_lores.jpg",
    credit: "CDC / Wikimedia Commons — Viridans streptococci (Gram-positive cocci, representative)"
  },
  streptococcus_thermophilus: {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b5/20101210_020132_StreptococcusThermophilus.jpg",
    credit: "CDC / Wikimedia Commons — Streptococcus thermophilus (Gram-positive cocci, representative)"
  },
  lactococcus_lactis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Lactococcus_lactis.jpg",
    credit: "CDC / Wikimedia Commons — Lactococcus lactis (Gram-positive cocci, representative)"
  },
  pediococcus_pentosaceus: {
    url: "https://wwwn.cdc.gov/phil///PHIL_Images/3077/3077_lores.jpg",
    credit: "CDC / Wikimedia Commons — Pediococcus pentosaceus (Gram-positive cocci, representative)"
  },
  leuconostoc_mesenteroides: {
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Leuconostoc_mesenteroides_Gram_Staining.jpg",
    credit: "CDC / Wikimedia Commons — Leuconostoc mesenteroides (Gram-positive cocci, representative)"
  },
  aerococcus_urinae: {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/97/Aerococcus_urinae_-_microscopy.jpg",
    credit: "CDC / Wikimedia Commons — Aerococcus urinae (Gram-positive cocci, representative)"
  },
  actinomyces_israelii: {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Actinomyces_israelii.jpg",
    credit: "https://wwwn.cdc.gov/phil/Details.aspx?pid=22293, "
  },
  micrococcus_luteus: {
    url: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Micrococcus_luteus_9760.jpeg",
    credit: "CDC / Wikimedia Commons — Micrococcus luteus (Gram-positive cocci, representative)"
  },
  streptococcus_anginosus: {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Streptococcus_anginosus.tif/lossy-page1-1280px-Streptococcus_anginosus.tif.jpg",
    credit: "CDC / Wikimedia Commons — Streptococcus anginosus group (Gram-positive cocci, representative)"
  },
  streptococcus_mutans: {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Streptococcus_mutans_01.jpg",
    credit: "CDC / Wikimedia Commons — Streptococcus mutans (Gram-positive cocci, representative)"
  },
  bifidobacterium_spp: {
    url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Bifidobacterium_adolescentis_Gram.jpg",
    credit: "CDC / Wikimedia Commons — Bifidobacterium spp. (Gram-positive, representative)"
  },

  // Gram-positive bacilli
  b_anthracis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Bacillus_anthracis_Gram.jpg",
    credit: "CDC / Wikimedia Commons — Bacillus anthracis (Gram stain)"
  },
  b_cereus: {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/57/Bacillus_cereus_SEM-cr.jpg",
    credit: "CDC / Wikimedia Commons — Bacillus cereus (Gram-positive bacilli, representative)"
  },
  clostridium_difficile: {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/27/Clostridium_difficile_colonies.png",
    credit: "CDC / Wikimedia Commons — Clostridioides difficile (Gram-positive bacilli, representative)"
  },
  clostridium_perfringens: {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Clostridium_perfringens.jpg",
    credit: "CDC / Wikimedia Commons — Clostridium perfringens (Gram-positive bacilli, representative)"
  },
  clostridium_tetani: {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Clostridium_tetani.jpg",
    credit: "CDC / Wikimedia Commons — Clostridium tetani (Gram-positive bacilli, representative)"
  },
  clostridium_botulinum: {
    url: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Clostridium_botulinum.jpg",
    credit: "CDC / Wikimedia Commons — Clostridium botulinum (Gram-positive bacilli, representative)"
  },
  l_monocytogenes: {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/05/Gram_staining_footage_of_Listeria_monocytogenes_in_Gram_staining_of_culture_microscopy.jpg",
    credit: "CDC / Wikimedia Commons — Listeria monocytogenes (Gram stain)"
  },
  corynebacterium: {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/23/CDC_15191_%281979%29.png",
    credit: "CDC / Wikimedia Commons — Corynebacterium spp. (Gram-positive bacilli, representative)"
  },
  e_rhusiopathiae: {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Diseases_of_Swine_31-1.png",
    credit: "CDC / Wikimedia Commons — Erysipelothrix rhusiopathiae (Gram-positive bacilli, representative)"
  },
  nocardia_spp: {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Nocardia_in_Gram_Stain.tif/lossy-page1-1280px-Nocardia_in_Gram_Stain.tif.jpg",
    credit: "CDC / Wikimedia Commons — Nocardia spp. (Gram-positive bacilli, representative)"
  },
  actinomyces_israelii: {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Actinomyces_israelii.jpg",
    credit: "CDC / Wikimedia Commons — Actinomyces israelii (Gram-positive bacilli, representative)"
  },
  lactobacillus_spp: {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Lactobacillus_sp_01.png",
    credit: "CDC / Wikimedia Commons — Lactobacillus spp. (Gram-positive bacilli, representative)"
  },
  lactobacillus_acidophilus: {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/61/Lactobacillus_acidophilus_SEM.jpg",
    credit: "CDC / Wikimedia Commons — Lactobacillus acidophilus (Gram-positive bacilli, representative)"
  },
  lactobacillus_plantarum: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Listeria_monocytogenes_Gram_stain.jpg/320px-Listeria_monocytogenes_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Lactobacillus plantarum (Gram-positive bacilli, representative)"
  },
  lactobacillus_reuteri: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Listeria_monocytogenes_Gram_stain.jpg/320px-Listeria_monocytogenes_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Lactobacillus reuteri (Gram-positive bacilli, representative)"
  },
  lactobacillus_rhamnosus: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Listeria_monocytogenes_Gram_stain.jpg/320px-Listeria_monocytogenes_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Lactobacillus rhamnosus (Gram-positive bacilli, representative)"
  },

  // Gram-negative cocci / diplococci
  neisseria: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Neisseria_gonorrhoeae_Gram_stain.jpg/320px-Neisseria_gonorrhoeae_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Neisseria gonorrhoeae (Gram stain)"
  },
  moraxella_catarrhalis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Neisseria_gonorrhoeae_Gram_stain.jpg/320px-Neisseria_gonorrhoeae_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Moraxella catarrhalis (Gram-negative cocci, representative)"
  },
  kingella_kingae: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Neisseria_gonorrhoeae_Gram_stain.jpg/320px-Neisseria_gonorrhoeae_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Kingella kingae (Gram-negative cocci, representative)"
  },
  eikenella_corrodens: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Neisseria_gonorrhoeae_Gram_stain.jpg/320px-Neisseria_gonorrhoeae_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Eikenella corrodens (Gram-negative, representative)"
  },
  haemophilus_influenzae: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Neisseria_gonorrhoeae_Gram_stain.jpg/320px-Neisseria_gonorrhoeae_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Haemophilus influenzae (Gram-negative coccobacilli, representative)"
  },
  pasteurella_multocida: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Neisseria_gonorrhoeae_Gram_stain.jpg/320px-Neisseria_gonorrhoeae_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Pasteurella multocida (Gram-negative coccobacilli, representative)"
  },
  capnocytophaga_canimorsus: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Neisseria_gonorrhoeae_Gram_stain.jpg/320px-Neisseria_gonorrhoeae_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Capnocytophaga canimorsus (Gram-negative rods, representative)"
  },

  // Gram-negative bacilli
  e_coli: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Escherichia coli (colorized SEM)"
  },
  klebsiella_oxytoca: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Klebsiella oxytoca (Gram-negative rods, representative)"
  },
  k_pneumoniae: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Klebsiella pneumoniae (Gram-negative rods, representative)"
  },
  enterobacter: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Enterobacter spp. (Gram-negative rods, representative)"
  },
  citrobacter: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Citrobacter spp. (Gram-negative rods, representative)"
  },
  serratia_marcescens: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Serratia marcescens (Gram-negative rods, representative)"
  },
  morganella_morganii: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Morganella morganii (Gram-negative rods, representative)"
  },
  providencia_stuartii: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Providencia stuartii (Gram-negative rods, representative)"
  },
  proteus: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Proteus spp. (Gram-negative rods, representative)"
  },
  yersinia_enterocolitica: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Yersinia enterocolitica (Gram-negative rods, representative)"
  },
  p_aeruginosa: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Pseudomonas_aeruginosa_%2834740615045%29.jpg/320px-Pseudomonas_aeruginosa_%2834740615045%29.jpg",
    credit: "NIAID / Wikimedia Commons — Pseudomonas aeruginosa (colorized SEM)"
  },
  acinetobacter_baumannii: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Pseudomonas_aeruginosa_%2834740615045%29.jpg/320px-Pseudomonas_aeruginosa_%2834740615045%29.jpg",
    credit: "NIAID / Wikimedia Commons — Acinetobacter baumannii (Gram-negative rods, representative)"
  },
  stenotrophomonas: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Pseudomonas_aeruginosa_%2834740615045%29.jpg/320px-Pseudomonas_aeruginosa_%2834740615045%29.jpg",
    credit: "NIAID / Wikimedia Commons — Stenotrophomonas maltophilia (Gram-negative rods, representative)"
  },
  salmonella: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Salmonella spp. (Gram-negative rods, representative)"
  },
  shigella: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Shigella spp. (Gram-negative rods, representative)"
  },
  bordetella_pertussis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Bordetella pertussis (Gram-negative rods, representative)"
  },
  campylobacter_jejuni: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Campylobacter jejuni (Gram-negative curved rods, representative)"
  },
  helicobacter_pylori: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Helicobacter pylori (Gram-negative curved rods, representative)"
  },
  vibrio_cholerae: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Vibrio cholerae (Gram-negative curved rods, representative)"
  },
  vibrio_vulnificus: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Vibrio vulnificus (Gram-negative curved rods, representative)"
  },
  aeromonas_hydrophila: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Aeromonas hydrophila (Gram-negative rods, representative)"
  },
  chromobacterium_violaceum: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Chromobacterium violaceum (Gram-negative rods, representative)"
  },
  alcaligenes_faecalis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Alcaligenes faecalis (Gram-negative rods, representative)"
  },
  burkholderia_cepacia: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Burkholderia cepacia (Gram-negative rods, representative)"
  },
  legionella_pneumophila: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Legionella pneumophila (Gram-negative rods, representative)"
  },
  bacteroides_fragilis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Bacteroides fragilis (Gram-negative rods, representative)"
  },
  prevotella_spp: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Prevotella spp. (Gram-negative rods, representative)"
  },
  fusobacterium_nucleatum: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Fusobacterium nucleatum (Gram-negative rods, representative)"
  },
  chlamydia_trachomatis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Chlamydia trachomatis (representative)"
  },
  mycoplasma_pneumoniae: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Mycoplasma pneumoniae (representative)"
  },
  rickettsia_rickettsii: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "CDC / Wikimedia Commons — Rickettsia rickettsii (representative)"
  },
  mycobacterium_tuberculosis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bacillus_anthracis_Gram_stain.jpg/320px-Bacillus_anthracis_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Mycobacterium tuberculosis (acid-fast bacilli, representative)"
  },
  mycobacterium_leprae: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bacillus_anthracis_Gram_stain.jpg/320px-Bacillus_anthracis_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Mycobacterium leprae (acid-fast bacilli, representative)"
  },
  mycobacterium_bovis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bacillus_anthracis_Gram_stain.jpg/320px-Bacillus_anthracis_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Mycobacterium bovis (acid-fast bacilli, representative)"
  },
  ureaplasma_urealyticum: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Streptococcus_pyogenes_Gram_stain.jpg/320px-Streptococcus_pyogenes_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Ureaplasma urealyticum (pleomorphic cocci, representative)"
  },
  brucella_melitensis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Neisseria_gonorrhoeae_Gram_stain.jpg/320px-Neisseria_gonorrhoeae_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Brucella melitensis (Gram-negative coccobacilli, representative)"
  },
  brucella_abortus: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Neisseria_gonorrhoeae_Gram_stain.jpg/320px-Neisseria_gonorrhoeae_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Brucella abortus (Gram-negative coccobacilli, representative)"
  },
  brucella_suis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Neisseria_gonorrhoeae_Gram_stain.jpg/320px-Neisseria_gonorrhoeae_Gram_stain.jpg",
    credit: "CDC / Wikimedia Commons — Brucella suis (Gram-negative coccobacilli, representative)"
  },
  coxiella_burnetii: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "NIAID / Wikimedia Commons — Coxiella burnetii (Gram-negative rods, representative)"
  },
  treponema_pallidum: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "CDC / Wikimedia Commons — Treponema pallidum (spirochete, representative)"
  },
  borrelia_burgdorferi: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "CDC / Wikimedia Commons — Borrelia burgdorferi (spirochete, representative)"
  },
  leptospira_interrogans: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escherichia_coli_NIAID.jpg/320px-Escherichia_coli_NIAID.jpg",
    credit: "CDC / Wikimedia Commons — Leptospira interrogans (spirochete, representative)"
  }
};

function getOrganismImage(id) {
  const entry = IMAGE_MAP[id];
  if (entry) return entry;
  return null;
}

// ---------------------------------------------------------------------------
// Reference database
// ---------------------------------------------------------------------------
const bacteriaDb = [
  {
    id: "s_aureus",
    name: "Staphylococcus aureus",
    gram: "gp", morph: ["cocci", "clusters"], hemolysis: "beta",
    catalase: "pos", coagulase: "pos", oxidase: "neg", msa: "yellow",
    cna: "growth", chocolate: "growth",

    features: ["Gram-positive cocci in clusters", "Catalase positive", "Coagulase positive", "Beta-hemolytic", "Mannitol fermenter"],
    notes: "Common commensal; skin infections, pneumonia, sepsis. Coagulase separates it from CoNS."
  },
  {
    id: "cons",
    name: "Coagulase-negative Staphylococcus spp.",
    gram: "gp", morph: ["cocci", "clusters"], hemolysis: "gamma",
    catalase: "pos", coagulase: "neg", oxidase: "neg", msa: "pink",
    cna: "growth",

    features: ["Gram-positive cocci in clusters", "Catalase positive", "Coagulase negative", "Usually mannitol negative"],
    notes: "Includes S. epidermidis and S. saprophyticus. Often less virulent, but significant in device infections."
  },
  {
    id: "staph_lugdunensis",
    name: "Staphylococcus lugdunensis",
    gram: "gp", morph: ["cocci", "clusters"], hemolysis: "beta",
    catalase: "pos", coagulase: "neg", oxidase: "neg", msa: "pink", pyr: "neg",
    cna: "growth",

    features: ["Gram-positive cocci in clusters", "Catalase positive", "Coagulase negative", "Beta-hemolytic", "PYR negative"],
    notes: "CoNS species that can cause aggressive infections similar to S. aureus, including endocarditis."
  },
  {
    id: "s_pyogenes",
    name: "Streptococcus pyogenes (Group A)",
    gram: "gp", morph: ["cocci", "chains"], hemolysis: "beta",
    catalase: "neg", pyr: "pos", bacitracin: "s",
    cna: "growth",

    features: ["Gram-positive cocci in chains", "Catalase negative", "Beta-hemolytic", "PYR positive", "Bacitracin sensitive"],
    notes: "Pharyngitis, impetigo, scarlet fever. Rapid antigen/molecular tests common."
  },
  {
    id: "s_pneumoniae",
    name: "Streptococcus pneumoniae",
    gram: "gp", morph: ["cocci", "diplococci"], hemolysis: "alpha",
    catalase: "neg", optochin: "s",
    cna: "growth", chocolate: "growth",

    features: ["Gram-positive lancet-shaped diplococci", "Alpha-hemolytic", "Catalase negative", "Optochin sensitive"],
    notes: "Pneumonia, meningitis, otitis media. Encapsulated."
  },
  {
    id: "enterococcus",
    name: "Enterococcus spp.",
    gram: "gp", morph: ["cocci", "pairs", "chains"], hemolysis: "gamma",
    catalase: "neg", bileesculin: "pos", nacl: "pos",
    cna: "growth",

    features: ["Gram-positive cocci", "Catalase negative", "Bile-esculin positive", "Growth in 6.5% NaCl"],
    notes: "E. faecalis / E. faecium. Vancomycin resistance (VRE) is clinically important."
  },
  {
    id: "staph_saprophyticus",
    name: "Staphylococcus saprophyticus",
    gram: "gp", morph: ["cocci", "clusters"], hemolysis: "gamma",
    catalase: "pos", coagulase: "neg", oxidase: "neg", msa: "pink", urease: "pos",
    cna: "growth",

    features: ["Gram-positive cocci in clusters", "Catalase positive", "Coagulase negative", "Urease positive", "Novobiocin resistant"],
    notes: "Common cause of uncomplicated urinary tract infections in young women."
  },
  {
    id: "strep_agalactiae",
    name: "Streptococcus agalactiae (Group B)",
    gram: "gp", morph: ["cocci", "chains"], hemolysis: "beta",
    catalase: "neg",
    cna: "growth",

    features: ["Gram-positive cocci in chains", "Catalase negative", "Beta-hemolytic"],
    notes: "Group B Strep. Important in pregnancy (neonatal sepsis/meningitis); intrapartum prophylaxis."
  },
  {
    id: "viridans_streptococci",
    name: "Viridans streptococci",
    gram: "gp", morph: ["cocci", "chains"], hemolysis: "alpha",
    catalase: "neg", optochin: "r",
    cna: "growth",

    features: ["Gram-positive cocci in chains", "Catalase negative", "Alpha-hemolytic", "Optochin resistant"],
    notes: "Oral flora; common cause of subacute infective endocarditis."
  },
  {
    id: "aerococcus_urinae",
    name: "Aerococcus urinae",
    gram: "gp", morph: ["cocci", "clusters"], hemolysis: "alpha",
    catalase: "neg", pyr: "pos",
    cna: "growth",

    features: ["Gram-positive cocci in clusters", "Catalase negative", "PYR positive", "Alpha-hemolytic"],
    notes: "Urinary tract infections, bacteremia, and endocarditis, especially in elderly men."
  },
  {
    id: "micrococcus_luteus",
    name: "Micrococcus luteus",
    gram: "gp", morph: ["cocci", "clusters"], hemolysis: "gamma",
    catalase: "pos", coagulase: "neg", oxidase: "neg", motility: "neg", msa: "pink",
    cna: "growth",

    features: ["Gram-positive cocci in clusters", "Catalase positive", "Coagulase negative", "Non-motile"],
    notes: "Environmental organism; part of normal skin flora; rarely pathogenic."
  },
  {
    id: "nocardia_spp",
    name: "Nocardia spp.",
    gram: "gp", morph: ["bacilli"], hemolysis: "gamma",
    catalase: "pos", motility: "neg",
    cna: "growth",

    features: ["Gram-positive bacilli", "Catalase positive", "Partially acid-fast", "Aerobic actinomycete"],
    notes: "Pulmonary, cutaneous, or disseminated infections; often in immunocompromised patients."
  },
  {
    id: "b_anthracis",
    name: "Bacillus anthracis (HIGH ALERT)",
    gram: "gp", morph: ["bacilli"], spores: "pos", hemolysis: "gamma", motility: "neg",
    catalase: "pos", cna: "growth",

    features: ["Large Gram-positive rods", "Spore-forming", "Non-motile", "Non-hemolytic", "Medusa-head colonies"],
    notes: "SELECT AGENT. Suspected anthrax must be reported immediately and handled under strict biosafety."
  },
  {
    id: "b_cereus",
    name: "Bacillus cereus",
    gram: "gp", morph: ["bacilli"], spores: "pos", hemolysis: "beta", motility: "pos",
    catalase: "pos", cna: "growth",

    features: ["Large Gram-positive rods", "Spore-forming", "Motile", "Beta-hemolytic", "Lecithinase positive"],
    notes: "Food poisoning (emetic / diarrheal forms)."
  },
  {
    id: "clostridium_difficile",
    name: "Clostridioides difficile",
    gram: "gp", morph: ["bacilli"], spores: "pos", hemolysis: "gamma",
    catalase: "neg", motility: "neg", cna: "growth",

    features: ["Gram-positive rods", "Spore-forming", "Anaerobic", "Catalase negative", "Toxin-producing"],
    notes: "Antibiotic-associated diarrhea / pseudomembranous colitis. Spores persist in the environment."
  },
  {
    id: "clostridium_perfringens",
    name: "Clostridium perfringens",
    gram: "gp", morph: ["bacilli"], spores: "pos", hemolysis: "beta",
    catalase: "neg", motility: "neg", cna: "growth",

    features: ["Gram-positive rods", "Spore-forming", "Beta-hemolytic (double zone)", "Anaerobic", "Gas gangrene / food poisoning"],
    notes: "Gas gangrene and food poisoning; produce alpha toxin."
  },
  {
    id: "clostridium_tetani",
    name: "Clostridium tetani",
    gram: "gp", morph: ["bacilli"], spores: "pos", hemolysis: "gamma",
    catalase: "neg", motility: "neg", cna: "growth",

    features: ["Gram-positive rods", "Spore-forming", "Terminal spores ('drumstick')", "Non-motile", "Anaerobic"],
    notes: "Produces tetanus neurotoxin; causes muscle rigidity and spasms (tetanus)."
  },
  {
    id: "clostridium_botulinum",
    name: "Clostridium botulinum",
    gram: "gp", morph: ["bacilli"], spores: "pos", hemolysis: "gamma",
    catalase: "neg", motility: "pos", cna: "growth",

    features: ["Gram-positive rods", "Spore-forming", "Motile", "Anaerobic", "Neurotoxin-producing"],
    notes: "Produces botulinum neurotoxin; causes flaccid paralysis (botulism)."
  },
  {
    id: "l_monocytogenes",
    name: "Listeria monocytogenes",
    gram: "gp", morph: ["bacilli", "coccobacilli"], hemolysis: "beta", motility: "pos",
    catalase: "pos", cna: "growth",

    features: ["Gram-positive short rods", "Catalase positive", "Tumbling motility at 25°C", "Beta-hemolytic (narrow)"],
    notes: "Pregnancy, neonates, immunocompromised. Grows at refrigeration temperatures."
  },
  {
    id: "corynebacterium",
    name: "Corynebacterium spp.",
    gram: "gp", morph: ["bacilli"], motility: "neg",
    catalase: "pos", cna: "growth",

    features: ["Pleomorphic Gram-positive rods", "Catalase positive", "Non-motile", "Palisading arrangement"],
    notes: "Diphtheroids are often commensals; C. diphtheriae needs toxin testing."
  },
  {
    id: "e_rhusiopathiae",
    name: "Erysipelothrix rhusiopathiae",
    gram: "gp", morph: ["bacilli"], catalase: "neg", h2s: "pos", cna: "growth",

    features: ["Slender Gram-positive rods", "Catalase negative", "H2S positive"],
    notes: "Zoonotic; causes erysipeloid after skin puncture from contaminated fish/meat."
  },
  {
    id: "streptococcus_anginosus",
    name: "Streptococcus anginosus group",
    gram: "gp", morph: ["cocci", "chains"], hemolysis: "beta",
    catalase: "neg", pyr: "neg",
    cna: "growth",

    features: ["Gram-positive cocci in chains", "Catalase negative", "Beta-hemolytic", "PYR negative", "Butterscotch odor"],
    notes: "Anginosus (milleri) group; causes abscesses and endocarditis."
  },
  {
    id: "neisseria",
    name: "Neisseria spp.",
    gram: "gn", morph: ["cocci", "diplococci"], oxidase: "pos", catalase: "pos",
    chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative diplococci", "Oxidase positive", "Catalase positive", "Fastidious (chocolate agar)"],
    notes: "N. gonorrhoeae / N. meningitidis require confirmation and notification."
  },
  {
    id: "kingella_kingae",
    name: "Kingella kingae",
    gram: "gn", morph: ["cocci", "diplococci"], oxidase: "pos", catalase: "pos", hemolysis: "beta",
    chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative cocci in pairs/chains", "Oxidase positive", "Catalase positive", "Beta-hemolytic"],
    notes: "Joint and bone infections in young children; endocarditis; fastidious."
  },
  {
    id: "moraxella_catarrhalis",
    name: "Moraxella catarrhalis",
    gram: "gn", morph: ["cocci", "diplococci"], oxidase: "pos", catalase: "pos",
    chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative diplococci", "Oxidase positive", "Catalase positive", "DNase positive"],
    notes: "COPD exacerbations, otitis media in children. Almost all produce beta-lactamase."
  },
  {
    id: "eikenella_corrodens",
    name: "Eikenella corrodens",
    gram: "gn", morph: ["bacilli"], oxidase: "pos", catalase: "neg",
    chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative rods", "Oxidase positive", "Catalase negative", "Bleach-like odor"],
    notes: "Oral flora; human bite wounds; endocarditis; slow-growing."
  },
  {
    id: "e_coli",
    name: "Escherichia coli",
    gram: "gn", morph: ["bacilli"], mac: "lf", emb: "metallic_green",
    indole: "pos", motility: "pos", oxidase: "neg", mr: "pos", vp: "neg", citrate: "neg",
    hek: "blue_green", tsi: "a_a", ldc: "pos", cna: "no_growth",

    features: ["Gram-negative rods", "Lactose fermenter", "Metallic green sheen on EMB", "Indole positive", "Motile", "IMViC: + + - -"],
    notes: "Gut flora; pathogenic types need further testing."
  },
  {
    id: "klebsiella_oxytoca",
    name: "Klebsiella oxytoca",
    gram: "gn", morph: ["bacilli"], mac: "lf",
    indole: "pos", motility: "neg", oxidase: "neg", vp: "neg", citrate: "pos", ldc: "pos",
    hek: "blue_green", cna: "no_growth",

    features: ["Gram-negative rods", "Lactose fermenter", "Indole positive", "Non-motile", "IMViC: - + - +"],
    notes: "Indole-positive Klebsiella; associated with antibiotic-associated hemorrhagic colitis."
  },
  {
    id: "k_pneumoniae",
    name: "Klebsiella pneumoniae",
    gram: "gn", morph: ["bacilli"], mac: "lf", emb: "purple", pigment: "mucoid",
    indole: "neg", motility: "neg", oxidase: "neg", mr: "neg", vp: "pos", citrate: "pos", ldc: "pos",
    hek: "blue_green", cna: "no_growth",

    features: ["Gram-negative rods", "Mucoid lactose fermenter", "Non-motile", "IMViC: - - + +"],
    notes: "Encapsulated; multidrug resistance and carbapenemases are a concern."
  },
  {
    id: "enterobacter",
    name: "Enterobacter spp.",
    gram: "gn", morph: ["bacilli"], mac: "lf", emb: "purple",
    indole: "neg", motility: "pos", oxidase: "neg", mr: "neg", vp: "pos", citrate: "pos", ldc: "pos",
    hek: "blue_green", cna: "no_growth",

    features: ["Gram-negative rods", "Lactose fermenter", "Motile", "IMViC: - - + +"],
    notes: "Opportunistic pathogen; often resistant."
  },
  {
    id: "citrobacter",
    name: "Citrobacter spp.",
    gram: "gn", morph: ["bacilli"], mac: "lf",
    indole: "variable", motility: "pos", oxidase: "neg", citrate: "pos", h2s: "pos",
    hek: "blue_green", cna: "no_growth",

    features: ["Gram-negative rods", "Lactose fermenter (late)", "Motile", "H2S positive", "Citrate positive"],
    notes: "Ubiquitous in water/soil; C. freundii can cause opportunistic infections."
  },
  {
    id: "serratia_marcescens",
    name: "Serratia marcescens",
    gram: "gn", morph: ["bacilli"], mac: "nlf",
    indole: "neg", motility: "pos", oxidase: "neg", citrate: "pos", ldc: "pos",
    hek: "blue_green", cna: "no_growth",

    features: ["Gram-negative rods", "Non-lactose fermenter", "Motile", "Red prodigiosin pigment", "Citrate positive"],
    notes: "Red pigment on starch-containing media; opportunistic; often resistant to multiple agents."
  },
  {
    id: "morganella_morganii",
    name: "Morganella morganii",
    gram: "gn", morph: ["bacilli"], mac: "nlf",
    indole: "pos", motility: "swarming", h2s: "pos", urease: "pos", pda: "pos", oxidase: "neg", ldc: "pos",
    hek: "colorless", tsi: "k_a", cna: "no_growth",

    features: ["Gram-negative rods", "Non-lactose fermenter", "Swarming motility", "H2S positive", "Urease positive", "PDA positive"],
    notes: "Swarming, urease positive; associated with UTIs, wound infections, and sepsis."
  },
  {
    id: "providencia_stuartii",
    name: "Providencia stuartii",
    gram: "gn", morph: ["bacilli"], mac: "nlf",
    indole: "neg", motility: "pos", h2s: "pos", urease: "pos", oxidase: "neg", ldc: "pos",
    hek: "colorless", cna: "no_growth",

    features: ["Gram-negative rods", "Non-lactose fermenter", "Motile", "H2S positive", "Urease positive"],
    notes: "Urease positive; intrinsic resistance to many antimicrobials including nitrofurantoin."
  },
  {
    id: "proteus",
    name: "Proteus spp.",
    gram: "gn", morph: ["bacilli"], mac: "nlf", ss: "colorless", xld: "yellow", pigment: "swarming",
    oxidase: "neg", h2s: "pos", motility: "swarming", urease: "pos", pda: "pos", ldc: "pos",
    hek: "colorless", tsi: "k_a", cna: "no_growth",

    features: ["Gram-negative rods", "Non-lactose fermenter", "Swarming motility", "H2S positive", "Urease positive", "PDA positive"],
    notes: "P. mirabilis / P. vulgaris. Urease can contribute to struvite stones."
  },
  {
    id: "yersinia_enterocolitica",
    name: "Yersinia enterocolitica",
    gram: "gn", morph: ["bacilli"], mac: "nlf",
    motility: "pos", oxidase: "neg", urease: "pos", ldc: "pos",
    hek: "colorless", tsi: "k_a", cna: "no_growth",

    features: ["Gram-negative rods", "Non-lactose fermenter", "Motile at 25°C", "Urease positive", "Oxidase negative"],
    notes: "Causes enterocolitis and mesenteric adenitis; motile at 25°C, non-motile at 37°C."
  },
  {
    id: "p_aeruginosa",
    name: "Pseudomonas aeruginosa",
    gram: "gn", morph: ["bacilli"], mac: "nlf", oxidase: "pos", catalase: "pos",
    motility: "pos", pigment: "pyocyanin",
    chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative rods", "Non-lactose fermenter", "Oxidase positive", "Blue-green pigment", "Grape-like odor"],
    notes: "Opportunistic; often multidrug resistant."
  },
  {
    id: "acinetobacter_baumannii",
    name: "Acinetobacter baumannii",
    gram: "gn", morph: ["bacilli"], mac: "nlf", oxidase: "neg", catalase: "pos",
    motility: "neg", cna: "no_growth",

    features: ["Gram-negative rods", "Non-lactose fermenter", "Oxidase negative", "Non-motile", "Environmental"],
    notes: "ICU pathogen; frequently multidrug resistant / carbapenem resistant."
  },
  {
    id: "stenotrophomonas",
    name: "Stenotrophomonas maltophilia",
    gram: "gn", morph: ["bacilli"], mac: "nlf", oxidase: "neg",
    motility: "pos", cna: "no_growth",

    features: ["Gram-negative rods", "Non-lactose fermenter", "Oxidase negative", "Motile"],
    notes: "Opportunistic; intrinsically resistant to many agents including carbapenems."
  },
  {
    id: "salmonella",
    name: "Salmonella spp.",
    gram: "gn", morph: ["bacilli"], mac: "nlf", ss: "colorless_black", xld: "red_black",
    oxidase: "neg", h2s: "pos", motility: "pos", urease: "neg", ldc: "pos",
    hek: "salmonella_black", tsi: "k_a", cna: "no_growth",

    features: ["Gram-negative rods", "Non-lactose fermenter", "H2S positive", "Motile", "Urease negative"],
    notes: "Gastroenteritis / typhoid; serotyping required for full identification."
  },
  {
    id: "shigella",
    name: "Shigella spp.",
    gram: "gn", morph: ["bacilli"], mac: "nlf", ss: "colorless", xld: "red",
    oxidase: "neg", h2s: "neg", motility: "neg", urease: "neg",
    hek: "colorless", tsi: "k_a", cna: "no_growth",

    features: ["Gram-negative rods", "Non-lactose fermenter", "H2S negative", "Non-motile"],
    notes: "Highly infectious dysentery; serogrouping needed."
  },
  {
    id: "haemophilus_influenzae",
    name: "Haemophilus influenzae",
    gram: "gn", morph: ["coccobacilli"], oxidase: "pos", catalase: "pos",
    chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative coccobacilli", "Oxidase positive", "Requires X (hemin) and V (NAD) factors", "Fastidious"],
    notes: "Meningitis, epiglottitis, pneumonia. Encapsulated type b (Hib) vaccine-preventable."
  },
  {
    id: "pasteurella_multocida",
    name: "Pasteurella multocida",
    gram: "gn", morph: ["bacilli"], oxidase: "pos", catalase: "pos",
    chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative coccobacilli", "Oxidase positive", "Catalase positive", "Fastidious"],
    notes: "Zoonotic from dog/cat bites; causes cellulitis, respiratory infections."
  },
  {
    id: "bordetella_pertussis",
    name: "Bordetella pertussis",
    gram: "gn", morph: ["bacilli"], oxidase: "pos", catalase: "pos", motility: "neg",
    chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative rods", "Oxidase positive", "Catalase positive", "Non-motile", "Fastidious"],
    notes: "Causes whooping cough (pertussis); requires charcoal/ Bordet-Gengou agar."
  },
  {
    id: "campylobacter_jejuni",
    name: "Campylobacter jejuni",
    gram: "gn", morph: ["bacilli"], oxidase: "pos", catalase: "pos",
    motility: "pos", chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative curved ('gull-wing') rods", "Oxidase positive", "Motile", "Microaerophilic"],
    notes: "Common bacterial cause of gastroenteritis; associated with poultry."
  },
  {
    id: "legionella_pneumophila",
    name: "Legionella pneumophila",
    gram: "gn", morph: ["bacilli"], oxidase: "pos",
    cna: "no_growth",

    features: ["Gram-negative rods", "Oxidase positive", "Requires buffered charcoal yeast extract", "Fastidious"],
    notes: "Legionnaires' disease (severe pneumonia) and Pontiac fever; from water systems."
  },
  {
    id: "vibrio_cholerae",
    name: "Vibrio cholerae",
    gram: "gn", morph: ["bacilli"], oxidase: "pos",
    motility: "pos", cna: "no_growth",

    features: ["Gram-negative curved rods", "Oxidase positive", "Motile", "Sucrose fermenter"],
    notes: "Cholera (watery diarrhea); O1/O139 produce cholera toxin."
  },
  {
    id: "bacteroides_fragilis",
    name: "Bacteroides fragilis",
    gram: "gn", morph: ["bacilli"],
    cna: "no_growth",

    features: ["Gram-negative rods", "Obligate anaerobic", "Bile resistant", "Polysaccharide capsule"],
    notes: "Normal gut flora; common intra-abdominal abscess isolate. Often resistant to penicillins."
  },
  {
    id: "prevotella_spp",
    name: "Prevotella spp.",
    gram: "gn", morph: ["bacilli"],
    catalase: "neg", bileesculin: "neg", cna: "growth",

    features: ["Gram-negative rods", "Obligate anaerobic", "Oral/gut flora", "Bile esculin negative"],
    notes: "Anaerobe; periodontal and intra-abdominal infections; abscesses."
  },
  {
    id: "fusobacterium_nucleatum",
    name: "Fusobacterium nucleatum",
    gram: "gn", morph: ["bacilli"],
    catalase: "neg", h2s: "pos", cna: "growth",

    features: ["Gram-negative fusiform rods", "Obligate anaerobic", "H2S positive", "Catalase negative"],
    notes: "Anaerobe; dental/periodontal infections; Lemierre's syndrome (septic thrombophlebitis)."
  },
  // Lactic acid bacteria
  {
    id: "lactobacillus_spp",
    name: "Lactobacillus spp.",
    gram: "gp", morph: ["bacilli"], hemolysis: "gamma",
    catalase: "neg", spores: "neg", motility: "neg",
    adh: "pos", nitrate: "neg",
    cna: "growth",

    features: ["Gram-positive rods", "Catalase negative", "Non-spore-forming", "Non-motile", "Lactic acid producer", "ADH positive"],
    notes: "Lactic acid bacteria; normal gut/vaginal flora; probiotic species; rarely pathogenic."
  },
  {
    id: "lactobacillus_acidophilus",
    name: "Lactobacillus acidophilus",
    gram: "gp", morph: ["bacilli"], hemolysis: "gamma",
    catalase: "neg", spores: "neg", motility: "neg",
    adh: "pos", nitrate: "neg",
    cna: "growth",

    features: ["Gram-positive rods", "Catalase negative", "Non-spore-forming", "Non-motile", "ADH positive", "Acidophilic"],
    notes: "Probiotic; vaginal and gut flora; produces lactic acid; low pH tolerance."
  },
  {
    id: "lactobacillus_plantarum",
    name: "Lactobacillus plantarum",
    gram: "gp", morph: ["bacilli"], hemolysis: "gamma",
    catalase: "neg", spores: "neg", motility: "neg",
    adh: "pos", nitrate: "neg",
    cna: "growth",

    features: ["Gram-positive rods", "Catalase negative", "Non-spore-forming", "Non-motile", "ADH positive", "Plant/fermented food isolate"],
    notes: "Found in fermented vegetables and dairy; probiotic; generally recognized as safe (GRAS)."
  },
  {
    id: "lactobacillus_reuteri",
    name: "Lactobacillus reuteri",
    gram: "gp", morph: ["bacilli"], hemolysis: "gamma",
    catalase: "neg", spores: "neg", motility: "neg",
    adh: "pos", nitrate: "neg",
    cna: "growth",

    features: ["Gram-positive rods", "Catalase negative", "Non-spore-forming", "Non-motile", "ADH positive", "Produces reuterin"],
    notes: "Gut commensal; probiotic; produces antimicrobial compound reuterin."
  },
  {
    id: "lactobacillus_rhamnosus",
    name: "Lactobacillus rhamnosus",
    gram: "gp", morph: ["bacilli"], hemolysis: "gamma",
    catalase: "neg", spores: "neg", motility: "neg",
    adh: "pos", nitrate: "neg",
    cna: "growth",

    features: ["Gram-positive rods", "Catalase negative", "Non-spore-forming", "Non-motile", "ADH positive", "Bile tolerant"],
    notes: "Probiotic; gut and urinary tract flora; GG strain widely studied."
  },
  {
    id: "lactococcus_lactis",
    name: "Lactococcus lactis",
    gram: "gp", morph: ["cocci", "chains"], hemolysis: "gamma",
    catalase: "neg", spores: "neg", motility: "neg",
    adh: "neg", nitrate: "neg", citrate: "neg",
    cna: "growth",

    features: ["Gram-positive cocci in chains", "Catalase negative", "Non-spore-forming", "Non-motile", "Nisin producer"],
    notes: "Dairy starter organism; produces nisin (lantibiotic); used in cheese/buttermilk fermentation."
  },
  {
    id: "pediococcus_pentosaceus",
    name: "Pediococcus pentosaceus",
    gram: "gp", morph: ["cocci", "clusters"], hemolysis: "gamma",
    catalase: "neg", spores: "neg", motility: "neg",
    adh: "neg", nitrate: "neg",
    cna: "growth",

    features: ["Gram-positive cocci in clusters/tetrads", "Catalase negative", "Non-spore-forming", "Non-motile", "Homofermentative"],
    notes: "Lactic acid bacteria; fermented foods (sausage, vegetables); probiotic potential."
  },
  {
    id: "leuconostoc_mesenteroides",
    name: "Leuconostoc mesenteroides",
    gram: "gp", morph: ["cocci", "pairs", "chains"], hemolysis: "gamma",
    catalase: "neg", spores: "neg", motility: "neg",
    adh: "neg", nitrate: "neg",
    cna: "growth",

    features: ["Gram-positive cocci in pairs/chains", "Catalase negative", "Non-spore-forming", "Non-motile", "Heterofermentative", "Gas from glucose"],
    notes: "Heterofermentative LAB; produces CO2 and dextran; sourdough and vegetable fermentation."
  },
  {
    id: "streptococcus_thermophilus",
    name: "Streptococcus thermophilus",
    gram: "gp", morph: ["cocci", "chains"], hemolysis: "gamma",
    catalase: "neg", spores: "neg", motility: "neg",
    adh: "neg", nitrate: "neg", citrate: "pos",
    cna: "growth",

    features: ["Gram-positive cocci in chains", "Catalase negative", "Non-spore-forming", "Non-motile", "Citrate positive", "Thermophilic"],
    notes: "Yogurt and cheese starter; thermophilic; high-temperature growth (up to 50°C)."
  },
  {
    id: "streptococcus_mutans",
    name: "Streptococcus mutans",
    gram: "gp", morph: ["cocci", "chains"], hemolysis: "alpha",
    catalase: "neg", adh: "neg", nitrate: "neg",
    cna: "growth",

    features: ["Gram-positive cocci in chains", "Catalase negative", "Alpha-hemolytic", "Aciduric / acidogenic", "Dental plaque biofilm"],
    notes: "Primary etiologic agent of dental caries; produces lactic acid from sucrose; adheres to tooth surfaces."
  },
  {
    id: "actinomyces_israelii",
    name: "Actinomyces israelii",
    gram: "gp", morph: ["bacilli"], hemolysis: "gamma",
    catalase: "neg", spores: "neg", motility: "neg",
    cna: "growth",

    features: ["Gram-positive branching bacilli", "Catalase negative", "Anaerobic / microaerophilic", "Sulfur granules"],
    notes: "Oral flora; causes actinomycosis (abscesses, draining sinuses) after mucosal breach."
  },
  {
    id: "bifidobacterium_spp",
    name: "Bifidobacterium spp.",
    gram: "gp", morph: ["bacilli"], hemolysis: "gamma",
    catalase: "neg", spores: "neg", motility: "neg",
    adh: "neg", nitrate: "neg",
    cna: "growth",

    features: ["Gram-positive branched (bifid) rods", "Catalase negative", "Anaerobic", "Lactic acid producer"],
    notes: "Lactic acid bacteria; dominant gut commensal in infants; probiotic species."
  },
  {
    id: "helicobacter_pylori",
    name: "Helicobacter pylori",
    gram: "gn", morph: ["bacilli"], oxidase: "pos", catalase: "pos", urease: "pos",
    motility: "pos", nitrate: "pos",
    cna: "no_growth",

    features: ["Gram-negative curved rods", "Oxidase positive", "Catalase positive", "Urease positive", "Motile", "Nitrate positive"],
    notes: "Gastric pathogen; causes peptic ulcers and gastritis; Class I carcinogen (gastric cancer)."
  },
  {
    id: "burkholderia_cepacia",
    name: "Burkholderia cepacia",
    gram: "gn", morph: ["bacilli"], oxidase: "pos",
    motility: "pos", citrate: "pos",
    cna: "no_growth",

    features: ["Gram-negative rods", "Oxidase positive", "Motile", "Citrate positive", "Environmental"],
    notes: "Opportunistic pathogen; important in cystic fibrosis patients; intrinsically resistant to many antibiotics."
  },
  {
    id: "vibrio_vulnificus",
    name: "Vibrio vulnificus",
    gram: "gn", morph: ["bacilli"], oxidase: "pos",
    motility: "pos", cna: "no_growth",

    features: ["Gram-negative curved rods", "Oxidase positive", "Motile", "Halophilic (salt-loving)"],
    notes: "Seawater-associated; causes severe wound infections and primary septicemia; high mortality."
  },
  {
    id: "aeromonas_hydrophila",
    name: "Aeromonas hydrophila",
    gram: "gn", morph: ["bacilli"], oxidase: "pos",
    motility: "pos", cna: "no_growth",

    features: ["Gram-negative rods", "Oxidase positive", "Motile", "Water-associated"],
    notes: "Freshwater organism; causes gastroenteritis, wound infections, and septicemia."
  },
  {
    id: "chromobacterium_violaceum",
    name: "Chromobacterium violaceum",
    gram: "gn", morph: ["bacilli"], oxidase: "pos",
    motility: "pos", cna: "no_growth",

    features: ["Gram-negative rods", "Oxidase positive", "Motile", "Violet violacein pigment"],
    notes: "Environmental organism; produces violet pigment on agar; rare but severe opportunistic infections."
  },
  {
    id: "alcaligenes_faecalis",
    name: "Alcaligenes faecalis",
    gram: "gn", morph: ["bacilli"], oxidase: "pos",
    motility: "pos", citrate: "pos",
    cna: "no_growth",

    features: ["Gram-negative rods", "Oxidase positive", "Motile", "Citrate positive"],
    notes: "Environmental organism; opportunistic nosocomial pathogen; often misidentified as Pseudomonas."
  },
  {
    id: "capnocytophaga_canimorsus",
    name: "Capnocytophaga canimorsus",
    gram: "gn", morph: ["bacilli"], oxidase: "pos",
    motility: "neg", cna: "no_growth",

    features: ["Gram-negative rods", "Oxidase positive", "Non-motile", "Fastidious"],
    notes: "Oral flora of dogs and cats; causes severe sepsis after animal bites, especially in asplenic patients."
  },
  {
    id: "mycoplasma_pneumoniae",
    name: "Mycoplasma pneumoniae",
    gram: "none", morph: ["bacilli"],
    catalase: "neg", motility: "neg",
    cna: "growth",

    features: ["No cell wall", "Pleomorphic (no fixed shape)", "Catalase negative", "Non-motile"],
    notes: "Atypical pneumonia; lacks cell wall (naturally resistant to beta-lactams); cold agglutinins."
  },
  {
    id: "chlamydia_trachomatis",
    name: "Chlamydia trachomatis",
    gram: "none", morph: ["cocci"],
    catalase: "neg", motility: "neg",
    cna: "growth",

    features: ["Obligate intracellular", "Elementary / reticulate bodies", "Catalase negative", "Non-motile"],
    notes: "STI and ocular pathogen; causes trachoma, urethritis, lymphogranuloma venereum."
  },
  {
    id: "rickettsia_rickettsii",
    name: "Rickettsia rickettsii",
    gram: "gn", morph: ["bacilli"],
    catalase: "pos", motility: "neg",
    cna: "growth",

    features: ["Obligate intracellular", "Gram-negative rods", "Catalase positive", "Non-motile"],
    notes: "Tick-borne; causes Rocky Mountain spotted fever; endothelial tropism."
  },
  {
    id: "mycobacterium_tuberculosis",
    name: "Mycobacterium tuberculosis",
    gram: "none", morph: ["bacilli"], hemolysis: "gamma",
    catalase: "pos", motility: "neg", spores: "neg",
    cna: "growth", chocolate: "growth",
    tcbs: "green",

    features: ["Acid-fast bacilli (Ziehl-Neelsen)", "Alcohol-acid resistant", "Non-motile", "Non-spore-forming", "Obligate aerobe", "Slow-growing"],
    notes: "Causes tuberculosis (TB). Transmitted via airborne droplets. Requires special media (Lowenstein-Jensen) and prolonged incubation."
  },
  {
    id: "mycobacterium_leprae",
    name: "Mycobacterium leprae",
    gram: "none", morph: ["bacilli"], hemolysis: "gamma",
    catalase: "neg", motility: "neg", spores: "neg",
    cna: "growth",
    tcbs: "green",

    features: ["Acid-fast bacilli", "Alcohol-acid resistant", "Non-motile", "Non-spore-forming", "Obligate intracellular"],
    notes: "Causes leprosy (Hansen's disease). Cannot be cultured on artificial media; grown in armadillo footpads or mouse footpads."
  },
  {
    id: "mycobacterium_bovis",
    name: "Mycobacterium bovis",
    gram: "none", morph: ["bacilli"], hemolysis: "gamma",
    catalase: "pos", motility: "neg", spores: "neg",
    cna: "growth", chocolate: "growth",
    tcbs: "green",

    features: ["Acid-fast bacilli", "Alcohol-acid resistant", "Non-motile", "Non-spore-forming", "Niacin negative"],
    notes: "Causes bovine tuberculosis; can infect humans (unpasteurized milk). BCG vaccine strain derived from M. bovis."
  },
  {
    id: "ureaplasma_urealyticum",
    name: "Ureaplasma urealyticum",
    gram: "none", morph: ["cocci"], hemolysis: "gamma",
    catalase: "neg", motility: "neg", spores: "neg",
    adh: "neg", nitrate: "neg",
    cna: "growth",

    features: ["No cell wall", "Pleomorphic cocci", "Urease positive", "Non-motile"],
    notes: "Genital mycoplasma; causes nongonococcal urethritis, chorioamnionitis; associated with premature birth."
  },
  {
    id: "brucella_melitensis",
    name: "Brucella melitensis",
    gram: "gn", morph: ["coccobacilli"], hemolysis: "gamma",
    catalase: "pos", oxidase: "pos", urease: "pos",
    motility: "neg", citrate: "neg",
    chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative coccobacilli", "Catalase positive", "Oxidase positive", "Urease positive", "Intracellular"],
    notes: "Causes brucellosis (Malta fever, undulant fever). Goats/sheep reservoir. BSL-3 organism."
  },
  {
    id: "brucella_abortus",
    name: "Brucella abortus",
    gram: "gn", morph: ["coccobacilli"], hemolysis: "gamma",
    catalase: "pos", oxidase: "pos", urease: "pos",
    motility: "neg", citrate: "neg",
    chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative coccobacilli", "Catalase positive", "Oxidase positive", "Urease positive", "Intracellular"],
    notes: "Causes brucellosis (Bang's disease). Cattle reservoir. BSL-3 organism."
  },
  {
    id: "brucella_suis",
    name: "Brucella suis",
    gram: "gn", morph: ["coccobacilli"], hemolysis: "gamma",
    catalase: "pos", oxidase: "pos", urease: "pos",
    motility: "neg", citrate: "neg",
    chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative coccobacilli", "Catalase positive", "Oxidase positive", "Urease positive", "Intracellular"],
    notes: "Causes brucellosis. Swine reservoir. BSL-3 organism."
  },
  {
    id: "coxiella_burnetii",
    name: "Coxiella burnetii",
    gram: "gn", morph: ["bacilli"], hemolysis: "gamma",
    catalase: "neg", motility: "neg", spores: "pos",
    chocolate: "growth", cna: "no_growth",

    features: ["Gram-negative bacilli", "Obligate intracellular", "Spore-like form", "Highly infectious"],
    notes: "Causes Q fever. Cattle/sheep/goats reservoir. Airborne transmission. BSL-3 organism."
  },
  {
    id: "treponema_pallidum",
    name: "Treponema pallidum",
    gram: "none", morph: ["bacilli"],
    catalase: "neg", motility: "pos",
    chocolate: "growth", cna: "no_growth",

    features: ["Spirochete", "Not visible on Gram stain", "Motile (corkscrew)", "Obligate intracellular"],
    notes: "Causes syphilis. Diagnosed by dark-field microscopy or serology (VDRL, RPR, FTA-ABS). Cannot be cultured routinely."
  },
  {
    id: "borrelia_burgdorferi",
    name: "Borrelia burgdorferi",
    gram: "none", morph: ["bacilli"],
    catalase: "neg", motility: "pos",
    chocolate: "growth", cna: "no_growth",

    features: ["Spirochete", "Motile (corkscrew)", "Not visible on Gram stain", "Tick-borne"],
    notes: "Causes Lyme disease. Transmitted by Ixodes ticks. Diagnosed by serology (ELISA, Western blot)."
  },
  {
    id: "leptospira_interrogans",
    name: "Leptospira interrogans",
    gram: "none", morph: ["bacilli"],
    catalase: "neg", motility: "pos",
    chocolate: "growth", cna: "no_growth",

    features: ["Spirochete", "Motile (hooked ends)", "Not visible on Gram stain", "Aerobic"],
    notes: "Causes leptospirosis (Weil's disease). Transmitted via urine of infected animals (rats). Diagnosed by MAT serology."
  }
];

// ---------------------------------------------------------------------------
// Test metadata, weights and value formatting
// ---------------------------------------------------------------------------
const TEST_FIELDS = [
  "gram", "morph", "hemolysis", "spores",
  "catalase", "oxidase", "coagulase", "urease", "pyr", "optochin", "bacitracin",
  "mac", "emb", "ss", "xld", "msa", "cna", "chocolate", "hek", "tsi", "ldc", "pigment",
  "indole", "mr", "vp", "citrate", "adh", "nitrate", "tcbs", "h2s", "motility", "bileesculin", "nacl", "pda"
];

const WEIGHTS = {
  gram: 2.0, morph: 1.0, hemolysis: 1.0, spores: 1.5,
  catalase: 1.8, oxidase: 1.8, coagulase: 2.0, urease: 1.2, pyr: 1.2,
  optochin: 1.4, bacitracin: 1.2,
  mac: 1.4, emb: 1.2, ss: 1.0, xld: 1.0, msa: 1.4, cna: 1.3, chocolate: 1.2, hek: 1.3, tsi: 1.4, ldc: 1.3, pigment: 1.0,
  indole: 1.3, mr: 1.2, vp: 1.2, citrate: 1.2, adh: 1.3, nitrate: 1.3, tcbs: 1.4, h2s: 1.3, motility: 1.2,
  bileesculin: 1.2, nacl: 1.2, pda: 1.2
};

const HARD_FIELDS = new Set(["gram", "coagulase", "oxidase", "catalase"]);

const FIELD_LABELS = {
  gram: "Gram stain", morph: "Morphology", hemolysis: "Hemolysis", spores: "Endospores",
  catalase: "Catalase", oxidase: "Oxidase", coagulase: "Coagulase", urease: "Urease",
  pyr: "PYR", optochin: "Optochin", bacitracin: "Bacitracin", mac: "MacConkey",
  emb: "EMB", ss: "SS agar", xld: "XLD", msa: "MSA", cna: "CNA agar", chocolate: "Chocolate agar", hek: "Hektoen agar", tsi: "Triple sugar iron", ldc: "Lysine decarboxylase", pigment: "Pigment/odor",
  indole: "Indole", mr: "Methyl Red", vp: "Voges-Proskauer", citrate: "Citrate",
  h2s: "H2S", motility: "Motility", bileesculin: "Bile esculin", nacl: "6.5% NaCl",
  pda: "Phenylalanine deaminase", adh: "Arginine dihydrolase", nitrate: "Nitrate reductase", tcbs: "TCBS agar"
};

const VALUE_LABELS = {
  gram: { gp: "Gram-positive", gn: "Gram-negative" },
  morph: {
    cocci: "cocci", bacilli: "bacilli/rods", coccobacilli: "coccobacilli",
    diplococci: "diplococci", clusters: "in clusters", chains: "in chains", pairs: "in pairs"
  },
  hemolysis: { beta: "beta-hemolytic", alpha: "alpha-hemolytic", gamma: "non-hemolytic" },
  spores: { pos: "present", neg: "absent" },
  optochin: { s: "sensitive", r: "resistant" },
  bacitracin: { s: "sensitive", r: "resistant" },
  mac: { lf: "lactose fermenter", nlf: "non-lactose fermenter", ng: "no growth" },
  emb: { metallic_green: "metallic green sheen", purple: "purple", colorless: "colorless" },
  ss: { colorless_black: "colorless with black centers", colorless: "colorless", pink: "pink/red" },
  xld: { red_black: "red with black centers", yellow: "yellow", red: "red" },
  msa: { yellow: "yellow (mannitol +)", pink: "pink (mannitol -)" },
  cna: { growth: "growth", no_growth: "no growth" },
  chocolate: { growth: "growth", no_growth: "no growth" },
  hek: { blue_green: "blue-green", salmonella_black: "blue-green with black centers", colorless: "colorless" },
  tsi: { k_a: "K/A", a_a: "A/A", k_nc: "K/NC", h2s: "H2S", gas: "gas" },
  ldc: { pos: "positive", neg: "negative" },
  pigment: { pyocyanin: "blue-green pigment", grape: "grape-like odor", mucoid: "mucoid", swarming: "swarming" },
  motility: { pos: "positive", neg: "negative", swarming: "swarming" },
  adh: { pos: "positive", neg: "negative" },
  nitrate: { pos: "positive", neg: "negative" },
  tcbs: { yellow: "yellow (sucrose +)", green: "green/blue (sucrose -)" }
};

function fmtVal(field, value) {
  if (value === undefined || value === null || value === "") return "—";
  if (Array.isArray(value)) return value.map((v) => fmtVal(field, v)).join(" or ");
  if (VALUE_LABELS[field] && VALUE_LABELS[field][value] !== undefined) {
    return VALUE_LABELS[field][value];
  }
  if (value === "pos") return "positive";
  if (value === "neg") return "negative";
  return String(value);
}

// ---------------------------------------------------------------------------
// Glossary + tooltips
// ---------------------------------------------------------------------------
const GLOSSARY = {
  gram: { title: "Gram stain", text: "Separates bacteria by cell wall. Purple = Gram-positive (thick peptidoglycan); pink/red = Gram-negative (thin peptidoglycan + outer membrane)." },
  morph: { title: "Morphology", text: "Cell shape and arrangement under the microscope: cocci (round), bacilli (rods), coccobacilli, diplococci (pairs), clusters, chains." },
  hemolysis: { title: "Hemolysis", text: "On blood agar: beta = complete clearing; alpha = greenish partial; gamma = none." },
  spores: { title: "Endospores", text: "Dormant, heat-resistant structures (Bacillus, Clostridium). Presence is a strong identifier; use a spore stain." },
  catalase: { title: "Catalase", text: "Add H2O2. Bubbles of O2 = positive. Distinguishes Staphylococci (+) from Streptococci (-)." },
  oxidase: { title: "Oxidase", text: "Detects cytochrome c oxidase. Purple/blue color = positive. Positive: Pseudomonas, Neisseria. Negative: Enterobacteriaceae." },
  coagulase: { title: "Coagulase", text: "Clot formation = positive. Key test: S. aureus (+) vs coagulase-negative staphylococci (-)." },
  urease: { title: "Urease", text: "Hydrolyses urea to ammonia, raising pH. Phenol red turns pink = positive. Proteus is strongly positive." },
  pyr: { title: "PYR", text: "Hydrolysis of L-pyrrolidonyl-beta-naphthylamide. Red = positive. Group A Strep and Enterococcus are positive." },
  optochin: { title: "Optochin", text: "Optochin disk: S. pneumoniae is sensitive (zone of inhibition); viridans streptococci are resistant." },
  bacitracin: { title: "Bacitracin", text: "Bacitracin disk: S. pyogenes is sensitive (presumptive identification)." },
  mac: { title: "MacConkey agar", text: "Selective/differential for Gram-negatives. Pink = lactose fermenter (LF); colorless = non-lactose fermenter (NLF)." },
  emb: { title: "EMB agar", text: "Eosin methylene blue. E. coli gives a metallic green sheen; other lactose fermenters are purple; NLF are colorless." },
  ss: { title: "SS agar", text: "Salmonella-Shigella agar. NLF with or without black H2S centers; lactose fermenters are pink." },
  xld: { title: "XLD agar", text: "Xylose lysine deoxycholate. Salmonella: red with black centers; Shigella: red; Proteus and others may be yellow." },
  msa: { title: "MSA (mannitol salt)", text: "S. aureus ferments mannitol, turning the medium yellow; many CoNS stay pink/red." },
  cna: { title: "CNA agar", text: "Columbia nalidixic acid agar. Selective for Gram-positives; nalidixic acid inhibits most Gram-negatives." },
  chocolate: { title: "Chocolate agar", text: "Enriched medium with heated blood. Supports fastidious organisms such as Haemophilus, Neisseria, Pasteurella." },
  hek: { title: "Hektoen enteric agar", text: "Differential for enterics. Salmonella/Shigella appear blue-green (often with black centers); lactose fermenters are blue-green; non-fermenters are colorless." },
  tsi: { title: "Triple sugar iron", text: "TSI agar: K/A = glucose fermenter only; A/A = lactose/sucrose fermenter; black = H2S; bubbles/cracks = gas." },
  ldc: { title: "Lysine decarboxylase", text: "Lysine decarboxylase broth. Purple = positive (lysine decarboxylated); yellow = negative. Salmonella and E. coli are typically positive." },
  pigment: { title: "Pigment / odor", text: "Colony features: P. aeruginosa blue-green pyocyanin and grape-like odor; Klebsiella mucoid; Proteus swarming." },
  indole: { title: "Indole", text: "Tryptophanase produces indole; Kovac's reagent forms a red ring = positive. E. coli is positive." },
  mr: { title: "Methyl Red", text: "Detects mixed-acid fermentation (lowers pH). Red = positive." },
  vp: { title: "Voges-Proskauer", text: "Detects acetoin production. Red = positive (Klebsiella, Enterobacter)." },
  citrate: { title: "Citrate", text: "Simmon's citrate agar. Blue = positive (organism can use citrate as sole carbon source)." },
  h2s: { title: "H2S production", text: "Sulfide production gives a black precipitate (FeS) = positive. Salmonella and Proteus are positive." },
  motility: { title: "Motility", text: "Semi-solid agar: diffuse growth away from the stab line = motile. Proteus may show swarming." },
  bileesculin: { title: "Bile esculin", text: "Blackening = positive. Supports identification of Enterococcus." },
  nacl: { title: "6.5% NaCl", text: "Growth in high salt supports Enterococcus (and some staphylococci)." },
  pda: { title: "Phenylalanine deaminase", text: "Green color after reagent = positive. Proteus is positive." },
  adh: { title: "Arginine dihydrolase (ADH)", text: "Arginine dihydrolase broth. Purple/alkaline = positive; organism hydrolyzes arginine. Positive: Pseudomonas, some Streptococci, lactic acid bacteria." },
  nitrate: { title: "Nitrate reductase (NR)", text: "Nitrate broth: reduces nitrate to nitrite (red with reagents) or nitrogen gas (bubbles). Positive: E. coli, Salmonella, Proteus, many enterics." },
  tcbs: { title: "TCBS agar (Thiosulfate Citrate Bile Salts Sucrose)", text: "Selective medium for Vibrio spp. Yellow colonies = sucrose fermenter (V. cholerae, V. alginolyticus); green/blue colonies = non-sucrose fermenter (V. parahaemolyticus, V. vulnificus)." },
};

// ---------------------------------------------------------------------------
// Small DOM helper
// ---------------------------------------------------------------------------
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

// ---------------------------------------------------------------------------
// Test input handling
// ---------------------------------------------------------------------------
function getTestValues() {
  const values = {};
  for (const field of TEST_FIELDS) {
    const select = document.getElementById(field);
    values[field] = select ? select.value : "";
  }
  return values;
}

function fillForm(tests) {
  for (const field of TEST_FIELDS) {
    const select = document.getElementById(field);
    if (select) select.value = tests[field] || "";
  }
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------
function valueMatches(field, expected, actual) {
  if (expected === undefined || expected === null) return null;
  if (field === "motility") {
    const norm = (v) => (v === "swarming" ? "pos" : v);
    return norm(expected) === norm(actual);
  }
  if (Array.isArray(expected)) return expected.includes(actual);
  return expected === actual;
}

function valuesEquivalent(field, a, b) {
  if (field === "motility") {
    const norm = (v) => (v === "swarming" ? "pos" : v);
    return norm(a) === norm(b);
  }
  const la = Array.isArray(a) ? a : [a];
  const lb = Array.isArray(b) ? b : [b];
  return la.some((x) => lb.includes(x));
}

function scoreOrganism(organism, tests) {
  let pos = 0;
  let neg = 0;
  let possible = 0;
  let matched = 0;
  let conflicts = 0;
  let evaluated = 0;
  let hardConflicts = 0;
  const breakdown = [];

  for (const field of TEST_FIELDS) {
    const expected = organism[field];
    if (expected === undefined) continue;
    const weight = WEIGHTS[field] || 1;
    const actual = tests[field];

    if (!actual) {
      breakdown.push({ field, status: "missing", weight, expected });
      continue;
    }

    evaluated += 1;
    possible += weight;
    if (valueMatches(field, expected, actual)) {
      pos += weight;
      matched += 1;
      breakdown.push({ field, status: "match", weight, expected, actual });
    } else {
      neg += weight;
      conflicts += 1;
      if (HARD_FIELDS.has(field)) hardConflicts += 1;
      breakdown.push({ field, status: "conflict", weight, expected, actual });
    }
  }

  const percent = possible > 0 ? Math.max(0, Math.round(((pos - neg) / possible) * 100)) : 0;
  return { pos, neg, possible, matched, conflicts, evaluated, hardConflicts, percent, breakdown };
}

function computeConfidence(top, next, enteredCount) {
  const gap = next ? top.percent - next.percent : top.percent;
  const warnings = [];

  const keyConflicts = top.breakdown
    .filter((b) => b.status === "conflict" && HARD_FIELDS.has(b.field))
    .map((b) => FIELD_LABELS[b.field]);
  if (keyConflicts.length > 0) {
    warnings.push(`Conflicts with key test(s): ${keyConflicts.join(", ")}`);
  }
  if (enteredCount < 3) {
    warnings.push("Few tests entered — confidence is limited.");
  }
  if (next && gap < 5) {
    warnings.push(`Close tie with ${next.name} (${next.percent}%).`);
  }

  let level = "medium";
  if (top.percent < 55 || enteredCount < 3 || top.hardConflicts > 0 || (next && gap < 5)) {
    level = "low";
  } else if (top.percent >= 80 && enteredCount >= 5 && top.hardConflicts === 0 && gap >= 10) {
    level = "high";
  }
  return { level, gap, warnings, enteredCount };
}

// ---------------------------------------------------------------------------
// Next-test suggestions
// ---------------------------------------------------------------------------
function buildSuggestions(results, tests) {
  const suggestions = [];
  const seen = new Set();
  const top = results.slice(0, 3);

  for (let i = 0; i < top.length; i += 1) {
    for (let j = i + 1; j < top.length; j += 1) {
      const a = top[i];
      const b = top[j];
      for (const field of TEST_FIELDS) {
        if (tests[field]) continue;
        if (a[field] === undefined || b[field] === undefined) continue;
        if (valuesEquivalent(field, a[field], b[field])) continue;
        if (seen.has(field)) continue;
        seen.add(field);
        suggestions.push({
          field,
          a: a.name,
          b: b.name,
          aVal: fmtVal(field, a[field]),
          bVal: fmtVal(field, b[field]),
          weight: WEIGHTS[field] || 1
        });
      }
    }
  }

  suggestions.sort((x, y) => y.weight - x.weight);
  if (suggestions.length > 0) return suggestions.slice(0, 6);

  // Fallback: broad tests based on the best match's group.
  const best = results[0];
  if (!best) return [];
  const fallback = [];
  const add = (field, reason) => {
    if (!tests[field] && !seen.has(field)) {
      seen.add(field);
      fallback.push({ field, reason, weight: WEIGHTS[field] || 1 });
    }
  };

  if (best.name.indexOf("Staphylococcus") !== -1) add("coagulase", "Separates S. aureus from CoNS");
  if (best.name.indexOf("Streptococcus") !== -1 || best.name.indexOf("Enterococcus") !== -1) {
    add("pyr", "Group A Strep / Enterococcus are PYR positive");
    add("optochin", "S. pneumoniae is optochin sensitive");
    add("bileesculin", "Enterococcus is bile-esculin positive");
  }
  if (best.gram === "gp" && best.morph && best.morph.indexOf("bacilli") !== -1) {
    add("spores", "Distinguishes Bacillus/Clostridium from other GP rods");
    add("motility", "Listeria shows tumbling motility");
  }
  if (best.gram === "gn" && best.morph && best.morph.indexOf("cocci") !== -1) {
    add("oxidase", "Neisseria is oxidase positive");
  }
  if (best.gram === "gn" && best.mac === "lf") {
    add("indole", "E. coli is indole positive");
    add("motility", "Klebsiella is usually non-motile");
  }
  if (best.gram === "gn" && best.mac === "nlf") {
    add("oxidase", "Pseudomonas is oxidase positive");
    add("h2s", "Salmonella/Proteus produce H2S; Shigella does not");
    add("motility", "Shigella is non-motile");
  }

  return fallback.slice(0, 6);
}

// ---------------------------------------------------------------------------
// Image Gallery
// ---------------------------------------------------------------------------
let galleryFilter = "all"; // all | gp | gn
let galleryQuery = "";

function gramLabel(gram) {
  return gram === "gp" ? "Gram-positive" : "Gram-negative";
}

function organismMatchesFilter(organism) {
  if (galleryFilter === "gp" && organism.gram !== "gp") return false;
  if (galleryFilter === "gn" && organism.gram !== "gn") return false;
  if (galleryQuery) {
    const q = galleryQuery.toLowerCase();
    const haystack = `${organism.name} ${organism.features.join(" ")} ${organism.notes} ${gramLabel(organism.gram)} ${(organism.morph || []).join(" ")}`.toLowerCase();
    if (haystack.indexOf(q) === -1) return false;
  }
  return true;
}

function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  const empty = document.getElementById("gallery-empty");
  grid.textContent = "";

  const filtered = bacteriaDb.filter(organismMatchesFilter);

  if (filtered.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  filtered.forEach((organism) => {
    const card = el("div", "gallery-card");

    const imageWrap = el("div", "gallery-image");
    const imgEntry = getOrganismImage(organism.id);
    const img = document.createElement("img");
    img.alt = organism.name;
    img.loading = "lazy";
    img.width = 320;
    img.height = 150;

    if (imgEntry) {
      img.src = imgEntry.url;
      img.onerror = () => {
        img.style.display = "none";
        const placeholder = el("div", "gallery-placeholder", "No image available");
        imageWrap.appendChild(placeholder);
      };
      const credit = el("div", "gallery-credit", imgEntry.credit);
      imageWrap.appendChild(credit);
    } else {
      img.style.display = "none";
      const placeholder = el("div", "gallery-placeholder", "No image available");
      imageWrap.appendChild(placeholder);
    }

    const tag = el("span", "gallery-tag", gramLabel(organism.gram));
    imageWrap.appendChild(img);
    imageWrap.appendChild(tag);
    card.appendChild(imageWrap);

    const body = el("div", "gallery-body");
    body.appendChild(el("div", "gallery-name", organism.name));
    body.appendChild(el("div", "gallery-gram", gramLabel(organism.gram)));
    body.appendChild(el("div", "gallery-features", (organism.features || []).slice(0, 3).join(" • ")));
    const btn = el("button", "gallery-btn", "View details");
    btn.type = "button";
    btn.addEventListener("click", () => {
      toast(`${organism.name}: ${organism.notes}`);
    });
    body.appendChild(btn);
    card.appendChild(body);

    grid.appendChild(card);
  });
}

// ---------------------------------------------------------------------------
// Render matches
// ---------------------------------------------------------------------------
let lastAnalysis = null;

function renderMatches(results, tests) {
  const matchesList = document.getElementById("matches-list");
  const resultsPanel = document.getElementById("match-results");
  const nextSection = document.getElementById("next-tests-section");
  const nextList = document.getElementById("next-tests-list");

  matchesList.textContent = "";
  nextList.textContent = "";

  if (results.length === 0) {
    const empty = el("div", "match-item");
    const info = el("div", "match-info");
    info.appendChild(el("div", "match-name", "No matches found"));
    info.appendChild(el("div", "match-features", "Enter at least one test result to get suggestions."));
    empty.appendChild(info);
    matchesList.appendChild(empty);
    resultsPanel.hidden = false;
    nextSection.hidden = true;
    return;
  }

  const enteredCount = TEST_FIELDS.filter((f) => tests[f]).length;

  results.slice(0, 8).forEach((result, index) => {
    const next = results[index + 1] || null;
    const confidence = computeConfidence(result, next, enteredCount);

    const card = el("div", "match-item" + (index === 0 ? " top-match" : ""));

    const headerRow = el("div", "match-header-row");
    headerRow.appendChild(el("div", "match-name", result.name));

    const badges = el("div", "match-badges");
    badges.appendChild(el("span", "match-score", `${result.percent}% match`));
    const badge = el(
      "span",
      `confidence-badge confidence-${confidence.level}`,
      `${confidence.level.charAt(0).toUpperCase()}${confidence.level.slice(1)} confidence`
    );
    badges.appendChild(badge);
    headerRow.appendChild(badges);
    card.appendChild(headerRow);

    card.appendChild(
      el("div", "match-metrics", `Matched ${result.matched}/${result.evaluated} tests • Conflicts: ${result.conflicts}`)
    );

    card.appendChild(el("div", "match-features", result.features.join(" • ")));
    card.appendChild(el("div", "match-notes", result.notes));

    if (confidence.warnings.length > 0) {
      const warn = el("div", "match-warnings");
      confidence.warnings.forEach((w) => warn.appendChild(el("div", "", `⚠ ${w}`)));
      card.appendChild(warn);
    }

    const toggle = el("button", "breakdown-toggle", "Why this match?");
    toggle.type = "button";
    const breakdown = el("div", "breakdown");
    breakdown.hidden = true;

    const ordered = result.breakdown.slice().sort((x, y) => {
      const rank = { match: 0, conflict: 1, missing: 2 };
      return rank[x.status] - rank[y.status];
    });

    ordered.forEach((item) => {
      const row = el("div", `breakdown-item ${item.status}`);
      let text;
      if (item.status === "match") {
        text = `${FIELD_LABELS[item.field]}: ${fmtVal(item.field, item.actual)} — match (weight ${item.weight})`;
      } else if (item.status === "conflict") {
        text = `${FIELD_LABELS[item.field]}: expected ${fmtVal(item.field, item.expected)}, you entered ${fmtVal(item.field, item.actual)} (weight ${item.weight})`;
      } else {
        text = `${FIELD_LABELS[item.field]}: not entered (expected ${fmtVal(item.field, item.expected)})`;
      }
      row.appendChild(el("span", "breakdown-test", text));
      const statusLabel = item.status === "match" ? "✓ match" : item.status === "conflict" ? "✗ conflict" : "· missing";
      row.appendChild(el("span", "breakdown-status", statusLabel));
      breakdown.appendChild(row);
    });

    toggle.addEventListener("click", () => {
      breakdown.hidden = !breakdown.hidden;
      toggle.textContent = breakdown.hidden ? "Why this match?" : "Hide breakdown";
    });

    card.appendChild(toggle);
    card.appendChild(breakdown);
    matchesList.appendChild(card);
  });

  // Suggestions
  const suggestions = buildSuggestions(results, tests);
  if (suggestions.length > 0) {
    suggestions.forEach((s) => {
      const li = el("li");
      if (s.a && s.b) {
        li.textContent = `${FIELD_LABELS[s.field]}: ${s.a.split(" (")[0]} = ${s.aVal} vs ${s.b.split(" (")[0]} = ${s.bVal}`;
      } else {
        li.textContent = `${FIELD_LABELS[s.field]}: ${s.reason}`;
      }
      nextList.appendChild(li);
    });
    nextSection.hidden = false;
  } else {
    nextSection.hidden = true;
  }

  resultsPanel.hidden = false;
}

function identifyBacteria() {
  const tests = getTestValues();
  const enteredCount = TEST_FIELDS.filter((f) => tests[f]).length;

  let results = [];
  if (enteredCount > 0) {
    results = bacteriaDb
      .map((organism) => {
        const scored = scoreOrganism(organism, tests);
        return Object.assign({}, organism, scored);
      })
      .filter((r) => r.evaluated > 0)
      .sort((a, b) => {
        if (a.hardConflicts !== b.hardConflicts) return a.hardConflicts - b.hardConflicts;
        if (b.percent !== a.percent) return b.percent - a.percent;
        if (b.matched !== a.matched) return b.matched - a.matched;
        return a.conflicts - b.conflicts;
      });
  }

  renderMatches(results, tests);

  const suggestions = results.length > 0 ? buildSuggestions(results, tests) : [];
  lastAnalysis = results.length > 0
    ? { tests, results, suggestions, createdAt: new Date().toISOString() }
    : null;

  const panel = document.getElementById("match-results");
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
function shortName(name) {
  return name.split(" (")[0];
}

function buildReport() {
  if (!lastAnalysis) return null;
  const tests = lastAnalysis.tests;
  return {
    app: "Bacterial Identification Web App",
    appVersion: APP_VERSION,
    createdAt: lastAnalysis.createdAt,
    tests: Object.fromEntries(
      TEST_FIELDS.filter((f) => tests[f]).map((f) => [FIELD_LABELS[f], fmtVal(f, tests[f])])
    ),
    matches: lastAnalysis.results.slice(0, 8).map((r, i) => ({
      rank: i + 1,
      organism: r.name,
      percent: r.percent,
      matched: r.matched,
      evaluated: r.evaluated,
      conflicts: r.conflicts
    })),
    suggestedTests: lastAnalysis.suggestions.map((s) => ({
      test: FIELD_LABELS[s.field],
      between: s.a && s.b ? [shortName(s.a), shortName(s.b)] : null,
      reason: s.a && s.b ? `${shortName(s.a)}: ${s.aVal}; ${shortName(s.b)}: ${s.bVal}` : s.reason
    }))
  };
}

function buildSummaryText() {
  const report = buildReport();
  if (!report) return "";
  const lines = [];
  lines.push("Bacterial Identification Summary");
  lines.push(`Date: ${new Date(report.createdAt).toLocaleString()}`);
  lines.push("");
  lines.push("Entered tests:");
  Object.entries(report.tests).forEach(([label, value]) => lines.push(`  - ${label}: ${value}`));
  lines.push("");
  lines.push("Top matches:");
  report.matches.forEach((m) => {
    lines.push(`  ${m.rank}. ${m.organism} - ${m.percent}% (matched ${m.matched}/${m.evaluated}, conflicts ${m.conflicts})`);
  });
  if (report.suggestedTests.length > 0) {
    lines.push("");
    lines.push("Suggested next tests:");
    report.suggestedTests.forEach((s) => {
      lines.push(`  - ${s.test}: ${s.reason}`);
    });
  }
  lines.push("");
  lines.push("Disclaimer: educational orientation tool only. Confirm with standard laboratory methods.");
  return lines.join("\n");
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function toast(message) {
  let box = document.getElementById("toast");
  if (!box) {
    box = el("div", "toast");
    box.id = "toast";
    document.body.appendChild(box);
  }
  box.textContent = message;
  box.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => box.classList.remove("show"), 2200);
}

function copyText(text) {
  if (!text) {
    toast("Nothing to copy yet. Identify first.");
    return;
  }
  const done = () => toast("Summary copied to clipboard.");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, done) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
    done();
  } catch (err) {
    toast("Copy failed. Use Download JSON instead.");
  }
  document.body.removeChild(area);
}

// ---------------------------------------------------------------------------
// History (localStorage)
// ---------------------------------------------------------------------------
function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function persistHistory(list) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, MAX_HISTORY)));
    return true;
  } catch (err) {
    toast("Could not save history on this device.");
    return false;
  }
}

function saveCurrentToHistory() {
  if (!lastAnalysis) {
    toast("Identify first, then save.");
    return;
  }
  const report = buildReport();
  const list = loadHistory();
  list.unshift({
    id: Date.now(),
    createdAt: report.createdAt,
    top: report.matches.length > 0 ? report.matches[0].organism : "No match",
    percent: report.matches.length > 0 ? report.matches[0].percent : 0,
    tests: lastAnalysis.tests,
    matches: report.matches,
    suggestedTests: report.suggestedTests
  });
  if (persistHistory(list)) {
    toast("Saved to history.");
    renderHistory();
  }
}

function deleteHistoryEntry(id) {
  const list = loadHistory().filter((entry) => entry.id !== id);
  persistHistory(list);
  renderHistory();
}

function renderHistory() {
  const listEl = document.getElementById("history-list");
  const emptyEl = document.getElementById("history-empty");
  listEl.textContent = "";
  const list = loadHistory();

  if (list.length === 0) {
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  list.forEach((entry) => {
    const item = el("div", "history-item");
    const info = el("div", "history-info");
    info.appendChild(el("div", "history-title", entry.top || "Unknown"));
    info.appendChild(
      el("div", "history-meta", `${new Date(entry.createdAt).toLocaleString()} • ${entry.percent}% match`)
    );
    item.appendChild(info);

    const actions = el("div", "history-actions");
    const loadBtn = el("button", "ghost-btn", "Load");
    loadBtn.type = "button";
    loadBtn.addEventListener("click", () => {
      fillForm(entry.tests || {});
      setMode("results");
      identifyBacteria();
    });
    const delBtn = el("button", "ghost-btn", "Delete");
    delBtn.type = "button";
    delBtn.addEventListener("click", () => deleteHistoryEntry(entry.id));
    actions.appendChild(loadBtn);
    actions.appendChild(delBtn);
    item.appendChild(actions);

    listEl.appendChild(item);
  });
}

// ---------------------------------------------------------------------------
// Glossary modal
// ---------------------------------------------------------------------------
function renderGlossary(query) {
  const listEl = document.getElementById("glossary-list");
  listEl.textContent = "";
  const q = (query || "").trim().toLowerCase();

  Object.keys(GLOSSARY).forEach((key) => {
    const entry = GLOSSARY[key];
    const haystack = `${entry.title} ${entry.text}`.toLowerCase();
    if (q && haystack.indexOf(q) === -1) return;
    const item = el("div", "glossary-item");
    item.appendChild(el("h4", "", entry.title));
    item.appendChild(el("p", "", entry.text));
    listEl.appendChild(item);
  });
}

function openGlossary() {
  const modal = document.getElementById("glossary-modal");
  modal.hidden = false;
  const search = document.getElementById("glossary-search");
  search.value = "";
  renderGlossary("");
  search.focus();
}

function closeGlossary() {
  document.getElementById("glossary-modal").hidden = true;
}

function openReferences() {
  const modal = document.getElementById("references-modal");
  modal.hidden = false;
}

function closeReferences() {
  document.getElementById("references-modal").hidden = true;
}

// ---------------------------------------------------------------------------
// Modes
// ---------------------------------------------------------------------------
function setMode(mode) {
  document.querySelectorAll(".nav-link[data-mode]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });
  document.getElementById("results-card").hidden = mode !== "results";
  document.getElementById("history-card").hidden = mode !== "history";
  document.getElementById("tree-card").hidden = mode !== "tree";
  document.getElementById("gallery-card").hidden = mode !== "gallery";
  if (mode === "history") renderHistory();
  if (mode === "gallery") renderGallery();
}

// ---------------------------------------------------------------------------
// Dichotomous tree
// ---------------------------------------------------------------------------
const treeData = [
  {
    id: "start",
    question: "What is the Gram stain result and morphology?",
    helper: "Begin with microscopy: observe Gram reaction and cell shape.",
    options: [
      { value: "gp-cocci", title: "Gram-positive cocci", description: "Purple spherical cells in clusters/chains/pairs" },
      { value: "gp-bacilli", title: "Gram-positive bacilli (rods)", description: "Purple rod-shaped cells" },
      { value: "gn-cocci", title: "Gram-negative cocci", description: "Pink/red spherical cells" },
      { value: "gn-bacilli", title: "Gram-negative bacilli (rods)", description: "Pink/red rod-shaped cells" }
    ],
    next: (choice) => {
      if (choice === "gp-cocci") return "gp-cocci-catalase";
      if (choice === "gp-bacilli") return "gp-bacilli-spore";
      if (choice === "gn-cocci") return "gn-cocci-oxidase";
      if (choice === "gn-bacilli") return "gn-bacilli-lactose";
      return null;
    }
  },
  {
    id: "gp-cocci-catalase",
    question: "Catalase test result?",
    helper: "Add H2O2 to a colony: bubbles = positive; no bubbles = negative.",
    options: [
      { value: "pos", title: "Catalase positive", description: "Effervescence observed" },
      { value: "neg", title: "Catalase negative", description: "No bubbles observed" }
    ],
    next: (c) => (c === "pos" ? "gp-cocci-staph" : "gp-cocci-strep")
  },
  {
    id: "gp-cocci-staph",
    question: "Coagulase test result?",
    helper: "Coagulase differentiates Staphylococcus aureus from CoNS.",
    options: [
      { value: "pos", title: "Coagulase positive", description: "Clot formation" },
      { value: "neg", title: "Coagulase negative", description: "No clot (coagulase-negative staphylococci)" }
    ],
    next: (c) => (c === "pos" ? "res-s-aureus" : "res-cons")
  },
  {
    id: "gp-cocci-strep",
    question: "Hemolysis pattern on blood agar?",
    helper: "Observe alpha (partial), beta (complete), or gamma (none) hemolysis.",
    options: [
      { value: "beta", title: "Beta-hemolytic", description: "Clear zone around colonies" },
      { value: "alpha", title: "Alpha-hemolytic", description: "Greenish zone around colonies" },
      { value: "gamma", title: "Gamma-hemolytic (non-hemolytic)", description: "No change around colonies" }
    ],
    next: (c) => {
      if (c === "beta") return "res-strep-pyogenes";
      if (c === "alpha") return "res-strep-pneumoniae";
      return "res-enterococcus";
    }
  },
  {
    id: "gp-bacilli-spore",
    question: "Spore formation (endospores)?",
    helper: "Perform a spore stain or observe under phase contrast.",
    options: [
      { value: "pos", title: "Spore-forming", description: "Endospores present" },
      { value: "neg", title: "Non-spore-forming", description: "No endospores observed" }
    ],
    next: (c) => (c === "pos" ? "gp-bacilli-bacillus" : "gp-bacilli-nonspore")
  },
  {
    id: "gp-bacilli-bacillus",
    question: "Motility and hemolysis?",
    helper: "Bacillus anthracis is non-motile and non-hemolytic; B. cereus is motile and beta-hemolytic.",
    options: [
      { value: "anthracis", title: "Non-motile, non-hemolytic", description: "Suggestive of Bacillus anthracis" },
      { value: "cereus", title: "Motile, beta-hemolytic", description: "Suggestive of Bacillus cereus" }
    ],
    next: (c) => (c === "anthracis" ? "res-b-anthracis" : "res-b-cereus")
  },
  {
    id: "gp-bacilli-nonspore",
    question: "Catalase result?",
    helper: "Listeria and Corynebacterium are usually catalase positive; Erysipelothrix is catalase negative.",
    options: [
      { value: "pos", title: "Catalase positive", description: "Bubbles with H2O2" },
      { value: "neg", title: "Catalase negative", description: "No bubbles" }
    ],
    next: (c) => (c === "pos" ? "gp-bacilli-catpos" : "res-erysipelothrix")
  },
  {
    id: "gp-bacilli-catpos",
    question: "Motility at 25°C?",
    helper: "Listeria shows tumbling motility; Corynebacterium spp. are non-motile.",
    options: [
      { value: "pos", title: "Motile (tumbling)", description: "Characteristic of Listeria monocytogenes" },
      { value: "neg", title: "Non-motile", description: "Suggestive of Corynebacterium spp." }
    ],
    next: (c) => (c === "pos" ? "res-l-monocytogenes" : "res-corynebacterium")
  },
  {
    id: "gn-cocci-oxidase",
    question: "Oxidase test result?",
    helper: "Neisseria spp. are oxidase positive.",
    options: [
      { value: "pos", title: "Oxidase positive", description: "Purple color develops" },
      { value: "neg", title: "Oxidase negative", description: "No color change" }
    ],
    next: (c) => (c === "pos" ? "res-neisseria" : "res-veillonella")
  },
  {
    id: "gn-bacilli-lactose",
    question: "Lactose fermentation on MacConkey agar?",
    helper: "Pink colonies = lactose fermenters; colorless = non-lactose fermenters.",
    options: [
      { value: "lf", title: "Lactose fermenter (LF)", description: "Pink/red colonies on MacConkey" },
      { value: "nlf", title: "Non-lactose fermenter (NLF)", description: "Colorless colonies on MacConkey" }
    ],
    next: (c) => (c === "lf" ? "gn-bacilli-lf" : "gn-bacilli-nlf")
  },
  {
    id: "gn-bacilli-lf",
    question: "Indole and motility?",
    helper: "E. coli: Indole+, motile; Klebsiella: Indole-, non-motile; Enterobacter: Indole-, motile.",
    options: [
      { value: "ecoli", title: "Indole positive, motile", description: "Suggestive of Escherichia coli" },
      { value: "kleb", title: "Indole negative, non-motile", description: "Suggestive of Klebsiella pneumoniae" },
      { value: "entero", title: "Indole negative, motile", description: "Suggestive of Enterobacter spp." }
    ],
    next: (c) => {
      if (c === "ecoli") return "res-e-coli";
      if (c === "kleb") return "res-k-pneumoniae";
      return "res-enterobacter";
    }
  },
  {
    id: "gn-bacilli-nlf",
    question: "Oxidase test result?",
    helper: "Pseudomonas spp. are oxidase positive.",
    options: [
      { value: "pos", title: "Oxidase positive", description: "Suggestive of Pseudomonas aeruginosa" },
      { value: "neg", title: "Oxidase negative", description: "Suggestive of Enterobacteriaceae (NLF)" }
    ],
    next: (c) => (c === "pos" ? "res-p-aeruginosa" : "gn-bacilli-nlf-entero")
  },
  {
    id: "gn-bacilli-nlf-entero",
    question: "H2S production and motility?",
    helper: "Salmonella: H2S+, motile; Shigella: H2S-, non-motile; Proteus: H2S+, swarming.",
    options: [
      { value: "salmonella", title: "H2S positive, motile", description: "Suggestive of Salmonella spp." },
      { value: "shigella", title: "H2S negative, non-motile", description: "Suggestive of Shigella spp." },
      { value: "proteus", title: "H2S positive, swarming motility", description: "Suggestive of Proteus spp." }
    ],
    next: (c) => {
      if (c === "salmonella") return "res-salmonella";
      if (c === "shigella") return "res-shigella";
      return "res-proteus";
    }
  },
  { id: "res-s-aureus", result: { name: "Staphylococcus aureus (probable)", description: "GP cocci in clusters, catalase+, coagulase+.", features: ["GP cocci in clusters", "Catalase +", "Coagulase +"], notes: "Coagulase positive is the key finding." } },
  { id: "res-cons", result: { name: "Coagulase-negative Staphylococcus spp. (probable)", description: "GP cocci in clusters, catalase+, coagulase-.", features: ["GP cocci in clusters", "Catalase +", "Coagulase -"], notes: "Includes S. epidermidis, S. saprophyticus." } },
  { id: "res-strep-pyogenes", result: { name: "Streptococcus pyogenes (GAS, probable)", description: "GP cocci in chains, catalase-, beta-hemolytic.", features: ["GP cocci in chains", "Catalase -", "Beta-hemolytic"], notes: "PYR+ / bacitracin sensitive." } },
  { id: "res-strep-pneumoniae", result: { name: "Streptococcus pneumoniae (probable)", description: "GP diplococci, alpha-hemolytic.", features: ["GP diplococci", "Alpha-hemolytic", "Optochin sensitive"], notes: "Lancet-shaped diplococci." } },
  { id: "res-enterococcus", result: { name: "Enterococcus spp. (probable)", description: "GP cocci, catalase-, gamma-hemolytic.", features: ["GP cocci", "Catalase -", "Bile-esculin +", "6.5% NaCl +"], notes: "VRE is possible." } },
  { id: "res-b-anthracis", result: { name: "Bacillus anthracis (HIGH ALERT)", description: "Large GP rods, spore+, non-motile, non-hemolytic.", features: ["Large GP rods", "Spore +", "Non-motile"], notes: "SELECT AGENT - report immediately." } },
  { id: "res-b-cereus", result: { name: "Bacillus cereus (probable)", description: "Large GP rods, spore+, motile, beta-hemolytic.", features: ["Large GP rods", "Spore +", "Motile", "Beta-hemolytic"], notes: "Food poisoning." } },
  { id: "res-l-monocytogenes", result: { name: "Listeria monocytogenes (probable)", description: "GP short rods, catalase+, tumbling motility.", features: ["GP short rods", "Catalase +", "Tumbling motility"], notes: "Grows at refrigeration temperature." } },
  { id: "res-corynebacterium", result: { name: "Corynebacterium spp. (probable)", description: "Pleomorphic GP rods, catalase+, non-motile.", features: ["Pleomorphic GP rods", "Catalase +", "Non-motile"], notes: "Diphtheroids are common." } },
  { id: "res-erysipelothrix", result: { name: "Erysipelothrix rhusiopathiae (probable)", description: "Slender GP rods, catalase-, H2S+.", features: ["Slender GP rods", "Catalase -", "H2S +"], notes: "Zoonotic." } },
  { id: "res-neisseria", result: { name: "Neisseria spp. (probable)", description: "GN diplococci, oxidase+.", features: ["GN diplococci", "Oxidase +"], notes: "Fastidious; chocolate agar." } },
  { id: "res-veillonella", result: { name: "Veillonella spp. (probable)", description: "GN cocci, oxidase-.", features: ["GN cocci", "Oxidase -"], notes: "Anaerobic." } },
  { id: "res-e-coli", result: { name: "Escherichia coli (probable)", description: "GN rods, LF, indole+, motile.", features: ["GN rods", "LF", "Indole +", "Motile"], notes: "IMViC: + + - -." } },
  { id: "res-k-pneumoniae", result: { name: "Klebsiella pneumoniae (probable)", description: "GN rods, mucoid LF, non-motile.", features: ["GN rods", "Mucoid LF", "Non-motile"], notes: "IMViC: - - + +." } },
  { id: "res-enterobacter", result: { name: "Enterobacter spp. (probable)", description: "GN rods, LF, motile.", features: ["GN rods", "LF", "Motile"], notes: "IMViC: - - + +." } },
  { id: "res-p-aeruginosa", result: { name: "Pseudomonas aeruginosa (probable)", description: "GN rods, NLF, oxidase+.", features: ["GN rods", "NLF", "Oxidase +", "Pigment"], notes: "Grape-like odor." } },
  { id: "res-salmonella", result: { name: "Salmonella spp. (probable)", description: "GN rods, NLF, H2S+, motile.", features: ["GN rods", "NLF", "H2S +", "Motile"], notes: "Serotyping needed." } },
  { id: "res-shigella", result: { name: "Shigella spp. (probable)", description: "GN rods, NLF, H2S-, non-motile.", features: ["GN rods", "NLF", "H2S -", "Non-motile"], notes: "Highly infectious." } },
  { id: "res-proteus", result: { name: "Proteus spp. (probable)", description: "GN rods, NLF, H2S+, swarming.", features: ["GN rods", "NLF", "Swarming", "H2S +", "Urease +"], notes: "PDA positive." } }
];

const treeEls = {
  questionText: document.getElementById("question-text"),
  options: document.getElementById("options"),
  helper: document.getElementById("helper-text"),
  pathList: document.getElementById("path-list"),
  progress: document.getElementById("progress-fill"),
  questionArea: document.getElementById("question-area"),
  resultArea: document.getElementById("result-area"),
  resultName: document.getElementById("result-name"),
  resultDescription: document.getElementById("result-description"),
  resultFeatures: document.getElementById("result-features"),
  resultNotes: document.getElementById("result-notes"),
  backBtn: document.getElementById("back-btn"),
  resetBtn: document.getElementById("reset-btn"),
  restartBtn: document.getElementById("restart-btn")
};

let treePath = [];

function getTreeNode(id) {
  return treeData.find((n) => n.id === id) || null;
}

function renderTreePath() {
  treeEls.pathList.textContent = "";
  treePath.forEach((item, idx) => {
    const chip = el("div", "path-chip");
    chip.appendChild(el("span", "step", `Step ${idx + 1}`));
    chip.appendChild(document.createTextNode(" · "));
    chip.appendChild(el("span", "label", item.questionLabel || ""));
    chip.appendChild(document.createTextNode(" → "));
    chip.appendChild(el("span", "answer", item.choiceLabel));
    treeEls.pathList.appendChild(chip);
  });
  treeEls.backBtn.disabled = treePath.length === 0;
  treeEls.progress.style.width = `${Math.min(100, (treePath.length / 6) * 100)}%`;
}

function startTree() {
  treePath = [];
  showTreeQuestion("start");
  renderTreePath();
  treeEls.resultArea.hidden = true;
  treeEls.questionArea.hidden = false;
}

function showTreeQuestion(nodeId) {
  const node = getTreeNode(nodeId);
  if (!node) return;
  treeEls.questionText.textContent = node.question;
  treeEls.helper.textContent = node.helper || "";
  treeEls.options.textContent = "";

  node.options.forEach((opt) => {
    const btn = el("button", "option-btn");
    btn.type = "button";
    btn.appendChild(el("span", "option-title", opt.title));
    btn.appendChild(el("span", "option-desc", opt.description));
    btn.addEventListener("click", () => {
      treePath.push({ nodeId: node.id, questionLabel: node.question, choiceLabel: opt.title, choiceValue: opt.value });
      renderTreePath();
      const nextId = typeof node.next === "function" ? node.next(opt.value) : node.next;
      const nextNode = getTreeNode(nextId);
      if (nextNode && nextNode.result) {
        showTreeResult(nextId);
      } else if (nextId) {
        showTreeQuestion(nextId);
      } else {
        showTreeResult(nextId);
      }
    });
    treeEls.options.appendChild(btn);
  });
}

function showTreeResult(nodeId) {
  const node = getTreeNode(nodeId);
  treeEls.questionArea.hidden = true;
  treeEls.resultArea.hidden = false;

  if (!node || !node.result) {
    treeEls.resultName.textContent = "Identification Incomplete";
    treeEls.resultDescription.textContent = "Could not determine a specific result from the current path.";
    treeEls.resultFeatures.textContent = "";
    treeEls.resultNotes.textContent = "Use Back or Reset to revise.";
    return;
  }

  treeEls.resultName.textContent = node.result.name;
  treeEls.resultDescription.textContent = node.result.description;
  treeEls.resultFeatures.textContent = "";
  (node.result.features || []).forEach((f) => treeEls.resultFeatures.appendChild(el("li", "", f)));
  treeEls.resultNotes.textContent = node.result.notes || "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function treeBack() {
  if (treePath.length === 0) return;
  treePath.pop();
  renderTreePath();
  treeEls.resultArea.hidden = true;
  treeEls.questionArea.hidden = false;
  if (treePath.length === 0) {
    startTree();
    return;
  }
  showTreeQuestion(treePath[treePath.length - 1].nodeId);
}

// ---------------------------------------------------------------------------
// Event wiring
// ---------------------------------------------------------------------------
document.getElementById("identify-btn").addEventListener("click", identifyBacteria);

document.getElementById("clear-tests-btn").addEventListener("click", () => {
  document.querySelectorAll("#results-card select").forEach((select) => {
    select.value = "";
  });
  document.getElementById("match-results").hidden = true;
  lastAnalysis = null;
});

document.getElementById("copy-summary-btn").addEventListener("click", () => copyText(buildSummaryText()));

document.getElementById("download-json-btn").addEventListener("click", () => {
  const report = buildReport();
  if (!report) {
    toast("Identify first, then export.");
    return;
  }
  download("bacterial-identification.json", JSON.stringify(report, null, 2), "application/json");
  toast("JSON downloaded.");
});

document.getElementById("download-csv-btn").addEventListener("click", () => {
  const report = buildReport();
  if (!report) {
    toast("Identify first, then export.");
    return;
  }
  const rows = [["rank", "organism", "percent", "matched", "evaluated", "conflicts"]];
  report.matches.forEach((m) => {
    rows.push([m.rank, `"${m.organism.replace(/"/g, '""')}"`, m.percent, m.matched, m.evaluated, m.conflicts]);
  });
  download("bacterial-identification.csv", rows.map((r) => r.join(",")).join("\n"), "text/csv");
  toast("CSV downloaded.");
});

document.getElementById("print-btn").addEventListener("click", () => {
  if (!lastAnalysis) {
    toast("Identify first, then print.");
    return;
  }
  window.print();
});

document.getElementById("save-history-btn").addEventListener("click", saveCurrentToHistory);

document.getElementById("clear-history-btn").addEventListener("click", () => {
  if (!confirm("Delete all saved identifications?")) return;
  persistHistory([]);
  renderHistory();
  toast("History cleared.");
});

document.getElementById("open-glossary-btn").addEventListener("click", openGlossary);
document.getElementById("open-refs-btn").addEventListener("click", openReferences);
document.getElementById("close-refs-btn").addEventListener("click", closeReferences);
document.getElementById("references-backdrop").addEventListener("click", closeReferences);

// --- Image Gallery wiring ---
document.getElementById("gallery-filter-all").addEventListener("click", () => {
  galleryFilter = "all";
  renderGallery();
});
document.getElementById("gallery-filter-gp").addEventListener("click", () => {
  galleryFilter = "gp";
  renderGallery();
});
document.getElementById("gallery-filter-gn").addEventListener("click", () => {
  galleryFilter = "gn";
  renderGallery();
});
document.getElementById("gallery-search").addEventListener("input", (ev) => {
  galleryQuery = ev.target.value;
  renderGallery();
});
document.getElementById("close-glossary-btn").addEventListener("click", closeGlossary);
document.getElementById("glossary-backdrop").addEventListener("click", closeGlossary);
document.getElementById("glossary-search").addEventListener("input", (event) => {
  renderGlossary(event.target.value);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeGlossary();
});

document.querySelectorAll(".nav-link[data-mode]").forEach((btn) => {
  btn.addEventListener("click", () => setMode(btn.dataset.mode));
});

treeEls.backBtn.addEventListener("click", treeBack);
treeEls.resetBtn.addEventListener("click", startTree);
treeEls.restartBtn.addEventListener("click", startTree);

// Tooltips for info icons
(function initTooltips() {
  const tip = document.getElementById("tooltip");
  const place = (icon) => {
    const rect = icon.getBoundingClientRect();
    tip.style.left = `${Math.min(window.innerWidth - 300, Math.max(8, rect.left - 40))}px`;
    tip.style.top = `${rect.bottom + 8}px`;
  };
  const show = (icon, event) => {
    const entry = GLOSSARY[icon.dataset.tip];
    if (!entry) return;
    tip.textContent = `${entry.title}: ${entry.text}`;
    tip.hidden = false;
    place(icon);
    if (event) event.stopPropagation();
  };
  const hide = () => {
    tip.hidden = true;
  };
  document.querySelectorAll(".info-icon").forEach((icon) => {
    icon.setAttribute("tabindex", "0");
    icon.setAttribute("role", "button");
    icon.addEventListener("mouseenter", (e) => show(icon, e));
    icon.addEventListener("mouseleave", hide);
    icon.addEventListener("focus", (e) => show(icon, e));
    icon.addEventListener("blur", hide);
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      if (tip.hidden) show(icon, e);
      else hide();
    });
  });
  document.addEventListener("click", hide);
  window.addEventListener("scroll", hide, true);
})();

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
setMode("results");
startTree();
renderHistory();
