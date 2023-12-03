const users_per_page=10;
let end_page;
let current_page=1;

let users=[  
    { name: 'Aaron', email: 'aaron@xyz.com' ,role: 'Member' },  
    { name: 'Aishwarya', email: 'aishwarya@xyz.com' ,role: 'Member'},  
    { name: 'Amisha', email: 'amisha@xyz.com' ,role: 'Member'},  
    { name: 'Amit', email: 'amit@xyz.com' ,role: 'Member'},  
    { name: 'Arvind', email: 'arvind@xyz.com' ,role: 'Member'},
    { name: 'Baker', email: 'baker@xyz.com' ,role: 'Member' }, 
    { name: 'Bob', email: 'bob@xyz.com' ,role: 'Member' },  
    { name: 'Bobby', email: 'bobby@xyz.com' ,role: 'Member' }, 
    { name: 'Chetan', email: 'chetan@xyz.com' ,role: 'Member'},  
    { name: 'Chintu', email: 'chintu@xyz.com' ,role: 'Member'},  
    { name: 'Dane', email: 'dane@xyz.com' ,role: 'Member'},  
    { name: 'Foobar', email: 'foobar@xyz.com' ,role: 'Member'},  
    { name: 'Happiest', email: 'happiest@xyz.com' ,role: 'Member'},  
    { name: 'Ishu', email: 'ishu@xyz.com' ,role: 'Member'},     
    { name: 'Jim', email: 'jim@xyz.com' ,role: 'Member'},
    { name: 'Jane', email: 'jane@xyz.com' ,role: 'Member'}, 
    { name: 'John', email: 'john@xyz.com' ,role: 'Member' }, 
    { name: 'Kalia', email: 'kalia@xyz.com' ,role: 'Member'},
    { name: 'Rahul', email: 'rahul@xyz.com' ,role: 'Member' },  
    { name: 'Ramesh', email: 'ramesh@xyz.com' ,role: 'Member'},  
    { name: 'Sam', email: 'sam@xyz.com' ,role: 'Member'},  
    { name: 'Sarah', email: 'sarah@xyz.com' ,role: 'Member'}  
    ];  

users.forEach((user) => {user.keep="true"});
users.forEach((user) => {user.show="true"});

const showFilter= (user) => {
  return user.show=="true";
};

function generateTable(page) { 
  
  let start_index=(page-1)*users_per_page;
  let userData=users.filter(showFilter)
  userData=userData.slice(start_index,Math.min(start_index+users_per_page,userData.length));

  let table = '<table>';  
  let action_buttons='<button class="edit-button"><i class="fa fa-edit fa-lg"></i></button><button class="delete-button"><i class="fa fa-trash-o fa-lg"></i></button>';
  let checkbox='<input class="checkbox-button" name="xy" type="checkbox">';

  table += '<tr><th><input id="row-checkbox" type="checkbox" name="x"></th><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>';  
  userData.forEach(user => {table += `<tr><td>${checkbox}</td><td>${user.name}</td><td>${user.email}</td><td>${user.role}</td><td>${action_buttons}</td></tr>`;});  
  table += '</table>';  

  //Showing 1-4 of 4 rows(s)
  let showingText="Showing ";
  if(userData.length==0)
  {
    showingText+=" 0 - 0 of 0 rows";
  }
  else
  {
    showingText+=(start_index+1);
    showingText+=" - "+(start_index+userData.length);
    showingText+=" of ";
    showingText+=users.filter(showFilter).length;
    showingText+=" row(s)";
  }
  document.getElementById("showing-text").innerHTML=showingText;
  
  return table;  
} 

function generateIndexButtons(s,e){
    let buttons = '<button id="first-button">&lt&lt</button><button id="prev-button">&lt</button>';  
    for(let i=s;i<=e;i++){
        buttons+='<button class="number-button">'+i+'</button>';
    }
    buttons+='<button id="next-button">&gt</button><button id="last-button">&gt&gt</button>' 
    return buttons;
}

function linkIndexButtons(){
  document.getElementById("prev-button").addEventListener("click", () => {displayPage(current_page-1);});
  document.getElementById("next-button").addEventListener("click", () => {displayPage(current_page+1);});
  document.getElementById("first-button").addEventListener("click", () => {displayPage(1);});
  document.getElementById("last-button").addEventListener("click", () => {displayPage(end_page);});

  let i=1;
  document.querySelectorAll(".number-button").forEach((button) => {
      button.setAttribute("page-index",i);
      i+=1;
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex) {
        button.addEventListener("click", () => {displayPage(pageIndex);});
      }
  });
}

function linkRowButtons(){
  let start_index=(current_page-1)*users_per_page;
  let userData=users.filter(showFilter)
  userData=userData.slice(start_index,Math.min(start_index+users_per_page,userData.length));
  let i=0;
  document.querySelectorAll(".delete-button").forEach((button) => {
      button.setAttribute("user-index",users.indexOf(userData[i]));
      i+=1;
      const userIndex = Number(button.getAttribute("user-index"));
      if (userIndex!=-1) {
        button.addEventListener("click", () => {deleteOne(userIndex);});
      }
  });
  i=0;
  document.querySelectorAll(".checkbox-button").forEach((button) => {
    if(userData[i].keep=="false")
    {
      button.checked=true;
    }
    selectText.innerHTML=countSelected();
    button.setAttribute("user-index",users.indexOf(userData[i]));
    i+=1;
    const userIndex = Number(button.getAttribute("user-index"));
    if (userIndex!=-1) {
      button.addEventListener("click", () => {
        if(button.checked)
        {
          users[userIndex].keep="false";
          selectText.innerHTML=countSelected();
        }
        else
        {
          users[userIndex].keep="true";
          selectText.innerHTML=countSelected();
        }
      });
    }
});

  const rowCheck=document.getElementById("row-checkbox")
  rowCheck.addEventListener("click", () => {
    if(rowCheck.checked)
    {
      userData.forEach((user) => {users[users.indexOf(user)].keep="false"});
      document.querySelectorAll(".checkbox-button").forEach((button) => {
        button.checked=true;
      });
      selectText.innerHTML=countSelected();
    }
    else
    {
      userData.forEach((user) => {users[users.indexOf(user)].keep="true"});
      document.querySelectorAll(".checkbox-button").forEach((button) => {
        button.checked=false;
      });
      selectText.innerHTML=countSelected();
    }
  });

}

const tableContainer = document.getElementById('main');
tableContainer.innerHTML = generateTable(current_page);
const indexButtons = document.getElementById('index-buttons'); 
end_page=Math.ceil(users.length/users_per_page);
indexButtons.innerHTML = generateIndexButtons(1,end_page);
const selectText=document.getElementById("selected-text");

const searchButton = document.getElementById("search-button");

const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};
const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};
const handlePageButtonsStatus = () => {
    if (current_page === 1) {
      disableButton(document.getElementById("prev-button"));
      disableButton(document.getElementById("first-button"));
    } else {
      enableButton(document.getElementById("prev-button"));
      enableButton(document.getElementById("first-button"));
    }
    if (current_page==document.querySelectorAll(".number-button").length) {
      disableButton(document.getElementById("next-button"));
      disableButton(document.getElementById("last-button"));
    } else {
      enableButton(document.getElementById("next-button"));
      enableButton(document.getElementById("last-button"));
    }
  };

  const displayPage = (page) => {
    if(page>=1 && page<=end_page && page!=current_page)
    {
        document.querySelectorAll(".number-button")[page-1].classList.add("active");
        document.querySelectorAll(".number-button")[current_page-1].classList.remove("active");
        current_page=page;
        tableContainer.innerHTML = generateTable(current_page);
        linkRowButtons();
        handlePageButtonsStatus();
    }
  };

const deleteFilter = (user) =>{
    return user.keep=="true";
};
const deleteSelected = () =>{
    users=users.filter(deleteFilter);
    end_page=Math.ceil(users.filter(showFilter).length/users_per_page);
    current_page=Math.min(current_page,end_page);
    tableContainer.innerHTML = generateTable(current_page);
    selectText.innerHTML=countSelected();

    indexButtons.innerHTML = generateIndexButtons(1,end_page);
    document.querySelectorAll(".number-button")[0].classList.add("active");
    linkIndexButtons();
    linkRowButtons();
    handlePageButtonsStatus();
};
const deleteOne = (idx) =>{
  let temp=users.splice(idx,1);
  users.forEach((user) => {user.keep="true"});

  end_page=Math.ceil(users.filter(showFilter).length/users_per_page);
  current_page=Math.min(current_page,end_page);
  tableContainer.innerHTML = generateTable(current_page);
  selectText.innerHTML=countSelected();

  indexButtons.innerHTML = generateIndexButtons(1,end_page);
  document.querySelectorAll(".number-button")[0].classList.add("active");
  linkIndexButtons();
  linkRowButtons();
  handlePageButtonsStatus();
};

const searchFilter = (user) =>{
    let searchVal=searchButton.value.toUpperCase();
    return user.name.toUpperCase().indexOf(searchVal)!=-1 || user.email.toUpperCase().indexOf(searchVal)!=-1 || user.role.toUpperCase().indexOf(searchVal)!=-1;
};

const filterRows = () => {
  //Clear all previous Filters
  users.forEach((user) => {user.show="true"});
  users.forEach((user) => {user.keep="true"});
  
    let searchVal=searchButton.value.toUpperCase();
    if(searchVal.trim().length)
    {
        users.forEach((user) => {
          if(!searchFilter(user)){
            user.show="false";
          }});
    }
    current_page=1;
    end_page=Math.ceil(users.filter(showFilter).length/users_per_page);
    tableContainer.innerHTML = generateTable(current_page);

    indexButtons.innerHTML = generateIndexButtons(1,end_page);
    document.querySelectorAll(".number-button")[0].classList.add("active");
    linkIndexButtons();
    linkRowButtons();
    handlePageButtonsStatus();
};

function countSelected(){
  let sel=users.filter(function(user){return user.keep=="false"}).length;
  sel+=" of ";
  sel+=users.length;
  sel+=" row(s) selected";

  const rows=document.querySelectorAll("table tr");
  rows.forEach((row) => {
    if(row.getElementsByTagName("input")[0].checked)
      row.classList.add("selected");
    else
      row.classList.remove("selected");
  });

  return sel;
}

window.addEventListener("load", () => {
    alert("To remove search filter, clear the search bar and press Enter!");
    document.querySelectorAll(".number-button")[0].classList.add("active");
    selectText.innerHTML=countSelected();
    linkIndexButtons();
    linkRowButtons();
    handlePageButtonsStatus();
    
    searchButton.addEventListener('keydown', function(event) {
      if (event.key =="enter" || event.key === 'Enter') {
      filterRows();
      selectText.innerHTML=countSelected();
      }
    });

    document.getElementById("delete-selected").addEventListener("click", () => {deleteSelected();});

  });  


