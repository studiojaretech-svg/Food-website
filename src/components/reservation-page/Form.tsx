'use client';

import React, { useState } from 'react';
import ArchWithStar from '@/components/ArchWithStar';
import FormText from './Text';
import classNames from 'classnames';
import Link from 'next/link';

interface Props {
    title: string;
}

interface ReservationForm {
    name: string;
    date: string;
    time: string;
    guestsCount: string;
    email: string;
    notes: string;
    acceptTerms: boolean;
}

const ReservationForm: React.FC<Props> = ({ title }) => {
    const [form, setForm] = useState<ReservationForm>({
        name: '',
        guestsCount: '',
        email: '',
        notes: '',
        acceptTerms: false,
        time: '',
        date: '',
    });

    const [formErrors, setFormErrors] = useState<
        Record<keyof Omit<ReservationForm, 'acceptTerms'>, boolean>
    >({
        name: false,
        guestsCount: false,
        email: false,
        notes: false,
        time: false,
        date: false,
    });
    const handleUpdateForm = (
        name: keyof ReservationForm,
        value: string | boolean,
    ): void => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = () => {
        setFormErrors({
            name: false,
            guestsCount: false,
            email: false,
            notes: false,
            time: false,
            date: false,
        });

        // Validate form fields
        const errors: Record<string, boolean> = {};
        if (!form.name) {
            errors.name = true;
        }
        if (!form.email) {
            errors.email = true;
        }
        if (!form.notes) {
            errors.notes = true;
        }

        if (!form.date) {
            errors.date = true;
        }

        if (!form.guestsCount) {
            errors.guestsCount = true;
        }

        if (!form.time) {
            errors.time = true;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            // Submit the form if there are no errors
        }
    };

    return (
        <section className="pt-[60px] pb-12 md:pb-24 lg:pt-[120px] lg:pb-[160px] bg-[#D7BDA6] transition-all duration-500">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <ArchWithStar />
                
                {/* Responsive Container: 
                  Expands elegantly across screens so it never looks compressed or squeezed.
                */}
                <div className="relative max-w-[480px] sm:max-w-[600px] md:max-w-[720px] lg:max-w-[860px] mx-auto">
                    <h1 className="text-3xl lg:text-5xl font-black font-Gloock uppercase text-center mb-12 lg:mb-16 text-[#4C2B08] tracking-tight">
                        {title}
                    </h1>
                    
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-7 lg:gap-x-8 lg:gap-y-10"
                    >
                        <FormText
                            value={form.name}
                            label="Name"
                            placeholder="Enter your full name or nickname..."
                            error={formErrors.name}
                            className="col-span-1 sm:col-span-2"
                            onChange={(value) =>
                                handleUpdateForm('name', value)
                            }
                        />
                        <FormText
                            error={formErrors.date}
                            value={form.date}
                            onChange={(value) =>
                                handleUpdateForm('date', value)
                            }
                            type="date"
                            label="Date"
                            placeholder="DD/MM/YYYY"
                            className="col-span-1"
                        />
                        <FormText
                            error={formErrors.time}
                            value={form.time}
                            onChange={(value) =>
                                handleUpdateForm('time', value)
                            }
                            type="time"
                            label="Time"
                            placeholder="Enter time"
                            className="col-span-1"
                        />
                        <FormText
                            error={formErrors.guestsCount}
                            value={form.guestsCount}
                            onChange={(value) =>
                                handleUpdateForm('guestsCount', value)
                            }
                            label="Number of guests"
                            placeholder="Number of guests"
                            className="col-span-1"
                        />
                        <FormText
                            error={formErrors.email}
                            value={form.email}
                            onChange={(value) =>
                                handleUpdateForm('email', value)
                            }
                            label="Email / Phone"
                            placeholder="Email or phone..."
                            className="col-span-1"
                        />
                        <FormText
                            error={formErrors.notes}
                            value={form.notes}
                            onChange={(value) =>
                                handleUpdateForm('notes', value)
                            }
                            type="textarea"
                            label="Notes"
                            placeholder="If you have special requirements..."
                            className="col-span-1 sm:col-span-2"
                        />
                        
                        <label className="flex items-start col-span-1 sm:col-span-2 cursor-pointer mb-2">
                            <input
                                value={String(form.acceptTerms)}
                                type="checkbox"
                                className="sr-only"
                                onChange={() =>
                                    handleUpdateForm(
                                        'acceptTerms',
                                        !form.acceptTerms,
                                    )
                                }
                            />
                            <div
                                className={classNames(
                                    'flex justify-center items-center flex-shrink-0 w-5 h-5 rounded-[4px] border mt-0.5 mr-3 transition-colors duration-300',
                                    {
                                        'border-appAccent bg-appAccent':
                                            form.acceptTerms,
                                        'border-[#4C2B08]/40': !form.acceptTerms,
                                    },
                                )}
                            >
                                {form.acceptTerms && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-3.5 h-3.5 text-white"
                                    >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </div>
                            <div className="text-xs sm:text-sm leading-relaxed text-[#4C2B08]/85 font-medium select-none">
                                By submitting this form, you confirm you have
                                read and understood how Cravenest processes your
                                personal data for the purpose of making a
                                reservation and in accordance with the terms of
                                the{' '}
                                <Link href="/" className="underline text-[#4C2B08] font-black">
                                    Privacy Notice
                                </Link>
                                .
                            </div>
                        </label>
                        
                        {/* Premium Full-Width Submit Button:
                          Spans cleanly across both grid columns on larger screens and scales perfectly on mobile.
                        */}
                        <button
                            type="button"
                            className="flex items-center justify-center w-full col-span-1 sm:col-span-2 bg-[#4C2B08] hover:bg-[#AB7743] text-white rounded-full py-4.5 px-8 font-black tracking-wider sm:tracking-widest uppercase transition-all duration-300 shadow-lg cursor-pointer hover:scale-[1.01] active:scale-[0.99] text-xs sm:text-sm lg:text-base"
                            onClick={() => handleFormSubmit()}
                        >
                            <span>Submit your reservation</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ReservationForm;

