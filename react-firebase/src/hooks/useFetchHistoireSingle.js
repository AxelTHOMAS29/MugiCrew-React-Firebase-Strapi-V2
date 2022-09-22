import { useEffect, useState } from 'react';

const useFetchHistoireSingle = (url) => {
    const [dataHistoireSingle, setDataHistoireSingle] = useState(null)
    const [errorHistoireSingle, setErrorHistoireSingle] = useState(null)
    const [loadingHistoireSingle, setLoadingHistoireSingle] = useState(true)

    useEffect(() => {
        const fetchDataHistoireSingle = async () => {
            setLoadingHistoireSingle(true)

            try {
                const res = await fetch(url)
                const json = await res.json()

                setDataHistoireSingle(json)
                setLoadingHistoireSingle(false)
            } catch(error) {
                setErrorHistoireSingle(error)
                setLoadingHistoireSingle(false)
            }
        }
        fetchDataHistoireSingle()
    }, [url])

    return {loadingHistoireSingle, errorHistoireSingle, dataHistoireSingle}
}



export default useFetchHistoireSingle;