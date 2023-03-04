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

export const STYLES = [
  { value: '', label: 'Select an option' },
  { value: 'FADED', label: 'Faded' },
]

export const SIZES = [
  { value: '', label: 'Select an option' },
  { value: 'SMALL', label: 'Small' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'BIG', label: 'Big' },
  { value: 'EXTRA_BIG', label: 'Extra big' },
]

export const INPUT_DEFAULT = {
  image: {},
  texts: [],
  items: [],
}

export const SIZE_OFFSET = {
  SMALL: { x: 40, y: 25 },
  MEDIUM: { x: 50, y: 35 },
  BIG: { x: 65, y: 45 },
  EXTRA_BIG: { x: 75, y: 55 },
}

export const IMAGE_SIZE = {
  SMALL: 75,
  MEDIUM: 100,
  BIG: 125,
  EXTRA_BIG: 150,
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
