import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getPendingRequests } from "../services/contactService";
import { showNotification } from "../utils/notifications";

const POLL_INTERVAL = 20000;

function ContactRequestNotifier() {
  const { isAuthenticated, userId } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !userId) return undefined;

    const storageKey = `seen-contact-requests:${userId}`;
    const checkForRequests = async () => {
      try {
        const response = await getPendingRequests();
        const requests = response.data || [];
        const savedIds = JSON.parse(localStorage.getItem(storageKey) || "[]");
        const knownIds = new Set(savedIds);
        const newRequests = requests.filter((request) => !knownIds.has(request.contactRequestId));

        newRequests.forEach((request) => {
          showNotification(`New contact request for ${request.foundItemTitle || "one of your found items"}.`, "info");
        });

        localStorage.setItem(storageKey, JSON.stringify(requests.map((request) => request.contactRequestId)));
      } catch {
        // A notification check should never interrupt normal page use.
      }
    };

    checkForRequests();
    const interval = window.setInterval(checkForRequests, POLL_INTERVAL);
    return () => window.clearInterval(interval);
  }, [isAuthenticated, userId]);

  return null;
}

export default ContactRequestNotifier;
