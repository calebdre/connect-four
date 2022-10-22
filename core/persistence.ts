import {useMutation, useQuery, useQueryClient} from 'react-query';
import {Player} from "./types";

type PersistedQuery<T> = {
    value: T | undefined
    setValue: (value: T) => void
}

export const usePlayer = () => usePersistentLocalStorage<Player>('player', undefined)

function usePersistentLocalStorage<T>(key: string, defaultValue: T | undefined = undefined): PersistedQuery<T> {
    const queryClient = useQueryClient()

    const getStorageItem = (): T | undefined => {
        if (typeof window !== 'undefined') {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : defaultValue
        }

        return defaultValue
    }

    const { data } = useQuery<T | undefined>(key, getStorageItem, {
        initialData: getStorageItem()
    })

    const setStorageItem = (value: T): Promise<T> => {
        return new Promise((resolve) => {
            localStorage.setItem(key, JSON.stringify(value))
            resolve(value)
        })
    }

    const {mutateAsync: setValue} = useMutation(
        (value: T) => setStorageItem(value),
        {
            onMutate: (mutatedData) => {
                const current = data
                queryClient.setQueryData(key, mutatedData)
                return current
            },
            onError: (_, __, rollback) => {
                queryClient.setQueryData(key, rollback)
            }
        }
    )
    return {
        value: data,
        setValue
    }
}