/********************************************************
 * User
 ********************************************************/
export interface User {}

export interface UpdatedUserData {
  username?: string;
  email?: string;
  role?: string;
}

/********************************************************
 * Profile
 ********************************************************/

type userGender = 'MALE' | 'FEMALE' | 'OTHER';
type gardernerLevels = 'AMATEUR' | 'INTERMEDIATE' | 'PRO';

interface SocialLinks {
  name: string;
  url: string;
  username?: string;
}
export interface RegisterProfileData {
  fullname: string;
  phone?: string;
  region?: string;
  address?: string;

  birthday?: Date;
  gender: userGender;

  avatar?: string;
  bio?: string;
  gardernerLevel: gardernerLevels | 'AMATEUR';
  socialLinks?: SocialLinks[];
}

export interface UpdateProfileData {
  fullname?: string;
  phone?: string;
  region?: string;
  address?: string;

  birthday?: Date;
  gender?: userGender;

  avatar?: string;
  bio?: string;
  socialLinks?: SocialLinks[];
}

/******************************************************
 * Product
 ******************************************************/
type productCategory = 'PLANT' | 'FERTILIZER' | 'FLOWERPOT' | 'TOOL' | 'OTHER';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: productCategory;
  image: string[];
}
export interface NewProduct {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: productCategory;
  image: string[];
}

/******************************************************
 * Plant
 ******************************************************/

type wateringMode = 'HIGH' | 'MODERATE' | 'LOW';
type lightType =
  | 'FULL_SUNLIGHT'
  | 'PARTIAL_LIGHT'
  | 'INDIRECT_SUNLIGHT'
  | 'DAPPLED_LIGHT'
  | 'SHADE';
type weatherType =
  | 'CLEAR'
  | 'CLOUDY'
  | 'PARTIALLY_CLOUDLY'
  | 'OVERCAST'
  | 'GLOOMY'
  | 'BRIGHT'
  | 'DARK'
  | 'FOGGY'
  | 'MISTY'
  | 'HAZY'
  | 'DAMP';

export interface NewPlantDetails {
  id: string;
  name: string;
  type: string;
  maxHeight?: number;
  wateringMode: wateringMode;
  wateringFrequency?: number;
  weather: weatherType[];
  light: lightType;
  specialCares?: string;
}

export interface UserCart {
  userId: string;
  shoppingItems: ShoppingItems[];
}

export interface ShoppingItems {
  productId: string;
}

/******************************************************
 * PlantOwner
 ******************************************************/
export interface newUserPlantRecord {
  userid: string;
  plant: {
    id: string;
    nickname: string;
  };
}
