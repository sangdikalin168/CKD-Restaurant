import { CalendarIcon } from "@heroicons/react/24/outline";
import Datepicker from "tailwind-datepicker-react";

const options = {
  title: "ថ្ងៃខែឆ្នាំ",
  autoHide: true,
  todayBtn: true,
  clearBtn: false,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-24 left-[40px]",
  defaultDate: new Date(),
  language: "en",
};

export const DateTimePicker = (props: any) => {
  const {
    onChange,
    show,
    setShow,
    value,
  } = props;
  return (
    <div>
      <Datepicker
        options={options}
        onChange={onChange}
        show={show}
        setShow={setShow}
      >
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-black-500 sm:text-sm">
              <CalendarIcon className="h-4 w-4 -ml-0.5 mr-1.5" />
            </span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            className="block w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={value}
            onFocus={() => setShow(true)}
            readOnly
            placeholder={value}
          />
        </div>
      </Datepicker>
    </div>
  );
};
