import { generateSavingsRecommendations } from '@/helpers/global';
import React from 'react';

interface SavingsCardProps {
    income: number;
    expenses: number;
    onClose: () => void;
}

const SavingsRecommendationCard: React.FC<SavingsCardProps> = ({ income, expenses, onClose }) => {
    const recommendations = generateSavingsRecommendations(income, expenses);
    const savingsRate = ((income - expenses) / income) * 100;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-dark-secondary rounded-lg p-6 max-w-md w-full mx-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4 text-title dark:text-dark-title">Tasarruf Önerileri</h2>
                <div className="mb-6">
                    <p className="text-lg text-title dark:text-dark-title">
                        Tasarruf Oranınız: <span className="font-bold">{savingsRate.toFixed(1)}%</span>
                    </p>
                </div>
                <ul className="space-y-2">
                    {recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span className="text-title dark:text-dark-title">{recommendation}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SavingsRecommendationCard; 