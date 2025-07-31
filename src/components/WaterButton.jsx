import { useEffect, useState } from "react";
import { requestNotificationPermission, showNotification } from "./Notification";

export function WaterButton({ amountDrank, goal, setAmountDrank, lastDrink, setLastDrink, intervalMinutes, setIntervalMinutes }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showReminder, setShowReminder] = useState(false);
    const CUP_SIZE = 250
    
    function getDate(){
        return new Date().toISOString().split('T')[0];
    }

    const getMinutesSince = (lastTime) =>{
        const now = new Date();
        const then = new Date(lastTime);
        return (now - then) / (1000 * 60);
    };

    useEffect(() => {
        const savedAmountDrank = localStorage.getItem('water-amountDrank');
        const savedDate = localStorage.getItem('water-date');
        const savedLastTime = localStorage.getItem('water-lastTime');
        const savedInterval = localStorage.getItem('water-reminder-interval');
        const today = getDate();

        if (savedDate === today) {
            if (savedAmountDrank !== null) setAmountDrank(Number(savedAmountDrank));
            if (savedLastTime) setLastDrink(savedLastTime);
        } else {
            setAmountDrank(0);
            setLastDrink(null);
            localStorage.setItem('water-amountDrank', 0);
            localStorage.setItem('water-date', today);
            localStorage.removeItem('water-lastTime');
        }

        if (savedInterval !== null) {
            setIntervalMinutes(Number(savedInterval));
        }

        setIsLoaded(true);
        requestNotificationPermission();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('water-amountDrank', amountDrank);
            localStorage.setItem('water-date', getDate());
            if (lastDrink) {
                localStorage.setItem('water-lastTime', lastDrink);
            }
            localStorage.setItem('water-reminder-interval', intervalMinutes);
        }
    }, [amountDrank, lastDrink, intervalMinutes, isLoaded]);

    useEffect(() => {
    const interval = setInterval(() => {
        if (lastDrink) {
        const minutes = getMinutesSince(lastDrink);
            if (minutes >= intervalMinutes && amountDrank < goal) {
            setShowReminder(true);
            showNotification();  // <-- aqui dispara a notificação do navegador
        } else {
            setShowReminder(false);
        }
        } else {
        setShowReminder(true);
        showNotification(); // no caso de nunca ter bebido
        }
    }, 10000); // pode deixar 1 minuto pra não spam

  return () => clearInterval(interval);
}, [lastDrink, intervalMinutes]);


    function handleDrink() {
        setAmountDrank((prev) => prev + CUP_SIZE);
        setLastDrink(new Date().toISOString());
        setShowReminder(false);
    }

    function handleReset() {
        setAmountDrank(0);
        setLastDrink(null);
        localStorage.setItem('water-amountDrank', 0);
        localStorage.removeItem('water-lastTime');
        setShowReminder(false);
    }

    return (
        <div className="text-center mt-10">
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Tempo entre lembretes (minutos):
                </label>
                <input
                    type="number"
                    value={intervalMinutes}
                    onChange={(e) => setIntervalMinutes(Number(e.target.value))}
                    className="w-32 px-3 py-1 border border-gray-300 rounded"
                    min={1}
                />
            </div>
            <h2 className="text-2xl mb-4">Você bebeu água {(amountDrank / 1000).toFixed(2)} litros hoje</h2>

            {showReminder && (
                <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded">
                    🚨 Ei! Não esqueça de beber água!
                </div>
            )}

            <button
                onClick={handleDrink}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Beber água 💧
            </button>

            <button
                onClick={handleReset}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                style={{ marginLeft: '10px' }}>
                <span className="text-red-500">🗑️ Resetar</span>
            </button>
        </div>
    );
}
