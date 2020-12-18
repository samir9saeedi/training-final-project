import { months, weekDaysInitials } from "../helpers";
import { addDays, addMonths, startOfMonth, endOfMonth } from "date-fns";
import { useState } from "react";

function DatePicker({
    value,
    handleChange,
    className,
}: {
    value: Date;
    handleChange: Function;
    className: string;
}) {
    const [pickerShown, setPickerShown] = useState(false);
    const [start, setStart] = useState(startOfMonth(value));
    const end = endOfMonth(start);

    // Account for empty cells at start of the month
    let dates = [new Array(start.getDay()).fill("")];

    for (let date = start; date <= end; date = addDays(date, 1)) {
        // Create new row if the current week is exhaused
        if (dates[dates.length - 1].length === 7) {
            dates.push([]);
        }

        dates[dates.length - 1].push(date);
    }

    // Account for empty cells at end of the month
    dates[dates.length - 1] = dates[dates.length - 1].concat(
        new Array(6 - end.getDay()).fill("")
    );

    function handleMonthChange(change: number) {
        setStart(addMonths(start, change));
    }

    function handleInputClick() {
        setPickerShown(true);
    }

    return (
        <>
            <span onClick={handleInputClick} className={className}>{value.toLocaleDateString()}</span>
            <div className="p-6 border">
                <span className="text-gray-500">Date Range Picker</span>
                <div className="flex justify-between mt-8">
                    <button
                        className="text-gray-500"
                        type="button"
                        onClick={() => handleMonthChange(-1)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <span className="font-bold">{`${
                        months[start.getMonth()]
                    } ${start.getFullYear()}`}</span>
                    <button
                        className="text-gray-500"
                        type="button"
                        onClick={() => handleMonthChange(1)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>

                <table className="w-full mt-6 text-center table-fixed">
                    <thead>
                        <tr className="font-bold text-gray-500 border-b">
                            {weekDaysInitials.map((o, i) => (
                                <th className="w-12 h-10" key={i}>
                                    {o}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dates.map((o, i) => (
                            <tr key={"row-" + i}>
                                {o.map((p, j) => (
                                    <td className="w-12 h-12" key={"cell-" + j}>
                                        {p ? (
                                            <button
                                                className={`w-full h-full hover:bg-blue-100 text-gray-700 rounded-full ${
                                                    p.getDate() ===
                                                        value.getDate() &&
                                                    p.getMonth() ===
                                                        value.getMonth() &&
                                                    p.getFullYear() ===
                                                        value.getFullYear()
                                                        ? "font-bold bg-yellow-100 text-yellow-500"
                                                        : ""
                                                }`}
                                                type="button"
                                                onClick={() => handleChange(p)}
                                            >
                                                {p.getDate()}
                                            </button>
                                        ) : (
                                            p
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DatePicker;
