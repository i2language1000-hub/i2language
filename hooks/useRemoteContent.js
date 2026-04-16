import { useEffect, useState } from 'react';
import { getContentItems } from '../lib/api';

export function useRemoteContent(type, fallbackItems) {
  const [items, setItems] = useState(fallbackItems);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getContentItems(type)
      .then((remoteItems) => {
        if (isMounted && remoteItems.length > 0) {
          setItems(remoteItems);
        }
      })
      .catch(() => {
        if (isMounted) {
          setItems(fallbackItems);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [fallbackItems, type]);

  return { items, isLoading, setItems };
}
