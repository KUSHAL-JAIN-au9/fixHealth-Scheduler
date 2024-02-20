import React from 'react'

const AppointMentListContainer = ({ children }: { children: React.ReactNode }) => {

    return (

        <div style={{ width: "100%", minHeight: "40rem", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }} >
            {children}

        </div>

    )
}

export default AppointMentListContainer