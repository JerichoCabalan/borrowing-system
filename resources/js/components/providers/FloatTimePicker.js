import { TimePicker } from "antd";
import moment from "moment";
import { useState } from "react";

export default function FloatTimePicker(props) {
    const {
        label,
        placeholder,
        onChange,
        onBlur,
        value,
        id,
        className,
        required,
        disabled,
        format = "HH:mm",
    } = props;

    const [focus, setFocus] = useState(false);
    const isOccupied = focus || (value && value !== "" && value.length !== 0);
    const labelClass = isOccupied ? "label float-label" : "label";
    const requiredMark = required ? (
        <span className="text-danger">*</span>
    ) : null;

    const handleTimeChange = (time) => {
        onChange(time);
    };

    return (
        <div
            className={`float-wrapper ${className ? className : ""}`}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
        >
            <TimePicker
                id={id ?? ""}
                value={value ? moment(value, format) : null} // Ensure value is a moment object
                format={format}
                onChange={handleTimeChange}
                disabled={disabled}
                onBlur={(e) => {
                    if (onBlur) {
                        onBlur(e);
                    }
                }}
                allowClear
            />
            <label className={labelClass}>
                {isOccupied ? label : placeholder} {requiredMark}
            </label>
        </div>
    );
}
