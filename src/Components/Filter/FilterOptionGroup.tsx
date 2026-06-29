interface FilterOption {
    value: string;
    label: string; // те, що показуємо юзеру (може відрізнятись від value)
}

interface FilterOptionGroupProps {
    title: string;
    options: FilterOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
}

export function FilterOptionGroup({ title, options, selectedValue, onSelect }: FilterOptionGroupProps) {
    return (
        <>
            <p>{title}</p>
            <div className="tarifs-choose">
                {options.map(option => (
                    <div
                        key={option.value}
                        className={`tarifs-variant ${selectedValue === option.value ? "selected" : ""}`}
                        onClick={() => onSelect(option.value)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </>
    );
}