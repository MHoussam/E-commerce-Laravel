const pages = {}

pages.base_url = "http://127.0.0.1:8000/api/";

pages.loadFor = (page) => {
  eval("pages.page_" + page + "();")
}

pages.goTo = (page) => {
  document.getElementById(page).addEventListener("click", async () => {
    window.location.href = "./" + page + ".html";
  });
}

pages.addTo = (button, func) => {
  document.getElementById(button).addEventListener("click", async () => {
    const url = pages.base_url + "add_" + func
    await pages.add(url)    
  });
}

pages.page_index = async () => {
  document.getElementById("login").addEventListener("click", async () => {
    const index_url = pages.base_url + "login/"
    await pages.login(index_url)
  });
}

pages.page_register = async () => {
  document.getElementById("register").addEventListener("click", async () => {
    const register_url = pages.base_url + "register"
    await pages.register(register_url)    
  });
}

pages.page_dashboard = async () => {
  const dashboard_url = pages.base_url + "dashboard"
  await pages.dashboard(dashboard_url)

  pages.goTo('favorite')
  pages.goTo('cart')
}

pages.page_favorite = async () => {
  const favorite_url = pages.base_url + "favorite"
  await pages.dashboard(favorite_url)
        
  pages.goTo('dashboard')
  pages.goTo('cart')
}

pages.page_cart = async () => {
  const cart_url = pages.base_url + "cart"
  await pages.dashboard(cart_url)
        
  pages.goTo('dashboard')
  pages.goTo('favorite')
}

pages.page_product = async () => {
  const product_url = pages.base_url + "product/" + localStorage.getItem('chosen_product')
  await pages.product(product_url)

  pages.addTo('favorite-btn', 'favorite')
  pages.addTo('cart-btn', 'cart')
        
  pages.goTo('dashboard')
  pages.goTo('favorite')
  pages.goTo('cart')
}

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
        
        if(response.data[0] != 0) {
          localStorage.setItem('id', response.data[1].id);
          localStorage.setItem('first_name', response.data[1].first_name);
          
          console.log(response.data[1].first_name)
          window.location.href = "./src/html/dashboard.html";
        } else {
          console.log("Wrong Credentials!");
        }
    }catch(error){
      console.log("Error from Login API: " + error)
    }
  }

pages.register = async (url) => {
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
            console.log(response.data);

            console.log('aaaa: ' + response.data[0])
            if(response.data[0] != 0) {
              localStorage.setItem('id', response.data[1].id);
              localStorage.setItem('first_name', response.data[1].first_name);
              console.log(response.data[1].first_name)
              window.location.href = "./dashboard.html";
            } else {
              console.log("Fill all the inputs!");
            }
          })
    }catch(error){
      console.log("Error from Register API: " + error)
    }
}

pages.dashboard = async (url) => {
  try{
    const product = await axios(url)    
    console.log(product.data);
      productsArray = product.data;
      console.log('qwas: '+product.data[0].name)
      if(product.data.length != "0"){
        console.log("again?")
        pages.displayProducts()
      } else {
        console.log("Couldn't load the products! " + error);
      }
  }catch(error){
    console.log("Error from dashboard API: " + error)
  }
}

pages.displayProducts = async () => {
  const productsList = document.getElementById("product-cards");
  productsList.innerHTML = "";
  productsArray.forEach((product) => {
    const listItem = document.createElement("div");
    console.log(product.name)
    listItem.innerHTML = `
    <div class="product flex-column pointer" onclick="pages.chooseProduct(${product.id})">
      <div class="product-name flex center bold big" id="product-name">
        ` + product.name + `
      </div>

      <div class="product-content flex center">
        <img src="../assets/images/1.jpg" type="image/jpg" class="pic">
      </div>

      <div class="product-price flex center">        
        <div class="price bold" id="price">$` + product.price + `</div>
      </div>

      <div class="show-info">
        <p>Product 1 Description</p>
        <p>Rating: 4.5 / 5</p>
      </div>
    </div>
    `;
    productsList.appendChild(listItem)
  })
}

pages.product = async (url) => {
  try{
    const product = await axios(url)    
    console.log(product.data);
      productsArray = product.data;
      console.log('qwas: '+productsArray.name)
      if(productsArray.length != "0"){
        console.log("again?")
        pages.displayProduct()
      } else {
        console.log("Couldn't load the products! " + error);
      }
  }catch(error){
    console.log("Error from dashboard API: " + error)
  }
}

pages.displayProduct = async () => {
  const productsList = document.getElementById("product-cards");
  productsList.innerHTML = "";
    const listItem = document.createElement("div");
    console.log(productsArray.name)
    listItem.innerHTML = `
    <div class="product-chosen flex">
      <div class="product-pic flex center">
        <img src="../assets/images/1.jpg" type="image/jpg" class="picture">
      </div>

      <div class="product-content-right flex-column">
        <div class="content-right-up">
          <div class="product-name flex center bold big padding" id="product-name">
            ` + productsArray.name + `
          </div>

          <div class="product-price flex center padding">        
            <div class="price bold mid flex center" id="price">Price: $` + productsArray.price + `</div>
          </div>

          <div class="product-description flex center padding">        
            <div class="description bold mid" id="description">Description: ` + productsArray.description + `</div>
          </div>
        </div>

        <div class="content-right-down flex center">
          <div class="show flex center">
            <button id="favorite-btn" class="show-btn bold pointer center content-btn">
                Favorite List
            </button>
          </div>

          <div class="show flex center">
            <button id="cart-btn" class="show-btn bold pointer center content-btn">
              My Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
    listItem.className = "product-content";
    productsList.appendChild(listItem)
}

pages.chooseProduct = (product_id) => {
  console.log(product_id)
  localStorage.setItem('chosen_product', product_id)
  window.location.href = './product.html'
}

pages.add = async (url) => {
  const id = localStorage.getItem('id');
  const product_id = localStorage.getItem('chosen_product');
  
  try{
    const productData = {
      user_id: id,
      product_id: product_id
    };

    response = await axios.post(
      url,
      productData
    )
  }catch(error){
    console.log("Error from Add API: " + error)
  }
}