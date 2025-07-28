export function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
        console.log('Permissão:', permission);
    });

}

export function showNotification(){
    if (Notification.permission === "granted") {
        new Notification("🚰 Hora de beber água!", {
            body: "Não esqueça de se hidratar para manter o foco e a saúde."});
    }
}
