import { StateCreator, create } from 'zustand'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, PersistOptions } from "zustand/middleware";
import { FoodItem } from "../interfaces";
import asyncStorageAdapter from './asyncStorageAdapter';

interface UserFoodState {
    foodList: FoodItem[];
    setFoodList: (food: FoodItem[]) => void;
  }

type FoodsPersist = (
    config: StateCreator<UserFoodState>,
    options: PersistOptions<UserFoodState>
  ) => StateCreator<UserFoodState>;
  
export const useFoodsPersistentStore = create<UserFoodState>(
    (persist as unknown as FoodsPersist)(
      (set) => ({
        foodList: [],
        setFoodList: (foodList) => set({ foodList }),
      }),
      {
        name: "user-foods-storage",
        storage: asyncStorageAdapter,
      }
    )
  );