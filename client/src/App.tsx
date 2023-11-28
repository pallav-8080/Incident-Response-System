import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Routes,
  useNavigate,
} from 'react-router-dom'
import {
  createTheme,
  ThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ChatRoomPage from './pages/ChatRoomPage'
import Socket from './utils/Socket'
import HomePage from './pages/HomePage'
import Contacts from './pages/Contacts'
import Messages from './pages/Messages'


const theme = createTheme({
  palette: {
    primary: {
      main: '#0025BD',
    },
    secondary: {
      main: '#FFC713',
    },
  },
})

const App: React.FC = ()  => {
  useEffect(() => {
    Socket.connect();
    return () => {
      Socket.close()
    }
  }, [])

    return (
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Router>
            <Routes>
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            </Routes>
            {/* secured routes */}
            <Routes>
            <Route path="/messages/">

              <Route
                path=":id"
                element={<ChatRoomPage/>}
              />
              <Route
                path=""
                element={<Messages/>}
              />
              </Route>
              <Route
                path="/contacts"
                element={<Contacts/>}
              />
              <Route path="/" element={<HomePage/>} />
            </Routes>
          </Router>
        </StylesProvider>
      </ThemeProvider>
    )
  }

  export default App;
