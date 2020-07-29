import React from 'react'

export function MinimalLayout(props) {
        return (
                <body className={props.bodyClasses}>
                        {props.children}
                </body>
        )
}
