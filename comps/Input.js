import React from 'react'
import {useController} from "react-hook-form";

export const Input = ({
                          name = '',
                          control = null,
                          placeholder = '',
                          type = 'text',
                          ...other
                      }) => {
    const {field} = useController({name, control})
    return (
        <>
            <div className="mb-1">
                <label
                    htmlFor={name}
                    className="form-label"
                >
                    {placeholder}
                </label>
                <input
                    type={type}
                    placeholder={`Введите значение`}
                    id={name}
                    {...field}
                    className="form-control"
                    {...other}
                />
            </div>
        </>
    )
}
