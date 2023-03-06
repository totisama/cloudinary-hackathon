export const API_URL = 'https://api.cloudinary.com/v1_1/totisama/image/upload'

export const POSITIONS = [
  { value: '', label: 'Select an option' },
  { value: 'TOP_LEFT', label: 'Top left' },
  { value: 'TOP_CENTER', label: 'Top center' },
  { value: 'TOP_RIGHT', label: 'Top right' },
  { value: 'CENTER_LEFT', label: 'Center left' },
  { value: 'CENTER', label: 'Center' },
  { value: 'CENTER_RIGHT', label: 'Center right' },
  { value: 'BOTTOM_LEFT', label: 'Bottom left' },
  { value: 'BOTTOM_CENTER', label: 'Bottom center' },
  { value: 'BOTTOM_RIGHT', label: 'Bottom right' },
]

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

export const SIZES = [
  { value: '', label: 'Select an option' },
  { value: 'SMALL', label: 'Small' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'BIG', label: 'Big' },
  { value: 'EXTRA_BIG', label: 'Extra big' },
]

export const DEFAULT_VALUES = {
  image: {},
  background: {},
  texts: [],
  items: [],
}

export const SIZE_OFFSET = {
  HORIZONTAL: {
    SMALL: { x: 37, y: 24 },
    MEDIUM: { x: 50, y: 32 },
    BIG: { x: 62, y: 40 },
    EXTRA_BIG: { x: 87, y: 57 },
  },
  VERTICAL: {
    SMALL: { x: 37, y: 46 },
    MEDIUM: { x: 50, y: 62 },
    BIG: { x: 62, y: 77 },
    EXTRA_BIG: { x: 73, y: 88 },
  },
  SQUARED: {
    SMALL: { x: 37, y: 37 },
    MEDIUM: { x: 50, y: 50 },
    BIG: { x: 62, y: 62 },
    EXTRA_BIG: { x: 87, y: 87 },
  },
}

export const IMAGE_SIZE = {
  SMALL: 75,
  MEDIUM: 100,
  BIG: 125,
  EXTRA_BIG: 175,
}

export const OFFSET_SIGN = {
  TOP_LEFT: { x: '-', y: '-' },
  TOP_CENTER: { x: '', y: '-' },
  TOP_RIGHT: { x: '', y: '-' },
  CENTER_LEFT: { x: '-', y: '' },
  CENTER: { x: '', y: '' },
  CENTER_RIGHT: { x: '', y: '' },
  BOTTOM_LEFT: { x: '-', y: '' },
  BOTTOM_CENTER: { x: '', y: '' },
  BOTTOM_RIGHT: { x: '', y: '' },
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
