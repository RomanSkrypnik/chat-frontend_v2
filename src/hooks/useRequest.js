import {useEffect, useState} from "react";

export default function useRequest(request) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(function () {
       setLoading(true);
       request()
           .then(data => setData(data))
           .catch(error => setError(error))
           .finally(() => setLoading(false))
    }, []);

    return [data, loading, error];
}
