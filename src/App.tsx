import "./App.css";
import { Button, ConfigProvider, Space } from "antd";

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
        <Space>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
        </Space>
      </ConfigProvider>
    </>
  );
}

export default App;
