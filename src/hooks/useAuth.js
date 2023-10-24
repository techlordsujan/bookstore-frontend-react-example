import React, { useContext } from "react";

import { UserContext } from "../contexts/UserProvider";

function useAuth() {
    const { state: auth, dispatch } = useContext(UserContext);
    return { auth, dispatch };
}

export default useAuth;
