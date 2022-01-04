import Link from 'next/link';
import clsx from 'clsx';
import React from "react";
import {useRouter} from "next/router";

export const A = ({
                      className = '',
                      activeCn = '',
                      path = '',
                      children,
                  }) => {
    const {pathname} = useRouter();
    return (
        <>
            <Link
                href={path}
            >
                <a
                    className={clsx(className, pathname === path ? activeCn : null )}
                    href={path}
                >
                    {children}
                </a>
            </Link>
        </>
    )
}
