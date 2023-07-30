const pages = {}

pages.base_url = "http://127.0.0.1:8000/api/";

pages.loadFor = (page) => {
  eval("pages.page_" + page + "();")
}

pages.print_message = (message) =>{
  console.log(message);
}

pages.page_index = async (event) => {
    document.getElementById("login").addEventListener("click", async (event) => {
      //event.preventDefault();
      const index_url = pages.base_url + "login/"
      const response = await pages.login(index_url, event)
      //console.log(response.data[0].first_name)
      //event.preventDefault();
      //const first_name = response.data[0];
      
    });
}

pages.page_register = async (event) => {
  document.getElementById("register").addEventListener("click", async (event) => {
    //event.preventDefault();
    const register_url = pages.base_url + "register"
    const response = await pages.register(register_url, event)
    //console.log(response.data[0].first_name)
    //event.preventDefault();
    //const first_name = response.data[0];
    
  });
}

pages.login = async (url,event) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    event.preventDefault();
    localStorage.setItem('id', null);
    localStorage.setItem('first_name', null);

    try{
        response = await axios(
          url + email + '/' + password
          );
        
        console.log('aaaa: ' + response.data[0])
        //console.log('hmmmm: ' + response.data[1])
        if(response.data[0] != 0) {
          localStorage.setItem('id', response.data[1].id);
          localStorage.setItem('first_name', response.data[1].first_name);
          //console.log('re: ' + response.data[1])
          console.log(response.data[1].first_name)
          window.location.href = "./src/html/dashboard.html";
        } else {
          console.log("Wrong Credentials!");
        }
        //api_url = pages.base_url + "dashboard/" + response.data[0].email;

        // try{
        //   await axios.post(
        //     api_url
        //   );

        //   
        // }catch(error){
        //   pages.print_message("Error from Linking (POST)" + error)
        // }
        //document.getElementById("title").innerHTML = "Hello " + response.data[0].first_name;
        //console.log(response.data[0].first_name)
    }catch(error){
      console.log("Error from Login API: " + error)
    }
    
    // fetch(url + email + "/" + password, {
    //     method: "GET",
    //     mode: "cors",
    //     cache: "no-cache",
    //     origin: "http://127.0.0.1:8000",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((response) => {
    //     //if (response["status"] == "1") {
    //       console.log("status: " + response.data[0]);
    //       //console.log("response: " + response.id);
    //       //localStorage.setItem("id", response.id);
    //       //console.log("id: " + localStorage.getItem("id"));
    //       //localStorage.setItem("token_value", response.token_value);
    //       //console.log(localStorage.getItem("token_value"));
    //       //window.location.href = "./src/html/classes.html";
    //     // } else {
    //     //   console.log(response["message"]);
    //     // }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }

pages.register = async (url) => {
  // const email = document.getElementById("email").value;
  // const password = document.getElementById("password").value;
  //event.preventDefault();
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  event.preventDefault();
  localStorage.setItem('id', null);
  localStorage.setItem('first_name', null);

    try{
      console.log('whatttt')

      const userData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      };

      console.log(url)
        response = await axios.post(
          url,
          userData
          ).then(response => {
            // Handle the response data from the server
            console.log(response.data);

            console.log('aaaa: ' + response.data[0])
            //console.log('hmmmm: ' + response.data[1])
            if(response.data[0] != 0) {
              localStorage.setItem('id', response.data[1].id);
              localStorage.setItem('first_name', response.data[1].first_name);
              //console.log('re: ' + response.data[1])
              console.log(response.data[1].first_name)
              window.location.href = "./dashboard.html";
            } else {
              console.log("Fill all the inputs!");
            }
          })
        
        
        //api_url = pages.base_url + "dashboard/" + response.data[0].email;

        // try{
        //   await axios.post(
        //     api_url
        //   );

        //   
        // }catch(error){
        //   pages.print_message("Error from Linking (POST)" + error)
        // }
        //document.getElementById("title").innerHTML = "Hello " + response.data[0].first_name;
        //console.log(response.data[0].first_name)
    }catch(error){
      console.log("Error from Register API: " + error)
    }
}