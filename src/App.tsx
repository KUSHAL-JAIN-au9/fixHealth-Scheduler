import "./App.css";
import { ConfigProvider } from "antd";
import AppointmentList from "./components/AppointmentList";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#00b96b",
            borderRadius: 2,

            // Alias Token
            colorBgContainer: "#f6ffed",
          },
        }}
      >
        {/* <Space>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
        </Space> */}
        <AppointmentList />
      </ConfigProvider>
    </>
  );
}

export default App;
