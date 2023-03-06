export const API_URL = 'https://api.cloudinary.com/v1_1/totisama/image/upload'

export const EFFECTS = [
  { value: 'VIGNETTE', label: 'Vignette' },
  { value: 'SEPIA', label: 'Sepia' },
  { value: 'GRAYSCALE', label: 'Grayscale' },
  { value: 'OILPAINT', label: 'Oil Paint' },
  { value: 'CARTOONIFY', label: 'Cartoonify' },
  { value: 'BLACK_WHITE', label: 'Black and white' },
  { value: 'NEGATE', label: 'Negate' },
  { value: 'DITHER', label: 'Dither' },
  { value: 'VECTORIZE', label: 'Vectorize' },
  { value: 'GRADIENT_FADE', label: 'Gradient fade' },
  { value: 'ASSIST_COLOR_BLIND', label: 'Assist color blind' },
  { value: 'SIMULATE_COLOR_BLIND', label: 'Simulate color blind' },
]

export const DEFAULT_VALUES = {
  image: {},
  background: {},
  texts: [],
  items: [],
}

export const ITEMS = [
  { value: '', label: 'Select an option' },
  { value: 'BALLON', label: 'Balloon' },
  { value: 'CAR', label: 'Blue Car' },
  { value: 'FLOWER', label: 'Flower' },
  { value: 'ROSE', label: 'Rose' },
  { value: 'SOCCER_BALL', label: 'Soccer Ball' },
  { value: 'CONFETI', label: 'Confeti' },
]

export const ITEM_CLOUDINARY_NAME = {
  BALLON: 'otyuvaztntvaqzzgb68m.png',
  CAR: 'jwsuyecqmf29edvq9u1s.png',
  FLOWER: 'ywt0a4zj3mnuuwzrmfl7.png',
  ROSE: 'y27lmguhgfvwdab5vyjq.png',
  SOCCER_BALL: 'hytxeeapzqsqxg8w6kxq.png',
  CONFETI: 'tw09grlidcfgzd9m8qyh.png',
}
