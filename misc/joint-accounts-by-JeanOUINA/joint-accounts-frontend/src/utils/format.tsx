import React from 'react';

export function ReactFormat({
    children: text,
    params,
    className = 'flex flex-wrap gap-1 justify-center items-center'
}:{
    children: string,
    params: Record<string, React.ReactNode>,
    className?: string
}) {
    if(!text)return null

    const parts = text.split(/ +/g)
        .reduce((pv, cv) => {
            if(/^{\w+}$/.test(cv)){
                pv.push([cv], [])
            }else{
                pv[pv.length - 1].push(cv)
            }
            return pv
        }, [[]] as string[][])
        .flatMap((v) => v.join(' '))
        .filter(e => !!e)

    const children:React.ReactNode[] = parts.map((part, i) => {
        if(!/^{\w+}$/.test(part)){
            return <span key={i}>{part}</span>
        }

        const key = part.slice(1, -1)
        return <React.Fragment key={i}>
            {params[key]}
        </React.Fragment>
    })

    return <div className={
        className
    }>
        {children}
    </div>
}