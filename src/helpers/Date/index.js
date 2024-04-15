export const MONTHS = {
  0: "janvier",
  1: "février",
  2: "mars",
  3: "avril",
  4: "mai",
  5: "juin",
  6: "juillet",
  7: "août",
  8: "septembre",
  9: "octobre",
  10: "novembre",
  11: "décembre",
};


export const getMonth = (date) => MONTHS[date.getMonth()];
// ce code fournit un moyen de convertir une date JavaScript en une chaîne de caractères représentant le mois en français
