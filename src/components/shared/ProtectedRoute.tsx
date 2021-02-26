import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserState, UserState } from '../../store/reducers/user.reducer';

export interface ProtectedRouteProps extends RouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  component: Component,
  render,
  ...rest
}: ProtectedRouteProps) => {
  const userState: UserState = useSelector(getUserState);

  if (!userState.fetched) {
    return null;
  }

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!userState.current) {
          return <Redirect to="/login" />;
        }
        return Component ? <Component {...props} /> : (render) ? render(props) : null;
      }}
    />
  );
};

export default ProtectedRoute;
