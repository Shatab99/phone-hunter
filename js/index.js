
const loadata = async (searchtext) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchtext}`);
    const data = await res.json();
    const phones = data.data;
    const phonecontainer = document.getElementById('phone-container');
    // for clearing cards before search 
    phonecontainer.textContent = '';
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
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
        `;
        phonecontainer.appendChild(phoneacard);
    });

}


// for search

function search(){
    const searchtext = document.getElementById('search-feild').value;
    
    loadata(searchtext);
}


// loadata();