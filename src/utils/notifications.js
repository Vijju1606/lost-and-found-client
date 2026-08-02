let notificationTimer;
let activeConfirmation;

export function showNotification(message, type = "info") {
    let toast = document.getElementById("app-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "app-notification";
        toast.className = "app-notification";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `app-notification is-visible ${type}`;
    clearTimeout(notificationTimer);
    notificationTimer = setTimeout(() => toast.classList.remove("is-visible"), 3500);
}

export function confirmAction({ title = "Are you sure?", message = "This action cannot be undone.", confirmLabel = "Confirm", destructive = false } = {}) {
    activeConfirmation?.remove();
    return new Promise((resolve) => {
        const overlay = document.createElement("div");
        overlay.className = "app-confirm-overlay";
        overlay.innerHTML = `<div class="app-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="app-confirm-title"><div class="app-confirm-icon ${destructive ? "danger" : ""}">${destructive ? "!" : "?"}</div><h2 id="app-confirm-title"></h2><p></p><div class="app-confirm-actions"><button type="button" class="app-confirm-cancel">Cancel</button><button type="button" class="app-confirm-accept ${destructive ? "danger" : ""}"></button></div></div>`;
        overlay.querySelector("h2").textContent = title;
        overlay.querySelector("p").textContent = message;
        overlay.querySelector(".app-confirm-accept").textContent = confirmLabel;
        const close = (result) => { overlay.remove(); if (activeConfirmation === overlay) activeConfirmation = null; resolve(result); };
        overlay.querySelector(".app-confirm-cancel").addEventListener("click", () => close(false));
        overlay.querySelector(".app-confirm-accept").addEventListener("click", () => close(true));
        overlay.addEventListener("click", (event) => { if (event.target === overlay) close(false); });
        document.body.appendChild(overlay);
        activeConfirmation = overlay;
        overlay.querySelector(".app-confirm-cancel").focus();
    });
}
