import { create } from 'zustand'
import type { GarageWithRole } from '@/types/garage'

interface GarageState {
  // Cache of garage data by garageId
  garages: Record<string, GarageWithRole>
  
  // Currently selected garage
  currentGarageId: string | null
  
  // Loading states
  loading: Record<string, boolean>
  
  // Actions
  setGarage: (garageId: string, garage: GarageWithRole) => void
  getGarage: (garageId: string) => GarageWithRole | undefined
  setCurrentGarageId: (garageId: string) => void
  setLoading: (garageId: string, loading: boolean) => void
  isLoading: (garageId: string) => boolean
  invalidateGarage: (garageId: string) => void
  clearCache: () => void
}

export const useGarageStore = create<GarageState>((set, get) => ({
  garages: {},
  currentGarageId: null,
  loading: {},
  
  setGarage: (garageId, garage) => 
    set((state) => ({
      garages: { ...state.garages, [garageId]: garage },
    })),
  
  getGarage: (garageId) => get().garages[garageId],
  
  setCurrentGarageId: (garageId) => 
    set({ currentGarageId: garageId }),
  
  setLoading: (garageId, loading) =>
    set((state) => ({
      loading: { ...state.loading, [garageId]: loading },
    })),
  
  isLoading: (garageId) => get().loading[garageId] ?? false,
  
  invalidateGarage: (garageId) =>
    set((state) => {
      const { [garageId]: _, ...rest } = state.garages
      return { garages: rest }
    }),
  
  clearCache: () => set({ garages: {}, loading: {} }),
}))
