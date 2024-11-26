import React from 'react'

type PriceCardProps = {
    title: string;
    price: number;
    color: "success" | "error" | "primary" | "secondary";
}

const PriceCard = ({ title, price, color }: PriceCardProps) => {
    return (
        <div className="bg-white dark:bg-dark-secondary shadow-md rounded-lg text-center p-4 border-solid w-full">
            <div className="text-lg font-bold text-title dark:text-dark-title">{title}</div>
            <div
                className={`text-4xl font-bold text-center
             ${color === "success" && "text-success" ||
                    color === "error" && "text-error" ||
                    color === "secondary" && "text-secondary" ||
                    "text-primary"
                    }`}>{price.toLocaleString('tr-TR')} ₺</div>
        </div>
    )
}

export default PriceCard