interface CalorieDisplayProps {
    calories: number
    text: string
    type: 'consumed' | 'burned' | 'net'
}

export const CalorieDisplay = ({ calories, text, type }: CalorieDisplayProps) => {
    const colors = {
        consumed: {
            bg: 'bg-sky-100',
            ring: 'ring-sky-300',
            icon: '🍔',
            text: 'text-sky-700'
        },
        burned: {
            bg: 'bg-pink-100',
            ring: 'ring-pink-300',
            icon: '🏃🏻‍♂️',
            text: 'text-pink-700'
        },
        net: {
            bg: 'bg-violet-100',
            ring: 'ring-violet-300',
            icon: '⚖️',
            text: 'text-violet-700'
        }
    }

    const style = colors[type]

    return (
        <div
            className={`relative rounded-3xl p-6 ${style.bg} shadow-lg ring-2 ${style.ring} transition-all flex flex-col items-center backdrop-blur-md`}
        >
            <div className="absolute -top-6 bg-white text-3xl rounded-full p-3 shadow-md">
                {style.icon}
            </div>
            <p className={`mt-8 text-5xl font-black ${style.text}`}>
                {calories}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-600 tracking-wide uppercase">
                {text}
            </p>
        </div>
    )
}
