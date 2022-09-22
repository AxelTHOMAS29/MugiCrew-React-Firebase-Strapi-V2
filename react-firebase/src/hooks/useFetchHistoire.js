import { useEffect, useState } from 'react';

const useFetchHistoire = (url) => {
    const [dataHistoire, setDatadataHistoire] = useState(null)
    const [errorHistoire, setErrordataHistoire] = useState(null)
    const [loadingHistoire, setLoadingdataHistoire] = useState(true)

    useEffect(() => {
        const fetchDatadataHistoire = async () => {
            setLoadingdataHistoire(true)

            try {
                const res = await fetch(url)
                const json = await res.json()

                setDatadataHistoire(json)
                setLoadingdataHistoire(false)
            } catch(error) {
                setErrordataHistoire(error)
                setLoadingdataHistoire(false)
            }
        }
        fetchDatadataHistoire()
    }, [url])

    return {loadingHistoire, errorHistoire, dataHistoire}
}



export default useFetchHistoire;