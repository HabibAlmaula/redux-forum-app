import { useSelector } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Preload } from "./components/app/Preload";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { detailThread, home, login, register } from "./routes/routeName";
import { AuthGuard } from "./routes/authGuard";
import { RouteGuard } from "./routes/RouteGuard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/base/NotFound";
import { AppToast } from "./components/app/AppToast";
import { DetailTrhead } from "./pages/DetailThread";

const ForumApp = () => {
  const isPreload = useSelector((state) => state.isPreload);
  const appTheme = useSelector((state) => state.appTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return <Preload />;
  }

  return (
    <>
      <AppToast theme={appTheme} />
      <Router>
        <Routes>
          {/* Public Routes with AuthGuard */}
          <Route element={<AuthGuard><Outlet /></AuthGuard>}>
            <Route path={login} element={<Login />} />
            <Route path={register} element={<Register />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<RouteGuard />}>
            {/* Add other protected routes here */}
            <Route path={home} element={<Home />} />
            <Route path={detailThread} element={<DetailTrhead />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default ForumApp;