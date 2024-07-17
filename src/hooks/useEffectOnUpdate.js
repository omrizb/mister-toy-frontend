import { useEffect, useRef } from 'react'

export function useEffectOnUpdate(func, dep) {
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) isFirstRender.current = false
        else func()
    }, dep)
}