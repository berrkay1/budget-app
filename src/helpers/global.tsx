import { BudgetCategories, ExpenseLimitType } from "@/model/global";


export const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number, index: number }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


export const expenseLimits: ExpenseLimitType[] = [
    { category: BudgetCategories.Education, limit: 8000 },
    { category: BudgetCategories.Food, limit: 5000 },
    { category: BudgetCategories.Transportation, limit: 1000 },
    { category: BudgetCategories.Health, limit: 7000 },
    { category: BudgetCategories.Shopping, limit: 5000 },
    { category: BudgetCategories.Rent, limit: 10000 },
    { category: BudgetCategories.Other, limit: 5000 },
];


export const categoriesNames = (category: BudgetCategories) => {
    switch (category) {
        case BudgetCategories.Education:
            return "Eğitim";
        case BudgetCategories.Food:
            return "Yiyecek";
        case BudgetCategories.Transportation:
            return "Ulaştırma";
        case BudgetCategories.Health:
            return "Sağlık";
        case BudgetCategories.Shopping:
            return "Alışveriş";
        case BudgetCategories.Rent:
            return "Kira";
        case BudgetCategories.Other:
            return "Diğer";
        default:
            return "";
    }
}

export const generateSavingsRecommendations = (income: number, expenses: number) => {
    const savingsRate = ((income - expenses) / income) * 100;

    const recommendations = {
        excellent: [
            "Gelirinizin %20'sinden fazlasını biriktiriyorsunuz.",
            "Düşük riskli yatırım fonlarını değerlendirebilirsiniz.",
            "Acil durum fonunuzu güçlendirebilirsiniz."
        ],
        good: [
            "Gelirinizin %10-20'sini biriktiriyorsunuz.",
            "Emeklilik planlamanızı gözden geçirin.",
            "Ek gelir kaynakları araştırın"
        ],
        average: [
            "Gelirinizin %5-10'unu biriktiriyorsunuz.",
            "Gereksiz abonelikleri iptal edin",
            "Maliyet tasarrufu yapabileceğiniz alanları belirleyin"
        ],
        poor: [
            "Tasarruf oranınız düşük.",
            "Harcamalarınızı detaylı olarak gözden geçirin",
            "Gelir artırıcı fırsatları değerlendirin"
        ]
    };

    if (savingsRate > 20) return recommendations.excellent;
    if (savingsRate > 10) return recommendations.good;
    if (savingsRate > 5) return recommendations.average;
    return recommendations.poor;
};
