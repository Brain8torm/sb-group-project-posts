import { useEffect, useState } from 'react';

export const useApi = (handler) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        handler()
            .then((result) => setData(result))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [handler]);

    return { data, setData, loading, error };
};
