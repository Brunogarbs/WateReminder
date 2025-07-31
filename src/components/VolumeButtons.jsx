export function VolumeButtons({setAmountDrank}) {
    const volumes = [250, 500, 750, 1000]

    const handleClick = (ml) => {
        setAmountDrank(prev => prev + ml);
    }

    return (
        <div className="flex gap-4">
        {volumes.map((ml) => (
            <button
            key={ml}
            onClick={() => handleClick(ml)}
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full transition-all shadow"
            >
            +{ml}ml
            </button>
        ))}
        </div>
    )   
}

export default VolumeButtons;