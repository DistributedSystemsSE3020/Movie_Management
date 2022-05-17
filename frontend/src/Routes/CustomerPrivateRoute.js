import { Redirect, Route } from "react-router-dom";

const CustomerPrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                localStorage.getItem("customerAuthToken") ?(
                    <Component {...props} />
                ) : (
                    <Redirect to="/customer/signin" />
                )
            }
        />
    );
};

export default CustomerPrivateRoute;