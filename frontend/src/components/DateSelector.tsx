interface DateSelectorProps {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const DateSelector = ({ dates, selectedDate, onSelectDate }: DateSelectorProps) => {
  const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return { day, month };
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Choose date</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {dates.map((date) => {
          const { day, month } = formatDateLabel(date);
          const isSelected = date === selectedDate;
          
          return (
            <button
              key={date}
              onClick={() => onSelectDate(date)}
              className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-xs text-gray-600">{month}</div>
                <div className="text-lg font-semibold">{day}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelector;