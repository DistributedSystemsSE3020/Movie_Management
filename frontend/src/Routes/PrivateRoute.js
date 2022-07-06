import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                (localStorage.getItem("customerAuthToken") )?(
                    <Component {...props} />
                ) : (
                    <Redirect to="/customer/signin" />
                )
            }
        />
    );
};

export default PrivateRoute;