import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import ProtectedRoute from "./components/ProtectedRoute"
import Connections from "./components/Connections"
import Requests from "./components/Requests"

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
          <Route path="/" element={<Body />}>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            {/* Protected routes */}
            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
              <Route
              path="/connections"
              element={
                <ProtectedRoute>
                  <Connections/>
                </ProtectedRoute>
              }
            />
              <Route
              path="/requests"
              element={
                <ProtectedRoute>
                  <Requests/>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>

    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
