
import { Dispatch, SetStateAction, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Month names 배열
const months: string[] = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Year 배열 생성 (초기 년도부터 현재 년도까지)
const years: number[] = [];
const currentYear: number = new Date().getFullYear();
const initYear: number = 1970; // 초기 설정 년도
for (let i = initYear; i <= currentYear; i++) {
  years.push(i);
}

interface IProps {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  placeholderText?: string;
  width?: number;
  borderRadius?: number;
  dateFormat?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  backgroundColor?: string;
}

const CustomerDatePicker: React.FC<IProps> = ({
  date,
  setDate,
  placeholderText,
  width,
  borderRadius,
  dateFormat,
  disabled,
  minDate,
  maxDate,
  backgroundColor,
}: IProps) => {
  const calRef = useRef<any>();

  return (
    <div className="inline-block">
      <DatePicker
        className={`border-2 border-neutral-light-darkest rounded-lg px-10 py-1 bg-no-repeat bg-right-center ${
          backgroundColor ? backgroundColor : ""
        }`}
        wrapperClassName="w-full"
        calendarClassName="w-300 p-4"
        dayClassName={(date) => {
          return date.getDay() === 0 || date.getDay() === 6 ? "weekend" : "";
        }}
        // monthClassName="mb-8 pb-4 border-b border-neutral-light-darkest"
        // weekClassName="flex justify-around"
        selected={date}
        placeholderText={placeholderText}
        dateFormat={dateFormat ? dateFormat : "yyyy-MM-dd"}
        formatWeekDay={(nameOfday) => nameOfday.toUpperCase().slice(0, 2)}
        onChange={(date) => setDate(date)}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="m-10">
            <div className="float-left">
              <select
                className="appearance-none border-none font-semibold text-base"
                value={months[date.getMonth()]}
                onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                className="appearance-none border-none font-semibold text-base"
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(Number(value))}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="float-right">
              <button
                className="w-12 h-12"
                style={{ backgroundColor: "transparent" }}
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                &lt;
              </button>
              <button
                className="w-12 h-12"
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                  if (maxDate && date && new Date(date.getFullYear(), date.getMonth() + 1, 1) <= maxDate) {
                    increaseMonth();
                  }
                }}
                disabled={nextMonthButtonDisabled}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CustomerDatePicker;