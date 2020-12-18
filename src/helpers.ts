export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const weekDaysInitials = [
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
];

export function getTime(date: Date) {
    let hours: any = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const suffix = hours < 12 ? "am" : "pm";
    hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    hours = hours.toString().padStart(2, "0");
    return `${hours}:${minutes} ${suffix}`;
}
