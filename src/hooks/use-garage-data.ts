import { useEffect } from 'react'
import { useGarageStore } from '@/stores/garage-store'
import type { GarageWithRole } from '@/types/garage'

interface UseGarageDataOptions {
  garageId: string
  refetch?: boolean // Force refetch even if cached
}

export function useGarageData({ garageId, refetch = false }: UseGarageDataOptions) {
  const { 
    getGarage, 
    setGarage, 
    setLoading, 
    isLoading,
    setCurrentGarageId,
    invalidateGarage
  } = useGarageStore()

  const cachedGarage = getGarage(garageId)
  const loading = isLoading(garageId)

  useEffect(() => {
    setCurrentGarageId(garageId)
  }, [garageId, setCurrentGarageId])

  useEffect(() => {
    // If we have cached data and not forcing refetch, don't fetch
    if (cachedGarage && !refetch) {
      return
    }

    // If already loading, don't fetch again
    if (loading) {
      return
    }

    const fetchGarage = async () => {
      setLoading(garageId, true)
      
      try {
        const response = await fetch(`/api/v1/garages/${garageId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch garage')
        }

        const data = await response.json()
        
        if (data.success && data.garage) {
          setGarage(garageId, data.garage)
        }
      } catch (error) {
        console.error('Failed to fetch garage:', error)
      } finally {
        setLoading(garageId, false)
      }
    }

    fetchGarage()
  }, [garageId, cachedGarage, refetch, loading, setGarage, setLoading])

  const refetchGarage = () => {
    invalidateGarage(garageId)
    // Trigger refetch by invalidating cache
    setLoading(garageId, false)
  }

  return {
    garage: cachedGarage,
    loading,
    refetch: refetchGarage,
  }
}
