export const signUpFetch = async (username,email,password) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}user`,{
            method: "POST",
            headers: {"Content-type": "application/json" },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        const data = await response.json();
        localStorage.setItem("MyToken",data.token);
        return data ;
    } catch (error) {
        console.log(error)
    }
}

export const signInFetch = async (username, password) => {
    try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        username,
        password,
        }),
    });
    const data = await response.json();
    localStorage.setItem("MyToken",data.token);
    return data;
    } catch (error) {
    console.log(error);
    }
};


export const updateFetch = async (username,email) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}user`,{
            method: "PUT",
            headers: {"Content-type": "application/json" },
            body: JSON.stringify({
                username: username,
                email: email,
            })
        })
        const data = await response.json();
        return data ;
    } catch (error) {
        console.log(error)
    }
}

export const deleteFetch = async (username,setter,user) => {
    try {
    await fetch(`${process.env.REACT_APP_REST_API}user/${username}`, {
        method: "DELETE",});
    setter(user);
    return alert("Successfully deleted user");
    } catch (error) {
    console.log(error);
    return alert("Cannot delete currently");
    }
};

export const tokenCheck = async (token, setter) => {
    try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}user`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setter(data.username);
    } catch (error) {
    console.log(error);
    }
};

export const logOut = async () =>{
    try {
        localStorage.clear();
        alert("Logged Out")
    } catch (error) {
        console.log(error);
        alert("Error")
    }
}