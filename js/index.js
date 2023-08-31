
const loadata = async (searchtext='13', ishowall) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchtext}`);
  const data = await res.json();
  let phones = data.data;
  displayphones(phones, ishowall)
}



const displayphones = (phones, ishowall) => {
  const phonecontainer = document.getElementById('phone-container');

  // for clearing cards before search 
  phonecontainer.textContent = '';

  // if there  phones are more than 12 then show all button enable

  const showall = document.getElementById('show-all');
  if (phones.length > 12) {
    // showall.style.display='block';
    showall.classList.remove('hidden')
  }
  else {
    showall.classList.add('hidden', true)
  }


  // console.log("is show all");
  // display 12 phones
  if(!ishowall){
    phones = phones.slice(0, 12);

  }


  phones.forEach(phone => {

    // create a div
    const phoneacard = document.createElement('div');
    phoneacard.classList = `card  bg-base-100 shadow-xl`;
    phoneacard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.brand}</p>
        <div class="card-actions">
          <button onclick="showdetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
      </div>
     
        `;
    phonecontainer.appendChild(phoneacard);
  });
  // hide the loading screen
  loading(false)

}


// for search

function search(ishowall) {
  const searchtext = document.getElementById('search-feild').value;
  loading(true)
  loadata(searchtext, ishowall);

}

// show details

const showdetails= async (id) =>{
  // console.log('details', id);
  // showing Indevidual data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const details = await res.json();
  // console.log("data", details.data.brand);
  const phone = details.data;
  showdetailsmodal(phone);

}
// show madal

const showdetailsmodal = (phone) =>{
  console.log(phone);

  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name;
  const phoneImage = document.getElementById('phone-image')
  phoneImage.innerHTML= `
  <img src="${phone.image}" alt="" class="m-auto">
  `;
  const phoneStorage = document.getElementById('phone-storage');
  phoneStorage.innerText = 'Storage : ' + phone.mainFeatures.storage;
  const phoneDisplay = document.getElementById('phone-displaysize');
  
  phoneDisplay.innerText = 'Display Size : ' + phone.mainFeatures.displaySize;
const phonebrand = document.getElementById('phone-brand');
phonebrand.innerText = 'brand : '+phone.brand;
const phonerelease = document.getElementById('phone-release');
phonerelease.innerText = 'Release Date : ' +phone.releaseDate;

const phonechipset = document.getElementById('phone-chipset');
phonechipset.innerText ='Chipset:  ' + phone.mainFeatures.chipSet ;


  my_details_modal.showModal()

}

// for loading

const loading = (isloading) => {
  const togglespin = document.getElementById('loading');

  if (isloading) {
    togglespin.classList.remove("hidden");
  }
  else {
    togglespin.classList.add('hidden');
  }
}

const showall = () =>{
  search(true);
}

loadata();