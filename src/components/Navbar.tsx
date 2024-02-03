import { Header } from 'antd/es/layout/layout'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.svg'



const Navbar = () => {
    return (
        <Header
            className='nav'
            style={{
                position: 'fixed',
                // top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: 'center',
                padding: 0,
                margin: 0
            }}
        >
            <Link to="/" >
                <div style={{ height: "100px", paddingLeft: "10px" }} >
                    <img src={Logo} width={100} height={100} alt="fix health mai  logo" />
                </div>
            </Link>
            {/* <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
            /> */}
        </Header>
    )
}

export default Navbar