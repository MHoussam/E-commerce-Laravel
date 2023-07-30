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

//const myTimeout = setTimeout(pages.page_dashboard, 5000);

//window.addEventListener("DOMContentLoaded", async() =>{
  pages.page_dashboard = async () => {
    // document.getElementById("show").addEventListener("click", async (event) => {
      //event.preventDefault();
        //("#product"). window (function (e){e.preventDefault(); });
        //if(localStorage.getItem('status') == 1){
          //pages.myStopFunction();
          const dashboard_url = pages.base_url + "dashboard"
          const response = await pages.dashboard(dashboard_url)
          // const name = response.data[1].name;
          // console.log('name: ' + name)
          // document.getElementById("products-title").innerHTML = "Hello " + name;
          ///localStorage.setItem('status', 0);
        //}
      //console.log(response.data[0].first_name)
      //event.preventDefault();
      //const first_name = response.data[0];
  // });
}
//});

pages.login = async (url,event) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    event.preventDefault();
    localStorage.setItem('id', null);
    localStorage.setItem('first_name', null);
    localStorage.setItem('status', 1);

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

  //event.preventDefault();
  localStorage.setItem('id', null);
  localStorage.setItem('first_name', null);
  localStorage.setItem('status', 1);

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

// pages.myStopFunction = () => {
//   clearTimeout(myTimeout);
// }

pages.dashboard = async (url) => {
  //event.preventDefault();
  try{
    const product = await axios(url)    

    //const product = [{"id":1,"name":"Bag","description":"Big Bag","price":"5","quantity":"99","created_at":null,"updated_at":null},{"id":2,"name":"Belt","description":"Leather Belt","price":"80","quantity":"99","created_at":null,"updated_at":null}]

    console.log(product.data);
      productsArray = product.data;
      console.log('heyyyyyy: ')
      console.log('qwas: '+product.data[0].name)
      if(product.data.length != "0"){
        //console.log(product.data.length)
        console.log("again?")
        pages.displayProducts()
      } else {
        console.log("Couldn't load the products! " + error);
      }
  }catch(error){
      pages.print_message("Error from dashboard API: " + error)
  }
}

pages.displayProducts = async () => {
  let count=0;
  //event.preventDefault();
  const productsList = document.getElementById("product-cards");
  productsList.innerHTML = "";
  productsArray.forEach((product) => {
  //event.preventDefault();
    const listItem = document.createElement("div");
    console.log(product.name)
    listItem.innerHTML = `
    <div class="product flex-column">
      <div class="product-name flex center bold big" id="product-name">
        ` + product.name + `
      </div>

      <div class="product-content flex center">
        <img src="../assets/images/1.jpg" type="image/jpg" class="pic">
      </div>

      <div class="product-buttons pointer">
        <button class="favorite pointer" id="favorite">Add to Favorite</button>
        
        <button class="cart pointer" id="cart">Add to Cart</button>
      </div>
    </div>
    `;

    //console.log(class_student.class_id);
    productsList.appendChild(listItem)
  })
  //event.preventDefault();
  //await pages.delay();
}

pages.delay = async () => {
  let time=1000;
  await setTimeout(function() {  
    console.log("helloooooooooooooooooooo")
    // Your code here
    console.log("Delayed 10000 milliseconds");
  }, time);

}