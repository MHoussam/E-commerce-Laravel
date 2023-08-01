const pages = {}

pages.base_url = "http://127.0.0.1:8000/api/";

pages.loadFor = (page) => {
  eval("pages.page_" + page + "();")
}

pages.goTo = (page) => {
  document.getElementById(page).addEventListener("click", async () => {
    console.log('page: '+page)
    if(page === 'logout'){
      localStorage.setItem('id', null)
      page = "../../index" 
    }

    window.location.href = "./" + page + ".html";
  });
}

pages.addTo = (button, func) => {
  document.getElementById(button).addEventListener("click", async () => {
    const url = pages.base_url + "add_" + func
    await pages.add(url)    
  });
}

pages.deleteP = async () => {
  //document.getElementById('delete').addEventListener("click", async () => {
    const url = pages.base_url + 'delete'
    await pages.delete(url)    
  //});
}

// pages.logout = async () => {
//   document.getElementById('logout').addEventListener("click", async () => {
//     const url = pages.base_url + 'logout'
//     await pages.logoutPage(url)    
//   });
// }

pages.editProduct = () => {
  document.getElementById('edit-btn').addEventListener("click", async () => {
    const url = pages.base_url + 'edit'
    await pages.edit(url)    
  });
}

pages.page_index = async () => {
  document.getElementById("login").addEventListener("click", async () => {
    const index_url = pages.base_url + "login"
    await pages.login(index_url)
  });
}

pages.page_register = async () => {
  document.getElementById("register").addEventListener("click", async () => {
    const register_url = pages.base_url + "register"
    await pages.register(register_url)    
  });
}

pages.page_add = async () => {
  document.getElementById("add").addEventListener("click", async () => {
    const add_url = pages.base_url + "add"
    await pages.addProduct(add_url)    
  });

  pages.goTo('logout')
  pages.goTo('admin-dashboard')
}

pages.page_dashboard = async () => {
  const dashboard_url = pages.base_url + "dashboard"
  await pages.dashboard(dashboard_url)

  pages.goTo('logout')
  pages.goTo('favorite')
  pages.goTo('cart')
}

pages.page_admin = async () => {
  const dashboard_url = pages.base_url + "dashboard"
  await pages.adminDashboard(dashboard_url)

  //pages.deleteP('delete')
  //pages.goTo('edit')
  pages.goTo('logout')
  pages.goTo('add')
}

pages.page_favorite = async () => {
  const favorite_url = pages.base_url + "favorite"
  await pages.fav_cart(favorite_url) 
        
  pages.goTo('logout')
  pages.goTo('dashboard')
  pages.goTo('cart')
}

pages.page_cart = async () => {
  const cart_url = pages.base_url + "cart"
  await pages.fav_cart(cart_url) 
        
  pages.goTo('logout')
  pages.goTo('dashboard')
  pages.goTo('favorite')
}

pages.page_product = async () => {
  const product_url = pages.base_url + "product/" + localStorage.getItem('chosen_product')
  await pages.product(product_url)

  pages.addTo('favorite-btn', 'favorite')
  pages.addTo('cart-btn', 'cart')
        
  pages.goTo('logout')
  pages.goTo('dashboard')
  pages.goTo('favorite')
  pages.goTo('cart')
}

pages.page_adminProduct = async () => {
  const dashboard_url = pages.base_url + "product/" + localStorage.getItem('chosen_product')
  await pages.adminProduct(dashboard_url)

  pages.goTo('admin-dashboard')
  pages.goTo('logout')
  pages.goTo('add')
  pages.goTo('edit')
}

pages.page_edit = async () => {
  const dashboard_url = pages.base_url + "product/" + localStorage.getItem('chosen_product')
  await pages.editProducts(dashboard_url)

  pages.editProduct('edit-btn', 'edit')
  pages.goTo('logout')
  pages.goTo('admin-dashboard')
}

pages.login = async (url) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //localStorage.setItem('id', null);
    //localStorage.setItem('first_name', null);
    //localStorage.setItem('status', 1);

    const userData = {
      email: email,
      password: password,
    }
    try{
        response = await axios.post(
          url, userData
          );
        
        console.log('aaaa: ' + response.data[0])
        
        if(response.data['status'] === 'success') {
          localStorage.setItem('id', response.data['user'].id);
          localStorage.setItem('first_name', response.data['user'].first_name);
          
          console.log(response.data['user'].first_name)
          if(response.data['user'].type !== 'admin') {
            window.location.href = "./src/html/dashboard.html";
          }
          else {
            window.location.href = "./src/html/admin-dashboard.html";
          }
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

            console.log('aaaa: ' + response.data['status'])
            if(response.data['status'] === 'success') {
              localStorage.setItem('id', response.data['user'].id);
              localStorage.setItem('first_name', response.data['user'].first_name);
              console.log(response.data['user'].first_name)
              window.location.href = "./dashboard.html";
            } else {
              console.log("Fill all the inputs!");
            }
          })
    }catch(error){
      console.log("Error from Register API: " + error)
    }
}

pages.addProduct = async (url) => {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;
  const category = document.getElementById("category").value;
  //const photo = document.getElementById("photo");

    try{
      // const photoFile = photo.files[0];
      // const photoBase64 = await convertToBase64(photoFile);

//console.log('here; ' + photoBase64)

      //const photoFile = photo.files[0]; // Get the selected file
      //if (photoFile) {
        //const imagePath = URL.createObjectURL(photoFile);
        //console.log("Image path:", imagePath);

        // Display the image preview
        //const previewImage = document.getElementById("preview");
        //previewImage.src = imagePath;
      // } else {
      //   console.log("No image selected.");
      // }
    //const photoBase64 = await convertToBase64(photoFile);

      const userData = {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        category: category,
        //photo: photoBase64
      };

      console.log(url)
        response = await axios.post(
          url,
          userData
          ).then(response => {
            console.log(response.data);

            console.log('aaaa: ' + response.data[0])
            if(response.data[0] != 0) {
              console.log('Succeeded')

              window.location.href = './admin-dashboard.html'
            } else {
              console.log("Fill all the inputs!");
            }
          })
    }catch(error){
      console.log("Error from Add Product API: " + error)
    }
}

async function convertToBase64(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
          resolve(event.target.result);
      };

      reader.onerror = (error) => {
          reject(error);
      };

      reader.readAsDataURL(file);
  });
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
  console.log('p: ' + productsArray)
  productsArray.forEach((product) => {
    const listItem = document.createElement("div");
    console.log(product.name)
    listItem.innerHTML = `
    <div class="product flex-column pointer" onclick="pages.chooseProduct(${product.id})">
      <div class="more-info" onclick="pages.chooseAdminProduct(${product.id})">
        <div class="product-name flex center bold big" id="product-name">
          ` + product.name + `
        </div>

        <div class="product-content flex center">
            <img src="${product.photo}" type="image/jpg" id='productPic' class="pic">
        </div>

        <div class="product-price flex center">        
          <div class="price bold" id="price">Price: $` + product.price + `</div>
        </div>

        <div class="show-info bold">
          <p>Name: ` + product.name + `</p>
          <p>Price: ` + product.price + `</p>
          <p>Category: ` + product.category + `</p>
          <p>Description: ` + product.description + `</p>
        </div>
      </div
    </div>
    `;
//blob:null/d74cbc59-030d-4837-a6eb-68db7b34813d
    //document.getElementById('productPic').src = product.photo
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

          <div class="product-category flex center padding">        
            <div class="category bold mid" id="category">Category: ` + productsArray.category + `</div>
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

pages.adminProduct = async (url) => {
  try{
    const product = await axios(url)    
    console.log(product.data);
      productsArray = product.data;
      console.log('qwas: '+productsArray.name)
      if(productsArray.length != "0"){
        console.log("again?")
        pages.displayChosenAdminProduct()
      } else {
        console.log("Couldn't load the products! " + error);
      }
  }catch(error){
    console.log("Error from dashboard API: " + error)
  }
}

pages.displayChosenAdminProduct = async () => {
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

          <div class="product-category flex center padding">        
            <div class="category bold mid" id="category">Category: ` + productsArray.category + `</div>
          </div>

          <div class="product-description flex center padding">        
            <div class="description bold mid" id="description">Description: ` + productsArray.description + `</div>
          </div>
        </div>

        <div class="content-right-down flex center">
          <div class="show flex center">
            <button id="edit" class="show-btn bold pointer center content-btn">
                Edit
            </button>
          </div>

          <div class="show flex center">
            <button id="delete-btn" class="show-btn bold pointer center content-btn" onclick="pages.deleteP()">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
    listItem.className = "product-content";
    productsList.appendChild(listItem)
}

pages.adminDashboard = async (url) => {
  try{
    const product = await axios(url)    
    console.log(product.data);
      productsArray = product.data;
      console.log('qwas: '+product.data[0].name)
      if(product.data.length != "0"){
        console.log("again?")
        pages.displayAdminProducts()
      } else {
        console.log("Couldn't load the products! " + error);
      }
  }catch(error){
    console.log("Error from dashboard API: " + error)
  }
}

pages.displayAdminProducts = async () => {
  const productsList = document.getElementById("product-list");
  productsList.innerHTML = "";
  console.log('p: ' + productsArray)
  productsArray.forEach((product) => {
    const listItem = document.createElement("li");
    console.log(product.name)
    listItem.innerHTML = `
    <div class="product flex-column pointer">
      <div class="more-info" onclick="pages.chooseAdminProduct(${product.id})">
        <div class="product-name flex center bold big" id="product-name">
          ` + product.name + `
        </div>

        <div class="product-content flex center">
          <img src="../assets/images/1.jpg" type="image/jpg" class="pic">
        </div>

        <div class="product-price flex center">        
          <div class="price bold" id="price">Price: $` + product.price + `</div>
        </div>

        <div class="show-info bold">
          <p>Name: ` + product.name + `</p>
          <p>Price: ` + product.price + `</p>
          <p>Category: ` + product.category + `</p>
          <p>Description: ` + product.description + `</p>
        </div>
      </div>

      <div class="product-buttons flex">
        <div class="show flex">
          <button id="edit" class="product-show-btn bold pointer" onclick="pages.editPro(${product.id})">
            Edit
          </button>
        </div>

        <div class="show flex">
          <button id="delete" class="product-show-btn bold pointer" onclick="pages.deleteProduct(${product.id})">
            Delete
          </button>
        </div>
      </div>
    </div>
    `;
    productsList.appendChild(listItem)
  })
}

pages.editProducts = async (url) => {
  try{
    const product = await axios(url)  

    console.log(product.data);

      productsArray = product.data;

      console.log('qwas: '+product.data.name)

      if(product.data.length != "0"){
        console.log("again?")
        pages.displayEditProducts()
      } else {
        console.log("Couldn't load the products! " + error);
      }
  }catch(error){
    console.log("Error from dashboard API: " + error)
  }
}

pages.displayEditProducts = async () => {
  const productsList = document.getElementById("edit-form");
  
  console.log('p: ' + productsArray.name)
    const listItem = document.createElement("div");
    console.log(productsArray.name)
    productsList.innerHTML += `
    <br>
    <div class="email flex-column center">
      <label for="" class="flex center">Name</label>
      <div class="full-width flex center">
        <input type="text" class="email-input flex center" id="name" value="${productsArray.name}">
      </div>
    </div>

    <br>

    <div class="email flex-column center">
      <label for="" class="flex center">Description</label>
      <div class="full-width flex center">
        <input type="text" class="password-input" id="description" value="${productsArray.description}">
      </div
    </div>

    <br>

    <div class="email flex-column center">
      <label for="" class="flex center">Price</label>
      <div class="full-width flex center">
        <input type="text" class="email-input" id="price" value="${productsArray.price}">
      </div
    </div>

    <br>

    <div class="email flex-column center">
      <label for="" class="flex center">Quantity</label>
      <div class="full-width flex center">
        <input type="text" class="password-input" id="quantity" value="${productsArray.quantity}">
      </div
    </div>

    <br>

    <div class="email flex-column center">
      <label for="" class="flex center">Category</label>
      <div class="full-width flex center">
        <input type="text" class="password-input" id="category" value="${productsArray.category}">
      </div
    </div>

    <br>

    <div class="full-width flex center">
      <button class="login-btn pointer" id="edit-btn">Edit</button>
    </div>
    <br>
    `;
    productsList.appendChild(listItem)
}

pages.chooseProduct = (product_id) => {
  console.log(product_id)
  localStorage.setItem('chosen_product', product_id)
  window.location.href = './product.html'
}

pages.chooseAdminProduct = (product_id) => {
  console.log(product_id)
  localStorage.setItem('chosen_product', product_id)
  window.location.href = './adminProduct.html'
}

pages.editPro = (product_id) => {
  console.log(product_id)
  localStorage.setItem('chosen_product', product_id)
  window.location.href = './edit.html'
}

pages.deleteProduct = (product_id) => {
  console.log(product_id)
  localStorage.setItem('chosen_product', product_id)
  pages.deleteP()
}

pages.add = async (url) => {
  const id = localStorage.getItem('id');
  const product_id = localStorage.getItem('chosen_product');
  console.log('id: ' + id)
  try{
    const productData = {
      user_id: id,
      product_id: product_id
    };

    response = await axios.post(
      url,
      productData
    )

    window.location.href = './dashboard.html'
  }catch(error){
    console.log("Error from Add API: " + error)
  }
}

pages.logoutPage = async (url) => {
  localStorage.setItem('id', null);
  // const product_id = localStorage.getItem('chosen_product');
  // console.log('id: ' + id)
  try{
    // const productData = {
    //   user_id: id,
    //   product_id: product_id
    // };

    response = await axios.post(url)

    window.location.href = './index.html'
  }catch(error){
    console.log("Error from Logout API: " + error)
  }
}

pages.delete = async (url) => {
  const product_id = localStorage.getItem('chosen_product');
  console.log('product_id: ' + product_id)
  try{
    const productData = {
      product_id: product_id
    };

    response = await axios.post(
      url,
      productData
    )

    window.location.href = './admin-dashboard.html'
  }catch(error){
    console.log("Error from Delete API: " + error)
  }
}

pages.edit = async (url) => {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;
  const category = document.getElementById("category").value;
  const product_id = localStorage.getItem('chosen_product');

  console.log('product_id: ' + product_id)

  try{
    const productData = {
      product_id: product_id,
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      category: category
    };

    response = await axios.post(
      url,
      productData
    )

    window.location.href = './admin-dashboard.html'
  }catch(error){
    console.log("Error from Edit API: " + error)
  }
}

pages.fav_cart = async (url) => {
  const id = localStorage.getItem('id');
  url += '/' + id

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