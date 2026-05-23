import React, { ChangeEvent } from 'react';
import classnames from 'classnames';

interface FormTextProps {
    value: string;
    label?: string;
    placeholder?: string;
    onChange: (value: string) => void;
    type?: 'text' | 'email' | 'date' | 'time' | 'textarea';

    className?: string;

    error?: boolean;
}

const FormText: React.FC<FormTextProps> = ({
    value,
    label,
    placeholder,
    onChange,
    type = 'text',
    error = false,
    className,
}) => {
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        onChange(e.target.value);
    };
    return (
        <label className={classnames('relative flex flex-col', className)}>
            {/* Expanded the size and tracking of floating input labels to match premium screenshot design */}
            {label && (
                <div className="absolute -top-2.5 left-[20px] px-[14px] bg-[#D7BDA6] text-[13px] font-black tracking-widest text-[#4C2B08] uppercase lg:left-9 lg:text-base">
                    {label}
                </div>
            )}
            {type === 'textarea' ? (
                <textarea
                    value={value}
                    placeholder={placeholder}
                    className={classnames(
                        'border bg-transparent rounded-[32px] px-[18px] py-[20px] text-sm leading-none tracking-[-0.41px]\n' +
                            '            placeholder:text-[#4C2B08]/50 resize-none h-[140px] transition-colors duration-300 focus:outline-none lg:px-7\n' +
                            '            lg:py-6 lg:text-base lg:leading-none lg:h-[224px] text-[#4C2B08]',
                        { 'border-red-500': error, 'border-[#4C2B08]/40': !error },
                    )}
                    onChange={handleChange}
                />
            ) : (
                <input
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    className={classnames(
                        'border bg-transparent rounded-[48px] px-[18px] py-[20px] text-sm leading-none tracking-[-0.41px]\n' +
                            '            transition-colors duration-300 placeholder:text-[#4C2B08]/50 focus:outline-none lg:px-7 lg:py-6 lg:text-base\n' +
                            '            lg:leading-none text-[#4C2B08]',
                        { 'border-red-500': error, 'border-[#4C2B08]/40': !error },
                    )}
                    onChange={handleChange}
                />
            )}
        </label>
    );
};

export default FormText;

