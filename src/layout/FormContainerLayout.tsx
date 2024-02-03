import Navbar from "../components/Navbar"


const FormContainerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div
                style={{
                    minHeight: "35rem",
                    width: "100%",
                    // background: "red",
                    color: "white !important",
                    display: "grid",
                    placeItems: "center ",


                }}
            >

                {children}

            </div>
        </>
    )
}

export default FormContainerLayout