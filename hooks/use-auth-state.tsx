import { useEffect, useState } from "react";
import { getData, removeData } from "~/lib/storage/fn";

export const useAuthState = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const fetchAuth = async () => {
    setLoading(true);
    const token = await getData({ key: "token" });
    const sts = await getData({ key: "status" });

    if (token) {
      setUser(token);
    } else {
      setUser(null);
    }

    if (sts) {
      setStatus(sts);
    } else {
      setStatus(null);
    }

    setLoading(false);
  };

  const logout = async () => {
    await removeData({ key: "token" });
    await removeData({ key: "status" });
    setUser(null);
    setStatus(null);
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  return { user, status, loading, logout };
};
