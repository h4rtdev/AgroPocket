import type { Crop, Input, Harvest, HistoryEntry } from "@shared/schema";
import { getCurrentUser } from "./auth";

const CROPS_STORAGE_KEY = "agropocket_crops";
const INPUTS_STORAGE_KEY = "agropocket_inputs";
const HARVESTS_STORAGE_KEY = "agropocket_harvests";
const HISTORY_STORAGE_KEY = "agropocket_history";

// Helper to filter by current user
function filterByUser<T extends { userId: string }>(items: T[]): T[] {
  const user = getCurrentUser();
  if (!user) return [];
  return items.filter(item => item.userId === user.id);
}

// Crops
export function getCrops(): Crop[] {
  const data = localStorage.getItem(CROPS_STORAGE_KEY);
  if (!data) return [];
  try {
    const allCrops = JSON.parse(data);
    return filterByUser(allCrops);
  } catch {
    return [];
  }
}

export function saveCrop(crop: Crop): void {
  const data = localStorage.getItem(CROPS_STORAGE_KEY);
  const allCrops = data ? JSON.parse(data) : [];
  const index = allCrops.findIndex((c: Crop) => c.id === crop.id);
  
  if (index >= 0) {
    allCrops[index] = crop;
  } else {
    allCrops.push(crop);
  }
  
  localStorage.setItem(CROPS_STORAGE_KEY, JSON.stringify(allCrops));
}

export function deleteCrop(id: string): void {
  const data = localStorage.getItem(CROPS_STORAGE_KEY);
  if (!data) return;
  
  const allCrops = JSON.parse(data);
  const filtered = allCrops.filter((c: Crop) => c.id !== id);
  localStorage.setItem(CROPS_STORAGE_KEY, JSON.stringify(filtered));
}

// Inputs
export function getInputs(): Input[] {
  const data = localStorage.getItem(INPUTS_STORAGE_KEY);
  if (!data) return [];
  try {
    const allInputs = JSON.parse(data);
    return filterByUser(allInputs);
  } catch {
    return [];
  }
}

export function saveInput(input: Input): void {
  const data = localStorage.getItem(INPUTS_STORAGE_KEY);
  const allInputs = data ? JSON.parse(data) : [];
  const index = allInputs.findIndex((i: Input) => i.id === input.id);
  
  if (index >= 0) {
    allInputs[index] = input;
  } else {
    allInputs.push(input);
  }
  
  localStorage.setItem(INPUTS_STORAGE_KEY, JSON.stringify(allInputs));
}

export function deleteInput(id: string): void {
  const data = localStorage.getItem(INPUTS_STORAGE_KEY);
  if (!data) return;
  
  const allInputs = JSON.parse(data);
  const filtered = allInputs.filter((i: Input) => i.id !== id);
  localStorage.setItem(INPUTS_STORAGE_KEY, JSON.stringify(filtered));
}

// Harvests
export function getHarvests(): Harvest[] {
  const data = localStorage.getItem(HARVESTS_STORAGE_KEY);
  if (!data) return [];
  try {
    const allHarvests = JSON.parse(data);
    return filterByUser(allHarvests);
  } catch {
    return [];
  }
}

export function saveHarvest(harvest: Harvest): void {
  const data = localStorage.getItem(HARVESTS_STORAGE_KEY);
  const allHarvests = data ? JSON.parse(data) : [];
  const index = allHarvests.findIndex((h: Harvest) => h.id === harvest.id);
  
  if (index >= 0) {
    allHarvests[index] = harvest;
  } else {
    allHarvests.push(harvest);
  }
  
  localStorage.setItem(HARVESTS_STORAGE_KEY, JSON.stringify(allHarvests));
}

export function deleteHarvest(id: string): void {
  const data = localStorage.getItem(HARVESTS_STORAGE_KEY);
  if (!data) return;
  
  const allHarvests = JSON.parse(data);
  const filtered = allHarvests.filter((h: Harvest) => h.id !== id);
  localStorage.setItem(HARVESTS_STORAGE_KEY, JSON.stringify(filtered));
}

// History
export function getHistory(): HistoryEntry[] {
  const data = localStorage.getItem(HISTORY_STORAGE_KEY);
  if (!data) return [];
  try {
    const allHistory = JSON.parse(data);
    return filterByUser(allHistory);
  } catch {
    return [];
  }
}

export function addHistoryEntry(entry: Omit<HistoryEntry, "id" | "userId" | "timestamp">): void {
  const user = getCurrentUser();
  if (!user) return;
  
  const data = localStorage.getItem(HISTORY_STORAGE_KEY);
  const allHistory = data ? JSON.parse(data) : [];
  
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    userId: user.id,
    timestamp: new Date().toISOString(),
  };
  
  allHistory.push(newEntry);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(allHistory));
}
