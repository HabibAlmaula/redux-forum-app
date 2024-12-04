import { useSelector } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Preload } from "./components/app/Preload";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { home, login, register } from "./routes/routeName";
import { AuthGuard } from "./routes/authGuard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/base/NotFound";
const ForumApp = () => {
  const { isPreload } = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return isPreload ? (
    <Preload />
  ) : (
    <>
      <Router>
        <Routes>
          <Route
            path={login}
            element={
              <AuthGuard>
                <Login />
              </AuthGuard>
            }
          />
          <Route path={register} element={<Register />} />
          <Route path={home} element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default ForumApp;
