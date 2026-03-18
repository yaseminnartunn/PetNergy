export type PetType = "Kedi" | "Köpek" | "Balık" | "Mini Canavar";

export type PetHabitat = "Şehir Çatı" | "Bulut Park" | "Mercan Koyu";

export type PetAccessory = "Parlak Fiyonk" | "Mini Pelerin" | "Yıldız Tasması";

export type PetStats = {
  health: number; // 0-100
  energy: number; // 0-100
  hunger: number; // 0-100 (yüksek = daha aç)
  happiness: number; // 0-100
  cleanliness: number; // 0-100
};

export type PetCurrency = {
  coins?: number;
  gems?: number;
};

export type DailyQuestStatus = "active" | "completed" | "claimed";

export type DailyQuest = {
  id: string;
  status: DailyQuestStatus;
  progress?: number;
  target?: number;
};

export type PetAppearance = {
  habitat?: PetHabitat;
  accessory?: PetAccessory;
  color?: `#${string}`;
  avatarKey?: string;
};

export type Pet = {
  id: string;
  ownerId?: string;
  name: string;
  type: PetType;
  level: number;
  xp: number;
  xpToNextLevel?: number;
  appearance?: PetAppearance;
  stats: PetStats;
  currency?: PetCurrency;
  achievements?: string[];
  dailyQuests?: DailyQuest[];
  lastCareAt?: string; // ISO 8601
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  version?: number;
};

