import {Route, Routes} from "react-router-dom";
import {ThemeProvider} from "@emotion/react";

import AppTheme from "@/theme";

import AuthLayout from "@/_auth/AuthLayout";

import RootLayout from "@/_root/RootLayout";
import NotFound from "@/_root/pages/NotFound";

import {Home} from "@/_root/pages/home";
import {Login} from "@/_root/pages/user";
import {MyPage} from "@/_auth/pages/user";

function App() {
  console.log(process.env.REACT_APP_BASE_URL);

  return (
    <ThemeProvider theme={AppTheme}>
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>

          {/* NOTE: 로그인없이 접근할 수 있는 페이지 */}
          <Route element={<RootLayout/>}>
            <Route path="/login" element={<Login/>}/>
          </Route>

          {/* NOTE: 로그인해야 접근할 수 있는 페이지 */}
          <Route element={<AuthLayout/>}>
            <Route path="/mypage" element={<MyPage/>}/>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
